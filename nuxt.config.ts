// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    build: {
        transpile: ['vue-toastification'],
    },
    modules: [
        '@nuxtjs/eslint-module',
        '@pinia/nuxt',
        '@nuxt/image',
        '@pinia-plugin-persistedstate/nuxt',
        'frog-modal',
        '@nuxtjs/google-fonts',
    ],
    piniaPersistedstate: {
        storage: 'localStorage', // 'localStorage', 'sessionStorage' or 'cookies'
    },
    runtimeConfig: {
        public: {
            api: process.env.API_URL,
        },
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/assets/styles/collection/index.scss";',
                },
            },
        },
    },
});
