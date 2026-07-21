import LegalPage from '@/components/LegalPage';

const sections = [
  {
    heading: 'What Are Cookies',
    body: [
      'Cookies are small text files stored on your device when you visit a website. They help the site function, remember your preferences, and understand how it is used.',
    ],
  },
  {
    heading: 'Types of Cookies We Use',
    body: ['We use the following categories of cookies:'],
    list: [
      'Essential cookies required for the site to function correctly.',
      'Preference cookies that remember settings such as your theme choice.',
      'Analytics cookies that help us understand usage and improve the experience.',
    ],
  },
  {
    heading: 'Managing Cookies',
    body: [
      'Most browsers let you control cookies through their settings, including blocking or deleting them. Disabling certain cookies may affect how the site functions.',
    ],
  },
  {
    heading: 'Third-Party Cookies',
    body: [
      'Some cookies may be set by third-party services we use, such as analytics providers. These parties have their own privacy and cookie policies.',
    ],
  },
  {
    heading: 'Updates to This Policy',
    body: [
      'We may update this Cookie Policy periodically to reflect changes in technology or regulation. Please review it occasionally for the latest information.',
    ],
  },
  {
    heading: 'Contact Us',
    body: ['For questions about our use of cookies, email contact@fulcrumsystem.com.'],
  },
];

export default function CookiePolicy() {
  return (
    <LegalPage
      label="Legal"
      title="Cookie Policy"
      description="How Fulcrum System uses cookies and similar technologies."
      path="/cookies"
      updated="July 17, 2026"
      sections={sections}
    />
  );
}
