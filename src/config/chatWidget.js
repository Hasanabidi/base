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
