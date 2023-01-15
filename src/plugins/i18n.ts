import { messages } from '@/locales/messages'
import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale:
    process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  allowComposition: true,
  messages: messages
})
