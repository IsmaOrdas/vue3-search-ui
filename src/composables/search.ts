import { ref } from "vue";

export function useSearch(fetcher: Function) {
  const searchInput = ref("");
  const results = ref({});
  const loading = ref(false);
  const error = ref();
  const showResults = ref(false);

  const clearInput = () => {
    searchInput.value = "";
    toggleShowResults();
  }

  const toggleShowResults = () => {
    showResults.value = !showResults.value;
  }

  const callFetch = async (...params: any) => {
    loading.value = true;
    results.value = {};
    error.value = null;

    try {
      const response = await fetcher(...params);
      results.value = response.data ? response.data : [];

    } catch (err: unknown) {
      error.value = err;
    }

    loading.value = false;
  };

  return { searchInput, showResults, results, loading, error, callFetch, toggleShowResults, clearInput };
}