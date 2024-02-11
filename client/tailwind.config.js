import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    nextui({
      prefix: 'expense-tracker',
      themes: {
        dark: {
          colors: {
            foreground: {
              700: '#F1F2F4',
              600: '#DCDFE4',
              500: '#B3B9C4',
              400: '#8590A2',
              300: '#758195',
              200: '#626F86',
              100: '#44546F',
              50: '#2C3E5D',
              DEFAULT: '#F1F2F4',
              foreground: '#F1F2F4',
            },
            background: {
              100: '#DEE4EA',
              200: '#B6C2CF',
              300: '#8C9BAB',
              400: '#596773',
              500: '#454F59',
              600: '#38414A',
              700: '#282E33',
              800: '#1D2125',
              900: '#101214',
              DEFAULT: '#1D2125',
              foreground: '#00FF00',
            },
            default: {
              50: '#38291E',
              100: '#282E33',
              200: '#454F59',
              300: '#C25100',
              400: '#8C9BAB',
              500: '#F38A3F',
              600: '#FEA362',
              700: '#FEC195',
              800: '#FEDEC8',
              900: '#FFF3EB',
              DEFAULT: '#F38A3F',
              foreground: '#38291E',
            },
            primary: {
              50: '#38291E',
              100: '#702E00',
              200: '#A54800',
              300: '#C25100',
              400: '#E56910',
              500: '#F38A3F',
              600: '#FEA362',
              700: '#FEC195',
              800: '#FEDEC8',
              900: '#FFF3EB',
              DEFAULT: '#F38A3F',
              foreground: '#FFFFFF',
            },
            secondary: {
              100: '#CCFEFC',
              200: '#99FDFE',
              300: '#66F0FE',
              400: '#40DFFD',
              500: '#02C2FC',
              600: '#0197D8',
              700: '#0171B5',
              800: '#005092',
              900: '#003A78',
              DEFAULT: '#02C2FC',
            },
            success: {
              100: '#F0FEE4',
              200: '#DEFDC9',
              300: '#C6F9AD',
              400: '#AEF496',
              500: '#8AED74',
              600: '#61CB54',
              700: '#3DAA3A',
              800: '#258929',
              900: '#167121',
              DEFAULT: '#8AED74',
            },
            warning: {
              100: '#FFFDD6',
              200: '#FFFBAD',
              300: '#FFF883',
              400: '#FFF565',
              500: '#FFF132',
              600: '#DBCD24',
              700: '#B7AA19',
              800: '#93880F',
              900: '#7A6F09',
              DEFAULT: '#FFF132',
            },
            danger: {
              100: '#FFE6D8',
              200: '#FFC8B2',
              300: '#FFA38B',
              400: '#FF806F',
              500: '#FF463F',
              600: '#DB2E36',
              700: '#B71F33',
              800: '#93142F',
              900: '#7A0C2D',
              DEFAULT: '#FF463F',
            },
          },
        },
        light: {
          colors: {
            foreground: {
              50: '#F1F2F4',
              100: '#DCDFE4',
              200: '#B3B9C4',
              300: '#8590A2',
              400: '#758195',
              500: '#626F86',
              600: '#44546F',
              700: '#2C3E5D',
              DEFAULT: '#101214',
              foreground: '#ff0000',
            },
            background: {
              900: '#FFFFFF',
              800: '#DCDFE4',
              700: '#F1F2F4',
              600: '#B3B9C4',
              500: '#8590A2',
              400: '#758195',
              300: '#626F86',
              200: '#44546F',
              100: '#172B4D',
              50: '#091E42',
              DEFAULT: '#fff',
              foreground: '#00FF00',
            },
            default: {
              900: '#38291E',
              800: '#282E33',
              700: '#454F59',
              600: '#C25100',
              500: '#8C9BAB',
              400: '#758195',
              300: '#FEA362',
              200: '#DCDFE4',
              100: '#F1F2F4',
              50: '#FFF3EB',
              DEFAULT: '#F38A3F',
              foreground: '#38291E',
            },
            primary: {
              50: '#38291E',
              100: '#702E00',
              200: '#A54800',
              300: '#C25100',
              400: '#E56910',
              500: '#F38A3F',
              600: '#FEA362',
              700: '#FEC195',
              800: '#FEDEC8',
              900: '#FFF3EB',
              DEFAULT: '#F38A3F',
              foreground: '#FFFFFF',
            },
            secondary: {
              100: '#CCFEFC',
              200: '#99FDFE',
              300: '#66F0FE',
              400: '#40DFFD',
              500: '#02C2FC',
              600: '#0197D8',
              700: '#0171B5',
              800: '#005092',
              900: '#003A78',
              DEFAULT: '#02C2FC',
            },
            success: {
              100: '#F0FEE4',
              200: '#DEFDC9',
              300: '#C6F9AD',
              400: '#AEF496',
              500: '#8AED74',
              600: '#61CB54',
              700: '#3DAA3A',
              800: '#258929',
              900: '#167121',
              DEFAULT: '#3DAA3A',
            },
            warning: {
              100: '#FFFDD6',
              200: '#FFFBAD',
              300: '#FFF883',
              400: '#FFF565',
              500: '#FFF132',
              600: '#DBCD24',
              700: '#B7AA19',
              800: '#93880F',
              900: '#7A6F09',
              DEFAULT: '#FFF132',
            },
            danger: {
              100: '#FFE6D8',
              200: '#FFC8B2',
              300: '#FFA38B',
              400: '#FF806F',
              500: '#FF463F',
              600: '#DB2E36',
              700: '#B71F33',
              800: '#93142F',
              900: '#7A0C2D',
              DEFAULT: '#FF463F',
            },
          },
        },
      },
    }),
  ],
};
