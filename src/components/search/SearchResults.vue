<template>
  <div class="search-results__wrap">
    <div class="search-results scrollbar scrollbar-rounded scrollbar-w-4px scrollbar-radius-2 scrollbar-track-radius-4 scrollbar-thumb-radius-4" :class="{ 'search-results--open': open }">
      <div v-for="(value, key) in results">
        <span class="search-results__title">{{ key }}</span>
        <ul class="search-results__list">
          <search-result-item 
            v-for="el in value.items.slice(0, 5)" 
            :item="el"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  results: {},
  open: boolean
}

const props = withDefaults(defineProps<Props>(), {
  results: () => ({}),
  open: false
})
</script>

<style lang="scss" scoped>
.search-results {
  background-color: white;
  border-radius: 8px;
  height: calc(100% - 4px);
  max-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding-left: 10px;
  transition: max-height .3s ease;
  width: calc(100% - 8px);

  &__wrap {
    width: 100%;
  }

  &--open {
    margin-bottom: 8px;
    max-height: 300px;
  }

  @media (min-width: 1100px) {
    max-width: 600px;
  }

  &__title {
    color: #828282;
    display: block;
    font-weight: 500;
    padding: 6px;
    text-transform: capitalize;
  }

  &__list {
    padding: 5px;

    &:first {
      border-top: 0;
    }

    &:last-child {
      border-bottom: 0;
      padding-bottom: 0;
    }
  }
}
</style>