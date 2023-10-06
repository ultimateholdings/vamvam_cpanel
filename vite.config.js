import {
  defineConfig
} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
const config = defineConfig({
  plugins: [react(), ],
});

const configProd = defineConfig({
  plugins: [react(), ],
  base: "./"
});

const  defaultConfig =  process.env.VITE_API_URL == 'production' ? configProd : config;

export default defaultConfig