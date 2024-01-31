<template>
    <div class="test" @click="increment">
        {{ count }}
    </div>
</template>

<script lang="ts" setup>
const count = ref(0);

const increment = () => {
    count.value += 1;
};

const { data: response } = useApi('/auth/me', {
    method: 'GET',
});

console.log('response', response);

// const {data: response} = useApi(`${config.public.baseUrl}/route-groups`, {
//    method: 'GET',
//    headers: {
//        'Authorization': `Bearer ${authToken.value}`,
//    },
//    watch: false,
//    params: payload.value,
//    onResponse({response}) {
//        // @ts-ignore
//        res.value.push(...response._data.data.items);
//
//        pagination.value = response._data.data.pagination;
//
//        res.value.forEach((routeGroup: { route: object; reverse_route: object; }) => {
//            if (routeGroup.route !== null) {
//                // @ts-ignore
//                polylines.value.push(routeGroup.route);
//            }
//            if (routeGroup.reverse_route !== null) {
//                // @ts-ignore
//                polylines.value.push(routeGroup.reverse_route);
//            }
//        });
//
//        if (pagination.value.page < pagination.value.lastPage) {
//            setTimeout(() => incrementPage(), 200);
//        }
//    },
// });
</script>

<style lang="scss">
.test {
    display: flex;
}
</style>
