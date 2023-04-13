
import {useSearch} from "../../src/composables/search";
import { describe, expect, vi , it} from 'vitest';


describe("useSearch composable", () => {

    // Tests that search input is properly set and can be cleared. 
    it("test_search_input", () => {
        const { searchInput, clearInput } = useSearch(() => {});

        searchInput.value = "test";
        expect(searchInput.value).toBe("test");

        clearInput();
        expect(searchInput.value).toBe("");
    });

    // Tests that the toggleshowresults function updates the showresults value. 
    it("test_toggle_results", () => {
        const { toggleShowResults, showResults } = useSearch(vi.fn());
        toggleShowResults();
        expect(showResults.value).toBe(true);
        toggleShowResults();
        expect(showResults.value).toBe(false);
    });

    // Tests that loading variable is set to true during data fetching.  
    it("test_loading_variable", async () => {
        const fetcher = vi.fn(() => new Promise(resolve => setTimeout(() => resolve({ data: [] }), 1000)));
        const { loading, callFetch } = useSearch(fetcher);

        expect(loading.value).toBe(false);

        callFetch();

        expect(loading.value).toBe(true);

        await new Promise(resolve => setTimeout(resolve, 1000));

        expect(loading.value).toBe(false);
    });

    // Tests that results variable is properly reset if fetcher function fails.  
    it("test_results_reset", async () => {
        const fetcher = vi.fn(() => new Promise((_, reject) => setTimeout(() => reject("error"), 1000)));
        const { results, callFetch } = useSearch(fetcher);

        expect(results.value).toEqual({});

        callFetch();

        await new Promise(resolve => setTimeout(resolve, 1000));

        expect(results.value).toEqual({});
    });
})