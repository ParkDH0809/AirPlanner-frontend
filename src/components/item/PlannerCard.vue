<script setup>
const props = defineProps(['planner'])

</script>

<template>
  <div>
    <div class="grid m-1 min-w-24" @click="$router.push({ path: `/planner/${planner.plannerId}` })">
      <div
        class="relative flex flex-col shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 max-w-sm">
        <a href="" class="hover:text-orange-600 absolute z-30 top-2 right-0 mt-2 mr-3">
          <src xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </src>
        </a>
        <a href="" class="z-20 absolute h-full w-full top-0 left-0 ">&nbsp;</a>
        <div class="h-auto overflow-hidden">
          <div class="h-44 overflow-hidden relative">
            <img :src="planner.plannerThumbnail" alt="">
          </div>
        </div>
        <div class="bg-white py-4 px-3">
          <h3 class="text-xs mb-2 font-medium">{{ planner.plannerTitle }}</h3>
          <div class="flex justify-between items-center">
            <p class="text-xs text-gray-400">{{ planner.plannerSDate }} ~ {{ planner.plannerEDate }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>