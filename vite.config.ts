import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import UnoCSS from 'unocss/vite';
import presetIcons from '@unocss/preset-icons';
import presetUno from '@unocss/preset-uno'
import { presetScrollbar } from 'unocss-preset-scrollbar'
import presetAttributify from '@unocss/preset-attributify'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: ['src/**/components'],
      deep: true,
      extensions: ['vue'],
      allowOverrides: false,
      include: [/\.vue$/, /\.vue\?vue/],
      exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/],
      dts: 'src/components.d.ts'
    }),
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
      ],
      dirs: [
        './src/components',
        './src/composables'
      ],
      dts: 'src/auto-imports.d.ts',
      vueTemplate: true,
      eslintrc: {
        enabled: false,
        filepath: './.eslintrc-auto-import.json', 
        globalsPropValue: true,
      }
    }),
    UnoCSS({
      presets: [
        presetUno(),
        presetIcons({
          extraProperties: {
            'display': 'inline-block',
            'vertical-align': 'middle'
          },
        }),
        presetAttributify(),
        presetScrollbar(),
      ],
      theme: {
        breakpoints: {
          lg: '1100px',
        },
      }
    }),

  ],
  build: {
    target: 'esnext'
  }
})
