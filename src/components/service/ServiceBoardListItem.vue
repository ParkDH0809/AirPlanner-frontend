<script setup>
defineProps({
  data: Object,
});
</script>

<template>
  <table class="w-full table-fixed cursor-pointer" @click="$router.push(`/service/${data.boardId}`)">
    <tr class="hover:bg-gray-200">
      <td class="w-2/12 truncate">{{ data.boardId }}</td>
      <td class="w-8/12 truncate">{{ data.boardTitle }}</td>
      <td class="w-2/12 truncate">{{ data.boardAdminId }}</td>
    </tr>
  </table>
</template>

<style scoped>
td {
  margin: 0.5rem;
  padding: 0.75rem;
  border-bottom-width: 1px;
}
</style>
