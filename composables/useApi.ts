// --- Composable для отправки запросов к апи --- //

import type { UseFetchOptions } from '#app';
import { defu } from 'defu';
import { UserTokens } from '~/utils/enums/user/UserTokens';

export function useApi<T>(url: string, requestOptions: UseFetchOptions<T> = {}) {
    const config = useRuntimeConfig();
    const accessToken = useCookie(UserTokens.ACCESS);
    const refreshToken = useCookie(UserTokens.REFRESH);

    const defaults: UseFetchOptions<T> = {
        baseURL: config.public.api,
        key: url,
        server: false,
        retry: 2,
        retryStatusCodes: [401],
        retryDelay: 500, // can safely delete this

        onRequest({ options }) {
            const headers = new Headers(options.headers);
            headers.set('Authorization', 'Bearer ' + accessToken.value);

            options.headers = headers;
        },

        async onResponseError({ response }) {
            if (response.status === 401) {
                await useFetch('/auth/refresh', {
                    baseURL: config.public.api,
                    method: 'POST',
                    server: false,
                    body: {
                        refresh_token: refreshToken.value,
                    },
                    credentials: 'include',

                    onResponse() {
                        // store token
                    },
                });
            }
        },
    };

    const params = defu(requestOptions, defaults);

    return useFetch(url, params);
}
