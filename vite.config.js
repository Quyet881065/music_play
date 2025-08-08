import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({  // Đây là cách vite xuất cấu hình (config) ra ngoài 
  plugins: [react() ,tailwindcss()], //
   resolve: {
    alias: {  // Đặt bí danh cho đường dẫn thư mục để import gọn hơn 
      '@' : path.resolve(__dirname, './src') // @ sẽ được thay bằng đường dẫn tuyệt đối trỏ đến thư mục src.
    }
   } 
})
