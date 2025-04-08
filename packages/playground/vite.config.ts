import { fileURLToPath, URL } from 'node:url'
import prerenderSkeleton from '@prerender/skeleton'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'
const Renderer=prerenderSkeleton.Render
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    prerenderSkeleton({
      routes: [{ path: '/test', skeleton: true }],
      // 静态文件目录
      staticDir: path.join(__dirname, 'dist'),
      // 是否压缩 HTML 文件
      //  minify: true,
      // 网络请求失败、404 错误等情况下应该返回的 HTML 文件
      // fallback: 'index.html',
      // 渲染时是否显示浏览器窗口，值写false可用于调试
      renderer: new Renderer({
        injectProperty: '__skeleton_mock',
        // Optional - Any values you'd like your app to have access to via `window.injectProperty`.
        headless: true,
        renderAfterTime: 5000, // Wait 5 seconds.
        consoleHandler: (route, message) => {
          if (message.type() === 'error') {
            console.log('route is', route, 'message is', message)
          }
        },
      }),
      server: {
        // Normally a free port is autodetected, but feel free to set this if needed.
        port: 9892,
      },
    }),
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
