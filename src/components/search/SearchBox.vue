<template>
  <div ref="searchBox" class="search-box">
    <form @submit.prevent class="search-box__form">
      <label class="flex items-center w-full" for="search-input">
        <div class="search-box__icon-wrap" style="width: 30px;">
          <span v-if="loading" class="loader"></span>
          <span v-else class="i-mdi-magnify search-box__search-icon"></span>
        </div>
        <input 
          autocomplete="off"
          id="search-input"
          v-model="searchInput" 
          class="search-box__input" 
          type="text" 
          @keyup="triggerSearch"
        />
      </label>
      <button @click="clearInput" class="search-box__clear" v-if="searchInput.length">Clear</button>
    </form>
    <search-results :results="results" :open="showResults"></search-results>
  </div>
</template>

<script lang="ts" setup>
import { useDebounceFn } from '@vueuse/core';
import { searchMusic } from '../../api/search';
import { onClickOutside } from '@vueuse/core'
const { searchInput, showResults, results, loading, callFetch, toggleShowResults, clearInput } = useSearch(searchMusic);

const searchBox = ref(null);

onClickOutside(searchBox, () => toggleShowResults());

const triggerSearch = useDebounceFn(async () => {
  await callFetch(searchInput.value);
  
  if (!loading.value && results.value !== null) {
    toggleShowResults();
  }
}, 400)
</script>

<style lang="scss" scoped>
.search-box {
  align-items: center;
  border-radius: 8px;
  box-shadow: 0 0 3px var(--dark-gray);
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 50px;
  padding: 0;
  position: absolute;
  margin: 0 auto;
  top: 40px;
  left: 0;
  right: 0;
  width: 100%;

  @media (min-width: 900px) {
    max-width: 600px;
  }

  &__form {
    display: flex;
    height: 50px;
    padding: 0 10px;
    width: 100%;
  }

  &__input {
    border: 0;
    font-size: 20px;
    height: 40px;
    padding: 0 0 0 10px;
    width: 100%;

    &:focus {
      outline: none;
    }
  }

  &__search-icon,
  &__clear {
    color: var(--dark-gray);
    cursor: pointer;
  }

  &__search-icon {
    font-size: 26px;
  }

  &__clear {
    font-weight: 700;
  }

  &__icon-wrap {
    align-items: center;
    display: flex;
    height: 50px;
  }
}

.loader {
  width: 24px;
  height: 24px;
  border: 2px solid var(--dark-gray);
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }
}
</style>