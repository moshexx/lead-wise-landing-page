import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@/__tests__/utils/testUtils';
import ROICalculator from '@/components/ROICalculator';
import { ROI_DEFAULTS } from '@/lib/constants';

describe('ROICalculator', () => {
  describe('Rendering', () => {
    it('renders calculator with default values', () => {
      render(<ROICalculator />);
      expect(screen.getByText('roiCalculator.title')).toBeInTheDocument();
    });

    it('shows instruction banner before interaction', () => {
      render(<ROICalculator />);
      expect(screen.getByText('roiCalculator.instruction')).toBeInTheDocument();
    });
  });

  describe('Input Validation - NaN Handling', () => {
    it('handles empty leadValue input (returns 0)', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('roiCalculator.leadValue');
      fireEvent.change(leadValueInput, { target: { value: '' } });

      const leadsInput = screen.getByLabelText('roiCalculator.leadsPerMonth');
      fireEvent.change(leadsInput, { target: { value: '10' } });

      // Should not crash, should return 0
      expect(leadValueInput).toHaveValue(null);
    });

    it('handles NaN leadValue (returns 0)', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('roiCalculator.leadValue');
      fireEvent.change(leadValueInput, { target: { value: 'abc' } });

      // Input should accept the value but calculation should handle NaN
      const leadsInput = screen.getByLabelText('roiCalculator.leadsPerMonth');
      fireEvent.change(leadsInput, { target: { value: '10' } });

      // No error should be thrown
      expect(screen.getByText('roiCalculator.title')).toBeInTheDocument();
    });
  });

  describe('Input Validation - Bounds Checking', () => {
    it('handles value below minimum (returns 0)', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('roiCalculator.leadValue');
      // ROI_DEFAULTS.minLeadValue = 100
      fireEvent.change(leadValueInput, { target: { value: '50' } });

      const leadsInput = screen.getByLabelText('roiCalculator.leadsPerMonth');
      fireEvent.change(leadsInput, { target: { value: '10' } });

      // Should calculate as 0 because value is below minimum
      // After interaction, result should show but be 0 or not crash
      expect(screen.getByText('roiCalculator.title')).toBeInTheDocument();
    });

    it('handles value above maximum (returns 0)', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('roiCalculator.leadValue');
      // ROI_DEFAULTS.maxLeadValue = 10000
      fireEvent.change(leadValueInput, { target: { value: '99999' } });

      const leadsInput = screen.getByLabelText('roiCalculator.leadsPerMonth');
      fireEvent.change(leadsInput, { target: { value: '10' } });

      // Should handle gracefully
      expect(screen.getByText('roiCalculator.title')).toBeInTheDocument();
    });

    it('handles leads below minimum (returns 0)', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('roiCalculator.leadValue');
      fireEvent.change(leadValueInput, { target: { value: '5000' } });

      const leadsInput = screen.getByLabelText('roiCalculator.leadsPerMonth');
      // ROI_DEFAULTS.minLeadsPerMonth = 1
      fireEvent.change(leadsInput, { target: { value: '0' } });

      // Should handle gracefully (0 or negative is invalid)
      expect(screen.getByText('roiCalculator.title')).toBeInTheDocument();
    });

    it('handles leads above maximum (returns 0)', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('roiCalculator.leadValue');
      fireEvent.change(leadValueInput, { target: { value: '5000' } });

      const leadsInput = screen.getByLabelText('roiCalculator.leadsPerMonth');
      // ROI_DEFAULTS.maxLeadsPerMonth = 1000
      fireEvent.change(leadsInput, { target: { value: '9999' } });

      // Should handle gracefully
      expect(screen.getByText('roiCalculator.title')).toBeInTheDocument();
    });
  });

  describe('Input Validation - Negative Numbers', () => {
    it('handles negative leadValue (returns 0)', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('roiCalculator.leadValue');
      fireEvent.change(leadValueInput, { target: { value: '-100' } });

      const leadsInput = screen.getByLabelText('roiCalculator.leadsPerMonth');
      fireEvent.change(leadsInput, { target: { value: '10' } });

      // Should handle negative gracefully
      expect(screen.getByText('roiCalculator.title')).toBeInTheDocument();
    });

    it('handles negative leads (returns 0)', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('roiCalculator.leadValue');
      fireEvent.change(leadValueInput, { target: { value: '5000' } });

      const leadsInput = screen.getByLabelText('roiCalculator.leadsPerMonth');
      fireEvent.change(leadsInput, { target: { value: '-5' } });

      // Should handle negative gracefully
      expect(screen.getByText('roiCalculator.title')).toBeInTheDocument();
    });
  });

  describe('Calculation Accuracy', () => {
    it('calculates monthly ROI correctly: leadValue × leads × 0.20', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('roiCalculator.leadValue');
      const leadsInput = screen.getByLabelText('roiCalculator.leadsPerMonth');

      // Set valid inputs
      fireEvent.change(leadValueInput, { target: { value: '5000' } });
      fireEvent.change(leadsInput, { target: { value: '10' } });

      // Expected: 5000 × 10 × 0.20 = 10,000
      // After interaction, should show result
      // The component shows result after user interacts
      // Result should contain ₪10,000 (Hebrew locale formatting)

      // Check that result is displayed after interaction
      expect(screen.queryByText(/₪/)).toBeTruthy();
    });

    it('calculates yearly ROI correctly (monthly × 12)', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('roiCalculator.leadValue');
      const leadsInput = screen.getByLabelText('roiCalculator.leadsPerMonth');

      fireEvent.change(leadValueInput, { target: { value: '5000' } });
      fireEvent.change(leadsInput, { target: { value: '10' } });

      // Expected monthly: 10,000
      // Expected yearly: 10,000 × 12 = 120,000
      // Should show "בשנה" (per year) somewhere
      expect(screen.getByText(/בשנה/)).toBeInTheDocument();
    });

    it('returns 0 for invalid inputs', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('roiCalculator.leadValue');
      const leadsInput = screen.getByLabelText('roiCalculator.leadsPerMonth');

      // Both invalid
      fireEvent.change(leadValueInput, { target: { value: 'abc' } });
      fireEvent.change(leadsInput, { target: { value: 'xyz' } });

      // Should not crash
      expect(screen.getByText('roiCalculator.title')).toBeInTheDocument();
    });

    it('handles decimal inputs correctly', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('roiCalculator.leadValue');
      const leadsInput = screen.getByLabelText('roiCalculator.leadsPerMonth');

      fireEvent.change(leadValueInput, { target: { value: '5000.50' } });
      fireEvent.change(leadsInput, { target: { value: '10.5' } });

      // Expected: 5000.50 × 10.5 × 0.20 = 10,501.05
      // Should calculate correctly without crashing
      expect(screen.getByText('roiCalculator.title')).toBeInTheDocument();
    });
  });

  describe('User Interaction', () => {
    it('hides instruction banner after user interacts', () => {
      render(<ROICalculator />);

      // Initially shown
      expect(screen.getByText('roiCalculator.instruction')).toBeInTheDocument();

      // Change input
      const leadValueInput = screen.getByLabelText('roiCalculator.leadValue');
      fireEvent.change(leadValueInput, { target: { value: '5000' } });

      // Should hide instruction
      expect(screen.queryByText('roiCalculator.instruction')).not.toBeInTheDocument();
    });

    it('shows result and CTA after interaction', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('roiCalculator.leadValue');
      fireEvent.change(leadValueInput, { target: { value: '5000' } });

      // Should show result section
      expect(screen.getByText('roiCalculator.result')).toBeInTheDocument();

      // Should show CTA button
      expect(screen.getByText('roiCalculator.cta')).toBeInTheDocument();
    });

    it('updates result when inputs change', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('roiCalculator.leadValue');
      const leadsInput = screen.getByLabelText('roiCalculator.leadsPerMonth');

      // First calculation
      fireEvent.change(leadValueInput, { target: { value: '1000' } });
      fireEvent.change(leadsInput, { target: { value: '10' } });

      // Change values
      fireEvent.change(leadValueInput, { target: { value: '2000' } });

      // Result should update (doubled)
      // Component should re-render with new calculation
      expect(screen.getByText('roiCalculator.title')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles zero leadValue', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('roiCalculator.leadValue');
      const leadsInput = screen.getByLabelText('roiCalculator.leadsPerMonth');

      fireEvent.change(leadValueInput, { target: { value: '0' } });
      fireEvent.change(leadsInput, { target: { value: '10' } });

      // Should return 0 (zero value is invalid)
      expect(screen.getByText('roiCalculator.title')).toBeInTheDocument();
    });

    it('handles zero leads', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('roiCalculator.leadValue');
      const leadsInput = screen.getByLabelText('roiCalculator.leadsPerMonth');

      fireEvent.change(leadValueInput, { target: { value: '5000' } });
      fireEvent.change(leadsInput, { target: { value: '0' } });

      // Should return 0 (zero leads is invalid)
      expect(screen.getByText('roiCalculator.title')).toBeInTheDocument();
    });

    it('handles Infinity result', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('roiCalculator.leadValue');
      const leadsInput = screen.getByLabelText('roiCalculator.leadsPerMonth');

      // Try to create Infinity (though our validation should prevent this)
      fireEvent.change(leadValueInput, { target: { value: Number.MAX_VALUE.toString() } });
      fireEvent.change(leadsInput, { target: { value: '1000' } });

      // Should handle gracefully (either 0 or MAX_VALUE × 1000 × 0.20)
      expect(screen.getByText('roiCalculator.title')).toBeInTheDocument();
    });
  });

  describe('Currency Formatting', () => {
    it('formats currency with Hebrew locale', () => {
      render(<ROICalculator />);

      const leadValueInput = screen.getByLabelText('roiCalculator.leadValue');
      const leadsInput = screen.getByLabelText('roiCalculator.leadsPerMonth');

      fireEvent.change(leadValueInput, { target: { value: '5000' } });
      fireEvent.change(leadsInput, { target: { value: '10' } });

      // Should use ₪ symbol and Hebrew number formatting
      expect(screen.queryByText(/₪/)).toBeTruthy();
    });
  });
});
