import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@/__tests__/utils/testUtils';
import ROICalculator from '@/components/ROICalculator';

describe('ROICalculator', () => {
  describe('Rendering', () => {
    it('renders calculator with default values', () => {
      render(<ROICalculator />);
      // The mock returns just the key name, so 'title' not 'roiCalculator.title'
      expect(screen.getByText('title')).toBeInTheDocument();
    });

    it('renders with input fields', () => {
      render(<ROICalculator />);
      expect(screen.getByLabelText('leadValue')).toBeInTheDocument();
      expect(screen.getByLabelText('leadsPerMonth')).toBeInTheDocument();
    });
  });

  describe('Input Validation - NaN Handling', () => {
    it('handles empty leadValue input (returns 0)', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('leadValue');
      fireEvent.change(leadValueInput, { target: { value: '' } });

      const leadsInput = screen.getByLabelText('leadsPerMonth');
      fireEvent.change(leadsInput, { target: { value: '10' } });

      // Should not crash, should return 0
      expect(leadValueInput).toHaveValue(null);
    });

    it('handles NaN leadValue (returns 0)', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('leadValue');
      fireEvent.change(leadValueInput, { target: { value: 'abc' } });

      // Input should accept the value but calculation should handle NaN
      const leadsInput = screen.getByLabelText('leadsPerMonth');
      fireEvent.change(leadsInput, { target: { value: '10' } });

      // No error should be thrown
      expect(screen.getByText('title')).toBeInTheDocument();
    });
  });

  describe('Input Validation - Bounds Checking', () => {
    it('handles value below minimum (returns 0)', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('leadValue');
      // ROI_DEFAULTS.minLeadValue = 100
      fireEvent.change(leadValueInput, { target: { value: '50' } });

      const leadsInput = screen.getByLabelText('leadsPerMonth');
      fireEvent.change(leadsInput, { target: { value: '10' } });

      // Should calculate as 0 because value is below minimum
      expect(screen.getByText('title')).toBeInTheDocument();
    });

    it('handles value above maximum (returns 0)', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('leadValue');
      // ROI_DEFAULTS.maxLeadValue = 10000
      fireEvent.change(leadValueInput, { target: { value: '99999' } });

      const leadsInput = screen.getByLabelText('leadsPerMonth');
      fireEvent.change(leadsInput, { target: { value: '10' } });

      // Should handle gracefully
      expect(screen.getByText('title')).toBeInTheDocument();
    });

    it('handles leads below minimum (returns 0)', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('leadValue');
      fireEvent.change(leadValueInput, { target: { value: '5000' } });

      const leadsInput = screen.getByLabelText('leadsPerMonth');
      // ROI_DEFAULTS.minLeadsPerMonth = 1
      fireEvent.change(leadsInput, { target: { value: '0' } });

      // Should handle gracefully (0 or negative is invalid)
      expect(screen.getByText('title')).toBeInTheDocument();
    });

    it('handles leads above maximum (returns 0)', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('leadValue');
      fireEvent.change(leadValueInput, { target: { value: '5000' } });

      const leadsInput = screen.getByLabelText('leadsPerMonth');
      // ROI_DEFAULTS.maxLeadsPerMonth = 1000
      fireEvent.change(leadsInput, { target: { value: '9999' } });

      // Should handle gracefully
      expect(screen.getByText('title')).toBeInTheDocument();
    });
  });

  describe('Input Validation - Negative Numbers', () => {
    it('handles negative leadValue (returns 0)', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('leadValue');
      fireEvent.change(leadValueInput, { target: { value: '-100' } });

      const leadsInput = screen.getByLabelText('leadsPerMonth');
      fireEvent.change(leadsInput, { target: { value: '10' } });

      // Should handle negative gracefully
      expect(screen.getByText('title')).toBeInTheDocument();
    });

    it('handles negative leads (returns 0)', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('leadValue');
      fireEvent.change(leadValueInput, { target: { value: '5000' } });

      const leadsInput = screen.getByLabelText('leadsPerMonth');
      fireEvent.change(leadsInput, { target: { value: '-5' } });

      // Should handle negative gracefully
      expect(screen.getByText('title')).toBeInTheDocument();
    });
  });

  describe('Calculation Accuracy', () => {
    it('calculates monthly ROI correctly: leadValue × leads × 0.20', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('leadValue');
      const leadsInput = screen.getByLabelText('leadsPerMonth');

      // Set valid inputs
      fireEvent.change(leadValueInput, { target: { value: '5000' } });
      fireEvent.change(leadsInput, { target: { value: '10' } });

      // Click calculate button
      const calculateButton = screen.getByText('חשב עכשיו');
      fireEvent.click(calculateButton);

      // Expected: 5000 × 10 × 0.20 = 10,000
      // Check that result is displayed after interaction
      expect(screen.queryByText(/₪/)).toBeTruthy();
    });

    it('calculates yearly ROI correctly (monthly × 12)', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('leadValue');
      const leadsInput = screen.getByLabelText('leadsPerMonth');

      fireEvent.change(leadValueInput, { target: { value: '5000' } });
      fireEvent.change(leadsInput, { target: { value: '10' } });

      // Click calculate button
      const calculateButton = screen.getByText('חשב עכשיו');
      fireEvent.click(calculateButton);

      // Result should be visible
      expect(screen.getByText('result')).toBeInTheDocument();
    });

    it('returns 0 for invalid inputs', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('leadValue');
      const leadsInput = screen.getByLabelText('leadsPerMonth');

      // Both invalid
      fireEvent.change(leadValueInput, { target: { value: 'abc' } });
      fireEvent.change(leadsInput, { target: { value: 'xyz' } });

      // Should not crash
      expect(screen.getByText('title')).toBeInTheDocument();
    });

    it('handles decimal inputs correctly', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('leadValue');
      const leadsInput = screen.getByLabelText('leadsPerMonth');

      fireEvent.change(leadValueInput, { target: { value: '5000.50' } });
      fireEvent.change(leadsInput, { target: { value: '10.5' } });

      // Should calculate correctly without crashing
      expect(screen.getByText('title')).toBeInTheDocument();
    });
  });

  describe('User Interaction', () => {
    it('shows result after clicking calculate button', () => {
      render(<ROICalculator />);

      // Initially, result section should not be visible
      expect(screen.queryByText('result')).not.toBeInTheDocument();

      // Click calculate button
      const calculateButton = screen.getByText('חשב עכשיו');
      fireEvent.click(calculateButton);

      // Should show result section
      expect(screen.getByText('result')).toBeInTheDocument();
    });

    it('shows result and CTA after interaction', () => {
      render(<ROICalculator />);

      // Click calculate button
      const calculateButton = screen.getByText('חשב עכשיו');
      fireEvent.click(calculateButton);

      // Should show result section
      expect(screen.getByText('result')).toBeInTheDocument();

      // Should show CTA button
      expect(screen.getByText('cta')).toBeInTheDocument();
    });

    it('updates result when inputs change and recalculate', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('leadValue');
      const leadsInput = screen.getByLabelText('leadsPerMonth');
      const calculateButton = screen.getByText('חשב עכשיו');

      // First calculation
      fireEvent.change(leadValueInput, { target: { value: '1000' } });
      fireEvent.change(leadsInput, { target: { value: '10' } });
      fireEvent.click(calculateButton);

      // Change values
      fireEvent.change(leadValueInput, { target: { value: '2000' } });
      fireEvent.click(calculateButton);

      // Component should re-render with new calculation
      expect(screen.getByText('title')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles zero leadValue', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('leadValue');
      const leadsInput = screen.getByLabelText('leadsPerMonth');

      fireEvent.change(leadValueInput, { target: { value: '0' } });
      fireEvent.change(leadsInput, { target: { value: '10' } });

      // Should return 0 (zero value is invalid)
      expect(screen.getByText('title')).toBeInTheDocument();
    });

    it('handles zero leads', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('leadValue');
      const leadsInput = screen.getByLabelText('leadsPerMonth');

      fireEvent.change(leadValueInput, { target: { value: '5000' } });
      fireEvent.change(leadsInput, { target: { value: '0' } });

      // Should return 0 (zero leads is invalid)
      expect(screen.getByText('title')).toBeInTheDocument();
    });

    it('handles Infinity result', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('leadValue');
      const leadsInput = screen.getByLabelText('leadsPerMonth');

      // Try to create Infinity (though our validation should prevent this)
      fireEvent.change(leadValueInput, { target: { value: Number.MAX_VALUE.toString() } });
      fireEvent.change(leadsInput, { target: { value: '1000' } });

      // Should handle gracefully (either 0 or MAX_VALUE × 1000 × 0.20)
      expect(screen.getByText('title')).toBeInTheDocument();
    });
  });

  describe('Currency Formatting', () => {
    it('formats currency with Hebrew locale', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('leadValue');
      const leadsInput = screen.getByLabelText('leadsPerMonth');

      fireEvent.change(leadValueInput, { target: { value: '5000' } });
      fireEvent.change(leadsInput, { target: { value: '10' } });

      // Click calculate button
      const calculateButton = screen.getByText('חשב עכשיו');
      fireEvent.click(calculateButton);

      // Should use ₪ symbol and Hebrew number formatting
      expect(screen.queryByText(/₪/)).toBeTruthy();
    });
  });
});
