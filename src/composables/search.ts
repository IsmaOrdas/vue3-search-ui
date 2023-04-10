import { ref } from "vue";

export function useSearch(fetcher: Function) {
  const searchInput = ref("");
  const results = ref({});
  const status = ref(null);
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
      status.value = response.status;

    } catch (err: unknown) {
      error.value = err;
    }
    loading.value = false;
  };

  return { searchInput, showResults, results, loading, error, status, callFetch, toggleShowResults, clearInput };
}