// --- Composable для отправки запросов к апи --- //

import { defu } from 'defu';
import { UseFetchOptions } from '#app';
import { UserTokens } from '~/utils/enums/user/UserTokens';

export function useApi<T>(url: string, options: UseFetchOptions<T> = {}) {
    const accessToken = useCookie(UserTokens.ACCESS);
    const refreshToken = useCookie(UserTokens.REFRESH);

    // Инициализация стейта, необходимого для доступа к переменным, описанным в .env файле
    const config = useRuntimeConfig();

    // Объект для описания заголовков запросов
    const headers = {};

    const defaults: UseFetchOptions<T> = {
        baseURL: config.public.api,
        key: url,
        headers: accessToken.value ? { ...headers, Authorization: '' } : headers,
        onResponse(_ctx) {
            // Область для
        },
        onResponseError(_ctx) {
            if (_ctx.response.status === 401) {
                // Область для вызова запроса на обновление токена
                /* eslint-disable no-console */
                console.log(refreshToken);
                /* eslint-enable no-console */
            }
        },
    };

    const params = defu(options, defaults);

    return useFetch(url, params);
}
