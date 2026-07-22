import { CONTACT } from '@/config/siteConfig';

/** Widget mode: 'whatsapp' for WhatsApp-only, 'dual' for both WhatsApp + AI Chatbot */
export const CHAT_WIDGET_MODE = 'dual';

export const WHATSAPP_CONFIG = {
  phone: CONTACT.whatsapp,
  defaultMessage:
    'Hi Fulcrum System — I would like to discuss a project. Could we schedule a consultation?',
};

export const CHATBOT_CONFIG = {
  /** Google Gemini API endpoint */
  endpoint: '/api/chat',
  botName: 'Fulcrum AI Assistant',
  welcomeMessage: 'Hi! I\'m Fulcrum\'s AI assistant. How can I help you today?',
  disclaimer: 'This is an AI assistant. For human support, choose WhatsApp.',
};

export function getWhatsAppUrl(message = WHATSAPP_CONFIG.defaultMessage) {
  const params = new URLSearchParams({ text: message });
  return `https://wa.me/${WHATSAPP_CONFIG.phone}?${params.toString()}`;
}

/**
 * CTA buttons shown inside the AI Chat tab — fill in your real values.
 */
export const CHATBOT_CTAS = {
  // Your booking page — e.g. Calendly, Cal.com, or your own /booking route
  bookingUrl: 'https://fulcrumsystem.com/booking', // TODO: confirm this is live

  // Phone number in international format, no spaces/dashes, for tel: links
  callNumber: '+923375766888', // TODO: confirm this is the number to call

  // Contact/email — used for mailto: link
  email: 'contact@fulcrumsystem.com', // TODO: confirm

  // Your contact page route
  contactPageUrl: 'https://fulcrumsystem.com/contact', // TODO: confirm this route exists
};
