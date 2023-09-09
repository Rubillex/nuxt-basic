export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('click-outside', {
        updated(el, binding) {
            el.clickOutsideEvent = (event: Event) => {
                if (!(el === event.target || el.contains(event.target))) {
                    binding.value();
                }
            };
            document.body.addEventListener('click', el.clickOutsideEvent);
        },
    });
});
