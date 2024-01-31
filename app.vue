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
</script>

<style lang="scss">
.test {
    display: flex;
}
</style>
