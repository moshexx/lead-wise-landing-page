export const mockContactFormData = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '+972-55-555-5555',
};

export const mockWebhookResponse = {
  ok: true,
  status: 200,
  json: async () => ({ success: true }),
};

export const mockROICalculatorInputs = {
  valid: {
    leadValue: '5000',
    leadsPerMonth: '10',
  },
  invalid: {
    leadValue: 'abc',
    leadsPerMonth: '-5',
  },
  edge: {
    leadValue: '999999',
    leadsPerMonth: '0',
  },
};

export const mockYouTubeURLs = {
  shorts: 'https://www.youtube.com/shorts/QEa7uSqg9EE',
  watch: 'https://www.youtube.com/watch?v=ABC123&feature=share',
  youtuBe: 'https://youtu.be/XYZ789?si=abc',
  malformed: 'https://www.youtube.com/shorts/',
  empty: '',
};
