<script setup>
defineProps(['local'])
</script>

<template>
  <div @click="$emit('clickHotLocalButton', local.value)" class="cursor-pointer">
    {{ local.name }}
  </div>
</template>

<style scoped></style>