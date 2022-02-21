import { getItemIndex } from "./utils.js";

describe("getItemIndex", () => {
    it("gets last part of url", () => {
        const url = "path/to/index/22/";

        expect(getItemIndex(url)).toBe("22")
    })
})