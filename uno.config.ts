import presetWebFonts from '@unocss/preset-web-fonts'
import presetWind4 from '@unocss/preset-wind4'
import { defineConfig } from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      primary: {
        DEFAULT: '#D03A2B',
        dark: '#A12F24',
      },
      info: '#2757A5',
      error: '#991B1B',
      success: '#10B981',
      cream: '#F8F4E9',
      white: '#FFFFFF',
      black: '#000000',
      gray: '#6B7280',
    },
  },
  shortcuts: [
    ['h1', 'font-clashDisplay text-[60px] leading-[1.1] tracking-[-0.02em] font-600'],
    ['h2', 'font-clashDisplay text-[48px] leading-[1.15] tracking-[-0.015em] font-600'],
    ['h3', 'font-clashDisplay text-[28px] leading-[1.2] tracking-[-0.01em] font-500'],
    ['h4', 'font-clashGrotesk text-[20px] leading-[1.3] font-500'],
    ['h5', 'font-clashGrotesk text-[16px] leading-[1.3] font-500'],

    ['body-text', 'font-clashGrotesk text-[16px] leading-[1.5]'],
    ['body-text-small', 'font-clashGrotesk text-[16px] leading-[1.5]'],
    ['caption', 'font-clashGrotesk text-[12px] leading-[1.4] uppercase tracking-[0.025em]'],

    ['btn-text', 'font-clashGrotesk text-[16px] leading-[1.2] font-600'],
    ['btn-text-small', 'font-clashGrotesk text-[14px] leading-[1.2] tracking[-0.05em] font-500'],

    ['btn-primary', 'px-4 py-2 rounded-lg bg-primary text-white hover:bg-[#b92d20] transition'],
    ['btn-secondary', 'px-4 py-2 rounded-lg border border-gray-100 text-gray-700 bg-cream hover:bg-gray-100 transition'],
  ],
  presets: [
    presetWind4(),
    presetWebFonts({
      provider: 'fontshare',
      fonts: {
        clashDisplay: 'Clash Display',
        clashGrotesk: 'Clash Grotesk',
      },
    }),
  ],
})
