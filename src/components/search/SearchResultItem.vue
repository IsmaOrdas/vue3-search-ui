<template>
  <li class="search-result__item">
    <picture v-if="hasImage(item)">
      <img 
        class="search-result__img" 
        :src="item.images[0].url" 
        width="40" 
      />
    </picture>
    <div v-else class="search-result__music-icon">
      <span class="i-mdi-music"></span>
    </div>
    <span class="search-result__name">{{ item.name }}</span>
  </li>
</template>

<script lang="ts" setup>
interface Props {
  item: {}
}

const props = withDefaults(defineProps<Props>(), {
  item: () => ({})
})

const hasImage = computed(() => (el) => el.hasOwnProperty('images'))
</script>

<style lang="scss" scoped>
.search-result {

  &__item {
    align-items: center;
    display: flex;
    height: 54px;
  }

  &__img {
    border-radius: 4px;
    margin-right: 8px;
  }

  &__name {
    font-size: 18px;
  }

  &__music-icon {
    align-items: center;
    background-color: var(--light-gray);
    border-radius: 4px;
    height: 40px;
    display: flex;
    justify-content: center;
    margin-right: 8px;
    width: 40px;

    span {
      font-size: 24px;
    }
  }
}
</style>