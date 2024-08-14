// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {
        enabled: true,

        timeline: {
            enabled: true,
        },
    },
    experimental: {
        typedPages: true,
    },
    modules: [
        '@nuxtjs/eslint-module',
        '@pinia/nuxt',
        '@nuxt/image',
        '@pinia-plugin-persistedstate/nuxt',
        'frog-modal',
        '@nuxtjs/google-fonts',
        '@nuxtjs/device',
        '@nuxtjs/stylelint-module',
    ],
    device: {
        refreshOnResize: true,
    },
    piniaPersistedstate: {
        cookieOptions: {
            sameSite: 'strict',
        },
        storage: 'localStorage',
    },
    runtimeConfig: {
        public: {
            api: process.env.API_URL || '/api',
            yandex_api_key: process.env.YANDEX_API_KEY || '',
        },
    },
    components: [
        { path: '~/shared/ui', prefix: 'Ui', extensions: ['.vue'] },
        { path: '~/shared/icons', prefix: 'Icon' },
        { path: '~/widgets', prefix: 'Widget', extensions: ['.vue'] },
        { path: '~/features', prefix: 'Feature', extensions: ['.vue'] },
        { path: '~/entities', prefix: 'Entity', extensions: ['.vue'] },
    ],
    googleFonts: {
        families: {
            'Wix Madefor Text': [400, 500, 600, 700],
            Raleway: [400, 500, 600, 700],
            Lato: [400],
            'Golos Text': [400, 500, 600, 700],
        },
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "~/assets/styles/collection/index.scss";',
                },
            },
        },
    },
});
