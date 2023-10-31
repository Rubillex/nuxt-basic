// Базовые кастомные валидаторы для полей форм

import { defineRule } from 'vee-validate';

defineRule('required', (value: any) => {
    if (!value || (Array.isArray(value) && !value.length)) return 'Поле должно быть заполнено';

    return true;
});

defineRule('email', (value: string) => {
    if (!value || !value.length) {
        return true;
    }

    if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/.test(value)) {
        return 'Почта введена некорректно';
    }

    return true;
});

defineRule('string', (value: any) => {
    if (typeof value !== 'string') return 'Поле должно быть строкой';

    return true;
});

defineRule('number', (value: any) => {
    if (typeof value !== 'number') return 'Поле должно быть числом';

    return true;
});

defineRule('min', (value: string, [limit]: [limit: number]) => {
    if (!value || !value.length) {
        return true;
    }
    if (value.length < limit) {
        return `Значение должно быть не менее ${limit} символов`;
    }
    return true;
});

defineRule('max', (value: string, [limit]: [limit: number]) => {
    if (!value || !value.length) {
        return true;
    }
    if (value.length > limit) {
        return `Значение должно быть не более ${limit} символов`;
    }
    return true;
});

defineRule('date_format', (value: string, [format]: [format: string]) => {
    return dayjs(value, format).format(format) === value ? true : `Дата должна соответствовать формату ${format}`;
});
