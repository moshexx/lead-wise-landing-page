import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@/__tests__/utils/testUtils';
import userEvent from '@testing-library/user-event';
import ContactModal from '@/components/ui/ContactModal';
import { mockContactFormData, mockWebhookResponse } from '@/__tests__/utils/mockData';

describe('ContactModal', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
    global.open = vi.fn();
  });

  describe('Rendering', () => {
    it('renders when isOpen is true', () => {
      render(<ContactModal isOpen={true} onClose={mockOnClose} />);
      expect(screen.getByText('contactForm.title')).toBeInTheDocument();
    });

    it('does not render when isOpen is false', () => {
      render(<ContactModal isOpen={false} onClose={mockOnClose} />);
      expect(screen.queryByText('contactForm.title')).not.toBeInTheDocument();
    });

    it('shows step 1 initially with name field', () => {
      render(<ContactModal isOpen={true} onClose={mockOnClose} />);
      expect(screen.getByPlaceholderText('contactForm.placeholders.name')).toBeInTheDocument();
      expect(screen.getByText('contactForm.stepProgress')).toBeInTheDocument();
    });
  });

  describe('3-Step Form Navigation', () => {
    it('advances from step 1 to step 2 with valid name', async () => {
      const user = userEvent.setup();
      render(<ContactModal isOpen={true} onClose={mockOnClose} />);

      const nameInput = screen.getByPlaceholderText('contactForm.placeholders.name');
      await user.type(nameInput, mockContactFormData.name);

      const nextButton = screen.getByText('contactForm.next');
      await user.click(nextButton);

      await waitFor(() => {
        expect(screen.getByPlaceholderText('contactForm.placeholders.email')).toBeInTheDocument();
      });
    });

    it('prevents advancing with invalid name (< 2 characters)', async () => {
      const user = userEvent.setup();
      render(<ContactModal isOpen={true} onClose={mockOnClose} />);

      const nameInput = screen.getByPlaceholderText('contactForm.placeholders.name');
      await user.type(nameInput, 'A');

      const nextButton = screen.getByText('contactForm.next');
      await user.click(nextButton);

      // Should show validation error
      await waitFor(() => {
        expect(screen.getByText('contactForm.validation.nameMinLength')).toBeInTheDocument();
      });

      // Should still be on step 1
      expect(screen.getByPlaceholderText('contactForm.placeholders.name')).toBeInTheDocument();
    });

    it('goes back from step 2 to step 1', async () => {
      const user = userEvent.setup();
      render(<ContactModal isOpen={true} onClose={mockOnClose} />);

      // Go to step 2
      const nameInput = screen.getByPlaceholderText('contactForm.placeholders.name');
      await user.type(nameInput, mockContactFormData.name);
      await user.click(screen.getByText('contactForm.next'));

      await waitFor(() => {
        expect(screen.getByPlaceholderText('contactForm.placeholders.email')).toBeInTheDocument();
      });

      // Go back
      const backButton = screen.getByText('contactForm.back');
      await user.click(backButton);

      await waitFor(() => {
        expect(screen.getByPlaceholderText('contactForm.placeholders.name')).toBeInTheDocument();
      });
    });

    it('advances to step 3 with valid email', async () => {
      const user = userEvent.setup();
      render(<ContactModal isOpen={true} onClose={mockOnClose} />);

      // Step 1
      await user.type(screen.getByPlaceholderText('contactForm.placeholders.name'), mockContactFormData.name);
      await user.click(screen.getByText('contactForm.next'));

      // Step 2
      await waitFor(() => expect(screen.getByPlaceholderText('contactForm.placeholders.email')).toBeInTheDocument());
      await user.type(screen.getByPlaceholderText('contactForm.placeholders.email'), mockContactFormData.email);
      await user.click(screen.getAllByText('contactForm.next')[0]);

      // Step 3
      await waitFor(() => {
        expect(screen.getByPlaceholderText('contactForm.placeholders.phone')).toBeInTheDocument();
      });
    });
  });

  describe('Form Validation', () => {
    it('validates name field (min 2 characters)', async () => {
      const user = userEvent.setup();
      render(<ContactModal isOpen={true} onClose={mockOnClose} />);

      const nameInput = screen.getByPlaceholderText('contactForm.placeholders.name');
      await user.type(nameInput, 'A');
      await user.click(screen.getByText('contactForm.next'));

      await waitFor(() => {
        expect(screen.getByText('contactForm.validation.nameMinLength')).toBeInTheDocument();
      });
    });

    it('validates email format', async () => {
      const user = userEvent.setup();
      render(<ContactModal isOpen={true} onClose={mockOnClose} />);

      // Go to step 2
      await user.type(screen.getByPlaceholderText('contactForm.placeholders.name'), mockContactFormData.name);
      await user.click(screen.getByText('contactForm.next'));

      await waitFor(() => expect(screen.getByPlaceholderText('contactForm.placeholders.email')).toBeInTheDocument());

      // Invalid email
      await user.type(screen.getByPlaceholderText('contactForm.placeholders.email'), 'invalid-email');
      await user.click(screen.getAllByText('contactForm.next')[0]);

      await waitFor(() => {
        expect(screen.getByText('contactForm.validation.emailInvalid')).toBeInTheDocument();
      });
    });

    it('validates phone format', async () => {
      const user = userEvent.setup();
      render(<ContactModal isOpen={true} onClose={mockOnClose} />);

      // Go to step 3
      await user.type(screen.getByPlaceholderText('contactForm.placeholders.name'), mockContactFormData.name);
      await user.click(screen.getByText('contactForm.next'));
      await waitFor(() => expect(screen.getByPlaceholderText('contactForm.placeholders.email')).toBeInTheDocument());
      await user.type(screen.getByPlaceholderText('contactForm.placeholders.email'), mockContactFormData.email);
      await user.click(screen.getAllByText('contactForm.next')[0]);

      await waitFor(() => expect(screen.getByPlaceholderText('contactForm.placeholders.phone')).toBeInTheDocument());

      // Invalid phone
      await user.type(screen.getByPlaceholderText('contactForm.placeholders.phone'), 'abc123');

      // Should show validation error when trying to submit
      const submitButton = screen.getByText('contactForm.submit');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('contactForm.validation.phoneInvalid')).toBeInTheDocument();
      });
    });
  });

  describe('Webhook Submission', () => {
    it('submits data to webhook on form submit', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockResolvedValue(mockWebhookResponse);

      render(<ContactModal isOpen={true} onClose={mockOnClose} />);

      // Fill all steps
      await user.type(screen.getByPlaceholderText('contactForm.placeholders.name'), mockContactFormData.name);
      await user.click(screen.getByText('contactForm.next'));

      await waitFor(() => expect(screen.getByPlaceholderText('contactForm.placeholders.email')).toBeInTheDocument());
      await user.type(screen.getByPlaceholderText('contactForm.placeholders.email'), mockContactFormData.email);
      await user.click(screen.getAllByText('contactForm.next')[0]);

      await waitFor(() => expect(screen.getByPlaceholderText('contactForm.placeholders.phone')).toBeInTheDocument());
      await user.type(screen.getByPlaceholderText('contactForm.placeholders.phone'), mockContactFormData.phone);

      const submitButton = screen.getByText('contactForm.submit');
      await user.click(submitButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
      });
    });

    it('includes timestamp and source fields in submission', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockResolvedValue(mockWebhookResponse);

      render(<ContactModal isOpen={true} onClose={mockOnClose} />);

      // Fill and submit form
      await user.type(screen.getByPlaceholderText('contactForm.placeholders.name'), mockContactFormData.name);
      await user.click(screen.getByText('contactForm.next'));
      await waitFor(() => expect(screen.getByPlaceholderText('contactForm.placeholders.email')).toBeInTheDocument());
      await user.type(screen.getByPlaceholderText('contactForm.placeholders.email'), mockContactFormData.email);
      await user.click(screen.getAllByText('contactForm.next')[0]);
      await waitFor(() => expect(screen.getByPlaceholderText('contactForm.placeholders.phone')).toBeInTheDocument());
      await user.type(screen.getByPlaceholderText('contactForm.placeholders.phone'), mockContactFormData.phone);
      await user.click(screen.getByText('contactForm.submit'));

      await waitFor(() => {
        const fetchCall = (global.fetch as any).mock.calls[0];
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

      // Mock a timeout error
      global.fetch = vi.fn().mockRejectedValue(new Error('Request timeout after 10000ms'));

      render(<ContactModal isOpen={true} onClose={mockOnClose} />);

      // Fill and submit form
      await user.type(screen.getByPlaceholderText('contactForm.placeholders.name'), mockContactFormData.name);
      await user.click(screen.getByText('contactForm.next'));
      await waitFor(() => expect(screen.getByPlaceholderText('contactForm.placeholders.email')).toBeInTheDocument());
      await user.type(screen.getByPlaceholderText('contactForm.placeholders.email'), mockContactFormData.email);
      await user.click(screen.getAllByText('contactForm.next')[0]);
      await waitFor(() => expect(screen.getByPlaceholderText('contactForm.placeholders.phone')).toBeInTheDocument());
      await user.type(screen.getByPlaceholderText('contactForm.placeholders.phone'), mockContactFormData.phone);
      await user.click(screen.getByText('contactForm.submit'));

      // Should show error message
      await waitFor(() => {
        expect(screen.getByText('contactForm.error')).toBeInTheDocument();
      });
    });

    it('handles webhook failure', async () => {
      const user = userEvent.setup();

      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      });

      render(<ContactModal isOpen={true} onClose={mockOnClose} />);

      // Fill and submit form
      await user.type(screen.getByPlaceholderText('contactForm.placeholders.name'), mockContactFormData.name);
      await user.click(screen.getByText('contactForm.next'));
      await waitFor(() => expect(screen.getByPlaceholderText('contactForm.placeholders.email')).toBeInTheDocument());
      await user.type(screen.getByPlaceholderText('contactForm.placeholders.email'), mockContactFormData.email);
      await user.click(screen.getAllByText('contactForm.next')[0]);
      await waitFor(() => expect(screen.getByPlaceholderText('contactForm.placeholders.phone')).toBeInTheDocument());
      await user.type(screen.getByPlaceholderText('contactForm.placeholders.phone'), mockContactFormData.phone);
      await user.click(screen.getByText('contactForm.submit'));

      // Should show error message
      await waitFor(() => {
        expect(screen.getByText('contactForm.error')).toBeInTheDocument();
      });
    });
  });

  describe('Cal.com Redirect', () => {
    it('opens Cal.com with correct parameters after success', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockResolvedValue(mockWebhookResponse);

      render(<ContactModal isOpen={true} onClose={mockOnClose} />);

      // Fill and submit form
      await user.type(screen.getByPlaceholderText('contactForm.placeholders.name'), mockContactFormData.name);
      await user.click(screen.getByText('contactForm.next'));
      await waitFor(() => expect(screen.getByPlaceholderText('contactForm.placeholders.email')).toBeInTheDocument());
      await user.type(screen.getByPlaceholderText('contactForm.placeholders.email'), mockContactFormData.email);
      await user.click(screen.getAllByText('contactForm.next')[0]);
      await waitFor(() => expect(screen.getByPlaceholderText('contactForm.placeholders.phone')).toBeInTheDocument());
      await user.type(screen.getByPlaceholderText('contactForm.placeholders.phone'), mockContactFormData.phone);
      await user.click(screen.getByText('contactForm.submit'));

      await waitFor(() => {
        expect(global.open).toHaveBeenCalled();
        const calUrl = (global.open as any).mock.calls[0][0];

        expect(calUrl).toContain('cal.com');
        expect(calUrl).toContain(`name=${encodeURIComponent(mockContactFormData.name)}`);
        expect(calUrl).toContain(`email=${encodeURIComponent(mockContactFormData.email)}`);
        expect(calUrl).toContain(`phone=${encodeURIComponent(mockContactFormData.phone)}`);
      });
    });

    it('closes modal after successful submission', async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn().mockResolvedValue(mockWebhookResponse);

      render(<ContactModal isOpen={true} onClose={mockOnClose} />);

      // Fill and submit form
      await user.type(screen.getByPlaceholderText('contactForm.placeholders.name'), mockContactFormData.name);
      await user.click(screen.getByText('contactForm.next'));
      await waitFor(() => expect(screen.getByPlaceholderText('contactForm.placeholders.email')).toBeInTheDocument());
      await user.type(screen.getByPlaceholderText('contactForm.placeholders.email'), mockContactFormData.email);
      await user.click(screen.getAllByText('contactForm.next')[0]);
      await waitFor(() => expect(screen.getByPlaceholderText('contactForm.placeholders.phone')).toBeInTheDocument());
      await user.type(screen.getByPlaceholderText('contactForm.placeholders.phone'), mockContactFormData.phone);
      await user.click(screen.getByText('contactForm.submit'));

      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalled();
      });
    });
  });

  describe('Modal Controls', () => {
    it('closes modal when close button is clicked', async () => {
      const user = userEvent.setup();
      render(<ContactModal isOpen={true} onClose={mockOnClose} />);

      const closeButton = screen.getByLabelText('contactForm.close');
      await user.click(closeButton);

      expect(mockOnClose).toHaveBeenCalled();
    });

    it('resets form when modal is closed', async () => {
      const user = userEvent.setup();
      const { rerender } = render(<ContactModal isOpen={true} onClose={mockOnClose} />);

      // Fill name
      await user.type(screen.getByPlaceholderText('contactForm.placeholders.name'), 'Test Name');

      // Close modal
      const closeButton = screen.getByLabelText('contactForm.close');
      await user.click(closeButton);

      // Reopen modal
      rerender(<ContactModal isOpen={false} onClose={mockOnClose} />);
      rerender(<ContactModal isOpen={true} onClose={mockOnClose} />);

      // Should be back to step 1 with empty form
      expect(screen.getByPlaceholderText('contactForm.placeholders.name')).toHaveValue('');
    });
  });
});
