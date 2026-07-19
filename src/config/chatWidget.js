import { CONTACT } from '@/config/siteConfig';

/** Widget mode: 'whatsapp' today; swap to 'chatbot' when an AI SDK is wired in. */
export const CHAT_WIDGET_MODE = 'whatsapp';

export const WHATSAPP_CONFIG = {
  phone: CONTACT.whatsapp,
  defaultMessage:
    'Hi Fulcrum System — I would like to discuss a project. Could we schedule a consultation?',
};

export const CHATBOT_CONFIG = {
  /** Placeholder for a future AI chatbot SDK integration. */
  apiKey: import.meta.env.VITE_CHATBOT_API_KEY || '',
  endpoint: import.meta.env.VITE_CHATBOT_ENDPOINT || '',
};

export function getWhatsAppUrl(message = WHATSAPP_CONFIG.defaultMessage) {
  const params = new URLSearchParams({ text: message });
  return `https://wa.me/${WHATSAPP_CONFIG.phone}?${params.toString()}`;
}
