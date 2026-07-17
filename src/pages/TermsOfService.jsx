import LegalPage from '@/components/LegalPage';

const sections = [
  {
    heading: 'Acceptance of Terms',
    body: [
      'These Terms of Service ("Terms") govern your access to and use of the Fulcrum System website and services. By accessing the site or engaging our services, you agree to be bound by these Terms.',
    ],
  },
  {
    heading: 'Use of the Site',
    body: ['You agree to use the site lawfully and not to:'],
    list: [
      'Interfere with or disrupt the site, its security, or associated networks.',
      'Attempt to gain unauthorized access to any systems or data.',
      'Use the content for unlawful purposes or in violation of these Terms.',
    ],
  },
  {
    heading: 'Intellectual Property',
    body: [
      'All content on this site — including text, graphics, logos, and code — is the property of Fulcrum System or its licensors and is protected by applicable intellectual property laws. You may not reproduce or distribute it without prior written permission.',
    ],
  },
  {
    heading: 'Services & Engagements',
    body: [
      'Specific engagements are governed by separate written agreements. In the event of a conflict between such an agreement and these Terms, the signed agreement controls for that engagement.',
    ],
  },
  {
    heading: 'Disclaimers & Limitation of Liability',
    body: [
      'The site is provided "as is" without warranties of any kind. To the fullest extent permitted by law, Fulcrum System is not liable for any indirect, incidental, or consequential damages arising from your use of the site.',
    ],
  },
  {
    heading: 'Changes to These Terms',
    body: [
      'We may update these Terms from time to time. Continued use of the site after changes take effect constitutes acceptance of the revised Terms.',
    ],
  },
  {
    heading: 'Contact Us',
    body: ['Questions about these Terms can be sent to abidi113@gmail.com.'],
  },
];

export default function TermsOfService() {
  return (
    <LegalPage
      label="Legal"
      title="Terms of Service"
      description="The terms that govern your use of the Fulcrum System website and services."
      path="/terms"
      updated="July 17, 2026"
      sections={sections}
    />
  );
}
