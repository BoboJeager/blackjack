<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <div class="flex inset-x-0 top-0 absolute">
            <slot  name="dealer"></slot>
        </div>
        <div class="flex inset-x-0 bottom-0 absolute">
            <slot name="player"></slot>
        </div>
        <div class="absolute inset-y-0 right-0">
            <slot name="deck"></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
</script>