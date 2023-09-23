<template>
  <div class="flex h-screen flex-col items-center justify-center">
    <div class="absolute inset-x-0 top-0 flex">
      <slot name="dealer"></slot>
    </div>
    <div class="absolute inset-x-0 bottom-0 flex">
      <slot name="player"></slot>
    </div>
    <div class="absolute inset-y-0 right-0">
      <slot name="deck"></slot>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
