// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    build: {
        transpile: ['vue-toastification'],
    },
    modules: ['@nuxtjs/eslint-module', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', 'frog-modal'],
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
