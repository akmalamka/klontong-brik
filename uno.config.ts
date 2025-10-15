import { defineConfig, presetIcons, presetWebFonts, presetWind3, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    colors: {
      primary: {
        DEFAULT: '#D03A2B',
        dark: '#A12F24',
      },
      info: '#2757A5',
      error: '#991B1B',
      success: '#10B981',
      base: '#F8F4E9',
      white: '#FFFFFF',
      black: '#000000',
      gray: '#6B7280',
    },
  },
  shortcuts: [
    ['h1', 'font-display text-[60px] leading-[1.1] tracking-[-0.02em] font-500'],
    ['h2', 'font-display text-[48px] leading-[1.15] tracking-[-0.015em] font-600'],
    ['h3', 'font-display text-[28px] leading-[1.2] tracking-[-0.01em] font-500'],
    ['h4', 'font-sans text-[20px] leading-[1.3] font-500'],
    ['h5', 'font-sans text-[16px] leading-[1.3] font-500'],

    ['body-text', 'font-sans text-[16px] leading-[1.5] font-500'],
    ['body-text-small', 'font-sans text-[16px] leading-[1.5]'],
    ['caption', 'font-sans text-[12px] leading-[1.4] tracking-[0.025em]'],

    ['btn-text', 'font-sans text-[16px] leading-[1.2] tracking-[0.01em] font-600'],
    ['btn-text-small', 'font-sans text-[14px] leading-[1.2] tracking[-0.05em] font-500'],

    ['btn-primary', 'px-4 py-2 rounded-lg bg-primary text-white hover:bg-[#b92d20] transition'],
    ['btn-secondary', 'px-4 py-2 rounded-lg border border-gray-100 text-gray-700 bg-cream hover:bg-gray-100 transition'],
  ],
  presets: [
    presetWind3(),
    presetWebFonts({
      provider: 'fontshare',
      fonts: {
        display: 'Clash Display',
        sans: 'Clash Grotesk',
      },
    }),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      scale: 1.25,
      warn: true,
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
