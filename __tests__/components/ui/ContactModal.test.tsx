import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@/__tests__/utils/testUtils';
import userEvent from '@testing-library/user-event';
import ContactModal from '@/components/ui/ContactModal';
import { mockContactFormData, mockWebhookResponse, mockLeadId, mockProductId } from '@/__tests__/utils/mockData';

// Mock @calcom/embed-react
vi.mock('@calcom/embed-react', () => ({
  getCalApi: vi.fn().mockResolvedValue(vi.fn()),
}));

// Mock lib/fetchWithTimeout
vi.mock('@/lib/fetchWithTimeout', () => ({
  fetchWithTimeout: vi.fn(),
}));

describe('ContactModal', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders when isOpen is true', () => {
      render(<ContactModal isOpen={true} onClose={mockOnClose} />);
      // Mock returns just the key, so 'title' not 'contactForm.title'
      expect(screen.getByText('title')).toBeInTheDocument();
    });

    it('does not render when isOpen is false', () => {
      render(<ContactModal isOpen={false} onClose={mockOnClose} />);
      expect(screen.queryByText('title')).not.toBeInTheDocument();
    });

    it('shows step 1 initially with name field', () => {
      render(<ContactModal isOpen={true} onClose={mockOnClose} />);
      expect(screen.getByPlaceholderText('placeholders.name')).toBeInTheDocument();
    });
  });

  describe('3-Step Form Navigation', () => {
    it('advances from step 1 to step 2 with valid name', async () => {
      const user = userEvent.setup();
      render(<ContactModal isOpen={true} onClose={mockOnClose} />);

      const nameInput = screen.getByPlaceholderText('placeholders.name');
      await user.type(nameInput, mockContactFormData.name);

      const nextButton = screen.getByText('next');
      await user.click(nextButton);

      await waitFor(() => {
        expect(screen.getByPlaceholderText('placeholders.email')).toBeInTheDocument();
      });
    });

    it('prevents advancing with invalid name (< 2 characters)', async () => {
      const user = userEvent.setup();
      render(<ContactModal isOpen={true} onClose={mockOnClose} />);

      const nameInput = screen.getByPlaceholderText('placeholders.name');
      await user.type(nameInput, 'A');

      const nextButton = screen.getByText('next');
      await user.click(nextButton);

      // Should show validation error (the error message is the translation key)
      await waitFor(() => {
        expect(screen.getByText('validation.nameMinLength')).toBeInTheDocument();
      });

      // Should still be on step 1
      expect(screen.getByPlaceholderText('placeholders.name')).toBeInTheDocument();
    });

    it('goes back from step 2 to step 1', async () => {
      const user = userEvent.setup();
      render(<ContactModal isOpen={true} onClose={mockOnClose} />);

      // Go to step 2
      const nameInput = screen.getByPlaceholderText('placeholders.name');
      await user.type(nameInput, mockContactFormData.name);
      await user.click(screen.getByText('next'));

      await waitFor(() => {
        expect(screen.getByPlaceholderText('placeholders.email')).toBeInTheDocument();
      });

      // Go back
      const backButton = screen.getByText('back');
      await user.click(backButton);

      await waitFor(() => {
        expect(screen.getByPlaceholderText('placeholders.name')).toBeInTheDocument();
      });
    });

    it('advances to step 3 with valid email', async () => {
      const user = userEvent.setup();
      render(<ContactModal isOpen={true} onClose={mockOnClose} />);

      // Step 1
      await user.type(screen.getByPlaceholderText('placeholders.name'), mockContactFormData.name);
      await user.click(screen.getByText('next'));

      // Step 2
      await waitFor(() => expect(screen.getByPlaceholderText('placeholders.email')).toBeInTheDocument());
      await user.type(screen.getByPlaceholderText('placeholders.email'), mockContactFormData.email);
      await user.click(screen.getAllByText('next')[0]);

      // Step 3
      await waitFor(() => {
        expect(screen.getByPlaceholderText('placeholders.phone')).toBeInTheDocument();
      });
    });
  });

  describe('Form Validation', () => {
    it('validates name field (min 2 characters)', async () => {
      const user = userEvent.setup();
      render(<ContactModal isOpen={true} onClose={mockOnClose} />);

      const nameInput = screen.getByPlaceholderText('placeholders.name');
      await user.type(nameInput, 'A');
      await user.click(screen.getByText('next'));

      await waitFor(() => {
        expect(screen.getByText('validation.nameMinLength')).toBeInTheDocument();
      });
    });

    it('validates email format', async () => {
      const user = userEvent.setup();
      render(<ContactModal isOpen={true} onClose={mockOnClose} />);

      // Go to step 2
      await user.type(screen.getByPlaceholderText('placeholders.name'), mockContactFormData.name);
      await user.click(screen.getByText('next'));

      await waitFor(() => expect(screen.getByPlaceholderText('placeholders.email')).toBeInTheDocument());

      // Invalid email
      await user.type(screen.getByPlaceholderText('placeholders.email'), 'invalid-email');
      await user.click(screen.getAllByText('next')[0]);

      await waitFor(() => {
        expect(screen.getByText('validation.emailInvalid')).toBeInTheDocument();
      });
    });

    it('validates phone format', async () => {
      const user = userEvent.setup();
      render(<ContactModal isOpen={true} onClose={mockOnClose} />);

      // Go to step 3
      await user.type(screen.getByPlaceholderText('placeholders.name'), mockContactFormData.name);
      await user.click(screen.getByText('next'));
      await waitFor(() => expect(screen.getByPlaceholderText('placeholders.email')).toBeInTheDocument());
      await user.type(screen.getByPlaceholderText('placeholders.email'), mockContactFormData.email);
      await user.click(screen.getAllByText('next')[0]);

      await waitFor(() => expect(screen.getByPlaceholderText('placeholders.phone')).toBeInTheDocument());

      // Invalid phone
      await user.type(screen.getByPlaceholderText('placeholders.phone'), 'abc123');

      // Should show validation error when trying to submit
      const submitButton = screen.getByText('submit');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('validation.phoneInvalid')).toBeInTheDocument();
      });
    });
  });

  describe('Webhook Submission', () => {
    it('submits data to webhook on form submit', async () => {
      const user = userEvent.setup();
      const { fetchWithTimeout } = await import('@/lib/fetchWithTimeout');
      (fetchWithTimeout as ReturnType<typeof vi.fn>).mockResolvedValue(mockWebhookResponse);

      render(<ContactModal isOpen={true} onClose={mockOnClose} />);

      // Fill all steps
      await user.type(screen.getByPlaceholderText('placeholders.name'), mockContactFormData.name);
      await user.click(screen.getByText('next'));

      await waitFor(() => expect(screen.getByPlaceholderText('placeholders.email')).toBeInTheDocument());
      await user.type(screen.getByPlaceholderText('placeholders.email'), mockContactFormData.email);
      await user.click(screen.getAllByText('next')[0]);

      await waitFor(() => expect(screen.getByPlaceholderText('placeholders.phone')).toBeInTheDocument());
      await user.type(screen.getByPlaceholderText('placeholders.phone'), mockContactFormData.phone);

      const submitButton = screen.getByText('submit');
      await user.click(submitButton);

      await waitFor(() => {
        expect(fetchWithTimeout).toHaveBeenCalled();
      });
    });

    it('includes timestamp and source fields in submission', async () => {
      const user = userEvent.setup();
      const { fetchWithTimeout } = await import('@/lib/fetchWithTimeout');
      (fetchWithTimeout as ReturnType<typeof vi.fn>).mockResolvedValue(mockWebhookResponse);

      render(<ContactModal isOpen={true} onClose={mockOnClose} />);

      // Fill and submit form
      await user.type(screen.getByPlaceholderText('placeholders.name'), mockContactFormData.name);
      await user.click(screen.getByText('next'));
      await waitFor(() => expect(screen.getByPlaceholderText('placeholders.email')).toBeInTheDocument());
      await user.type(screen.getByPlaceholderText('placeholders.email'), mockContactFormData.email);
      await user.click(screen.getAllByText('next')[0]);
      await waitFor(() => expect(screen.getByPlaceholderText('placeholders.phone')).toBeInTheDocument());
      await user.type(screen.getByPlaceholderText('placeholders.phone'), mockContactFormData.phone);
      await user.click(screen.getByText('submit'));

      await waitFor(() => {
        const fetchCall = (fetchWithTimeout as ReturnType<typeof vi.fn>).mock.calls[0];
        const body = JSON.parse(fetchCall[1].body);

        expect(body).toHaveProperty('timestamp');
        expect(body.source).toBe('leadwise_landing_page');
        expect(body.name).toBe(mockContactFormData.name);
        expect(body.email).toBe(mockContactFormData.email);
        expect(body.phone).toBe(mockContactFormData.phone);
      });
    });

    it('handles webhook timeout', async () => {
      const user = userEvent.setup();
      const { fetchWithTimeout } = await import('@/lib/fetchWithTimeout');
      (fetchWithTimeout as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Request timeout after 10000ms'));

      render(<ContactModal isOpen={true} onClose={mockOnClose} />);

      // Fill and submit form
      await user.type(screen.getByPlaceholderText('placeholders.name'), mockContactFormData.name);
      await user.click(screen.getByText('next'));
      await waitFor(() => expect(screen.getByPlaceholderText('placeholders.email')).toBeInTheDocument());
      await user.type(screen.getByPlaceholderText('placeholders.email'), mockContactFormData.email);
      await user.click(screen.getAllByText('next')[0]);
      await waitFor(() => expect(screen.getByPlaceholderText('placeholders.phone')).toBeInTheDocument());
      await user.type(screen.getByPlaceholderText('placeholders.phone'), mockContactFormData.phone);
      await user.click(screen.getByText('submit'));

      // Should show error message
      await waitFor(() => {
        expect(screen.getByText('error')).toBeInTheDocument();
      });
    });

    it('handles webhook failure', async () => {
      const user = userEvent.setup();
      const { fetchWithTimeout } = await import('@/lib/fetchWithTimeout');
      (fetchWithTimeout as ReturnType<typeof vi.fn>).mockResolvedValue({
        ok: false,
        status: 500,
      });

      render(<ContactModal isOpen={true} onClose={mockOnClose} />);

      // Fill and submit form
      await user.type(screen.getByPlaceholderText('placeholders.name'), mockContactFormData.name);
      await user.click(screen.getByText('next'));
      await waitFor(() => expect(screen.getByPlaceholderText('placeholders.email')).toBeInTheDocument());
      await user.type(screen.getByPlaceholderText('placeholders.email'), mockContactFormData.email);
      await user.click(screen.getAllByText('next')[0]);
      await waitFor(() => expect(screen.getByPlaceholderText('placeholders.phone')).toBeInTheDocument());
      await user.type(screen.getByPlaceholderText('placeholders.phone'), mockContactFormData.phone);
      await user.click(screen.getByText('submit'));

      // Should show error message
      await waitFor(() => {
        expect(screen.getByText('error')).toBeInTheDocument();
      });
    });
  });

  describe('Cal.com Integration', () => {
    it('opens Cal.com after successful submission', async () => {
      const user = userEvent.setup();
      const { fetchWithTimeout } = await import('@/lib/fetchWithTimeout');
      const { getCalApi } = await import('@calcom/embed-react');
      const mockCalFn = vi.fn();
      (getCalApi as ReturnType<typeof vi.fn>).mockResolvedValue(mockCalFn);
      (fetchWithTimeout as ReturnType<typeof vi.fn>).mockResolvedValue(mockWebhookResponse);

      render(<ContactModal isOpen={true} onClose={mockOnClose} />);

      // Fill and submit form
      await user.type(screen.getByPlaceholderText('placeholders.name'), mockContactFormData.name);
      await user.click(screen.getByText('next'));
      await waitFor(() => expect(screen.getByPlaceholderText('placeholders.email')).toBeInTheDocument());
      await user.type(screen.getByPlaceholderText('placeholders.email'), mockContactFormData.email);
      await user.click(screen.getAllByText('next')[0]);
      await waitFor(() => expect(screen.getByPlaceholderText('placeholders.phone')).toBeInTheDocument());
      await user.type(screen.getByPlaceholderText('placeholders.phone'), mockContactFormData.phone);
      await user.click(screen.getByText('submit'));

      await waitFor(() => {
        expect(mockCalFn).toHaveBeenCalledWith('modal', expect.objectContaining({
          calLink: 'simpliflow-office-e6a9co/leadflow',
        }));
      });
    });

    it('passes lead_id and product_id from webhook response to Cal.com', async () => {
      const user = userEvent.setup();
      const { fetchWithTimeout } = await import('@/lib/fetchWithTimeout');
      const { getCalApi } = await import('@calcom/embed-react');
      const mockCalFn = vi.fn();
      (getCalApi as ReturnType<typeof vi.fn>).mockResolvedValue(mockCalFn);
      (fetchWithTimeout as ReturnType<typeof vi.fn>).mockResolvedValue(mockWebhookResponse);

      render(<ContactModal isOpen={true} onClose={mockOnClose} />);

      // Fill and submit form
      await user.type(screen.getByPlaceholderText('placeholders.name'), mockContactFormData.name);
      await user.click(screen.getByText('next'));
      await waitFor(() => expect(screen.getByPlaceholderText('placeholders.email')).toBeInTheDocument());
      await user.type(screen.getByPlaceholderText('placeholders.email'), mockContactFormData.email);
      await user.click(screen.getAllByText('next')[0]);
      await waitFor(() => expect(screen.getByPlaceholderText('placeholders.phone')).toBeInTheDocument());
      await user.type(screen.getByPlaceholderText('placeholders.phone'), mockContactFormData.phone);
      await user.click(screen.getByText('submit'));

      await waitFor(() => {
        expect(mockCalFn).toHaveBeenCalledWith('modal', expect.objectContaining({
          calLink: 'simpliflow-office-e6a9co/leadflow',
          config: expect.objectContaining({
            lead_id: mockLeadId,
            product_id: mockProductId,
          }),
        }));
      });
    });

    it('closes modal after successful submission', async () => {
      const user = userEvent.setup();
      const { fetchWithTimeout } = await import('@/lib/fetchWithTimeout');
      (fetchWithTimeout as ReturnType<typeof vi.fn>).mockResolvedValue(mockWebhookResponse);

      render(<ContactModal isOpen={true} onClose={mockOnClose} />);

      // Fill and submit form
      await user.type(screen.getByPlaceholderText('placeholders.name'), mockContactFormData.name);
      await user.click(screen.getByText('next'));
      await waitFor(() => expect(screen.getByPlaceholderText('placeholders.email')).toBeInTheDocument());
      await user.type(screen.getByPlaceholderText('placeholders.email'), mockContactFormData.email);
      await user.click(screen.getAllByText('next')[0]);
      await waitFor(() => expect(screen.getByPlaceholderText('placeholders.phone')).toBeInTheDocument());
      await user.type(screen.getByPlaceholderText('placeholders.phone'), mockContactFormData.phone);
      await user.click(screen.getByText('submit'));

      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalled();
      });
    });
  });

  describe('Modal Controls', () => {
    it('closes modal when close button is clicked', async () => {
      const user = userEvent.setup();
      render(<ContactModal isOpen={true} onClose={mockOnClose} />);

      const closeButton = screen.getByLabelText('close');
      await user.click(closeButton);

      expect(mockOnClose).toHaveBeenCalled();
    });

    it('resets form when modal is closed', async () => {
      const user = userEvent.setup();
      const { rerender } = render(<ContactModal isOpen={true} onClose={mockOnClose} />);

      // Fill name
      await user.type(screen.getByPlaceholderText('placeholders.name'), 'Test Name');

      // Close modal
      const closeButton = screen.getByLabelText('close');
      await user.click(closeButton);

      // Reopen modal
      rerender(<ContactModal isOpen={false} onClose={mockOnClose} />);
      rerender(<ContactModal isOpen={true} onClose={mockOnClose} />);

      // Should be back to step 1 with empty form
      expect(screen.getByPlaceholderText('placeholders.name')).toHaveValue('');
    });
  });
});
