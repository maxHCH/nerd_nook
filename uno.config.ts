import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  postcss: false,
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-jp-text text-white cursor-pointer hover:bg-jp-muted disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100'],
    ['page', 'min-h-screen bg-jp-bg text-jp-text'],
    ['container', 'mx-auto w-full max-w-2xl px-6 py-20 md:px-8 md:py-28'],
    ['container-wide', 'mx-auto w-full max-w-4xl px-6 py-20 md:px-10 md:py-28'],
    ['navlink', 'text-sm text-jp-muted tracking-wide transition-colors duration-200 hover:text-jp-text'],
    ['card', 'block border-b border-jp-border/60 py-8 transition-colors duration-200 hover:bg-jp-surface/50'],
    ['card-box', 'block border border-jp-border/50 bg-white p-6 md:p-8 transition-colors duration-200 hover:border-jp-muted/40'],
    ['meta', 'text-xs tracking-widest uppercase text-jp-muted'],
    ['prose-jp', 'max-w-none text-base leading-9 tracking-wide text-jp-text'],
    ['title-xl', 'text-3xl md:text-5xl font-serif leading-tight tracking-tight'],
    ['title-lg', 'text-2xl md:text-3xl font-serif leading-snug'],
    ['title-md', 'text-xl md:text-2xl font-serif leading-snug'],
  ],
  theme: {
    colors: {
      jp: {
        bg: 'var(--jp-bg)',
        surface: 'var(--jp-surface)',
        text: 'var(--jp-text)',
        muted: 'var(--jp-muted)',
        border: 'var(--jp-border)',
        link: 'var(--jp-text)',
      },
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
      processors: createLocalFontProcessor(),
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
