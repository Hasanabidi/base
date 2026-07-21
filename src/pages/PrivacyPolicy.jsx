import LegalPage from '@/components/LegalPage';

const sections = [
  {
    heading: 'Overview',
    body: [
      'This Privacy Policy explains how Fulcrum System ("we", "us", or "our") collects, uses, and protects information when you visit our website or engage our services. By using our site, you agree to the practices described here.',
    ],
  },
  {
    heading: 'Information We Collect',
    body: ['We collect information you provide directly and data gathered automatically as you use the site:'],
    list: [
      'Contact details you submit through forms (name, email, company, project details).',
      'Usage data such as pages visited, referring URLs, and approximate location derived from your IP address.',
      'Device and browser information collected via cookies and similar technologies.',
    ],
  },
  {
    heading: 'How We Use Information',
    body: ['We use the information we collect to:'],
    list: [
      'Respond to inquiries and provide the services you request.',
      'Improve our website, offerings, and customer experience.',
      'Send relevant updates where you have opted in, and comply with legal obligations.',
    ],
  },
  {
    heading: 'Sharing & Disclosure',
    body: [
      'We do not sell your personal information. We may share data with trusted service providers who help us operate our business, and where required by law or to protect our rights.',
    ],
  },
  {
    heading: 'Data Security & Retention',
    body: [
      'We apply reasonable technical and organizational measures to protect your data, and retain it only as long as necessary for the purposes described in this policy or as required by law.',
    ],
  },
  {
    heading: 'Your Rights',
    body: [
      'Depending on your location, you may have the right to access, correct, or delete your personal data, or to object to certain processing. To exercise these rights, contact us at contact@fulcrumsystem.com.',
    ],
  },
  {
    heading: 'Contact Us',
    body: [
      'If you have questions about this Privacy Policy, reach out to contact@fulcrumsystem.com.',
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <LegalPage
      label="Legal"
      title="Privacy Policy"
      description="How Fulcrum System collects, uses, and protects your information."
      path="/privacy"
      updated="July 17, 2026"
      sections={sections}
    />
  );
}
