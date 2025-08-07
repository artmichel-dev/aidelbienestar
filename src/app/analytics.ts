// Google Analytics configuration for AIdelBienestar
// Replace 'G-XXXXXXXXXX' with your actual Google Analytics measurement ID

export const GA_TRACKING_ID = 'G-XXXXXXXXXX' // Replace with your GA4 measurement ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    })
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track chat interactions
export const trackChatMessage = (messageType: 'user' | 'assistant', messageLength: number) => {
  event({
    action: 'chat_message',
    category: 'engagement',
    label: messageType,
    value: messageLength,
  })
}

// Track page views for SEO
export const trackPageView = (page: string) => {
  pageview(page)
  event({
    action: 'page_view',
    category: 'navigation',
    label: page,
  })
}

// Track user engagement
export const trackEngagement = (action: string, label: string) => {
  event({
    action,
    category: 'engagement',
    label,
  })
}

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, unknown>
    ) => void
  }
} 