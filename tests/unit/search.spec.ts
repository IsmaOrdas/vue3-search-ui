
import {useSearch} from "../../src/composables/search";
import { describe, expect, vi , it} from 'vitest';


describe("useSearch composable", () => {

    // Tests that the toggleshowresults function updates the showresults value. 
    it("test_toggle_results", () => {
        const { toggleShowResults, showResults } = useSearch(vi.fn());
        toggleShowResults();
        expect(showResults.value).toBe(true);
        toggleShowResults();
        expect(showResults.value).toBe(false);
    });
})