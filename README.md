# LeadWise Landing Page

A high-conversion bilingual (Hebrew/English) landing page for LeadWise lead management system.

## Features

- 🌍 Bilingual support (Hebrew/English) with RTL layout
- 📱 Mobile-first responsive design
- ⚡ Next.js 14+ with TypeScript
- 🎨 Tailwind CSS with custom theme
- 🎯 11 conversion-focused sections
- 📊 Interactive ROI calculator
- 🔗 Cal.com demo booking integration
- ♿ Accessible and SEO-optimized

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

The page will automatically redirect to `/he` (Hebrew) by default.

### Available Routes

- `/he` - Hebrew version (default, RTL)
- `/en` - English version (LTR)

## Configuration

### Cal.com Integration

Update the Cal.com booking link in [`lib/constants.ts`](lib/constants.ts):

```typescript
export const CAL_COM_LINK = 'https://cal.com/your-username/demo';
```

### Contact Information

Add your contact details in [`lib/constants.ts`](lib/constants.ts):

```typescript
export const CONTACT = {
  whatsapp: '+972-XX-XXX-XXXX',
  email: 'info@leadwise.com',
};
```

### Content Updates

All content is managed through translation files:
- Hebrew: [`messages/he.json`](messages/he.json)
- English: [`messages/en.json`](messages/en.json)

## Building for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will auto-detect Next.js and deploy

### Manual Deployment

Build the project and deploy the `.next` folder to your hosting provider.

## Project Structure

```
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx       # Root layout with i18n
│   │   └── page.tsx         # Main landing page
│   └── globals.css          # Global styles
├── components/
│   ├── sections/            # 11 page sections
│   ├── ui/                  # Reusable UI components
│   └── ROICalculator.tsx    # Interactive calculator
├── lib/
│   ├── constants.ts         # Configuration
│   └── utils.ts             # Utilities
├── messages/
│   ├── he.json              # Hebrew translations
│   └── en.json              # English translations
└── public/                  # Static assets
```

## License

All rights reserved © 2025 LeadWise
