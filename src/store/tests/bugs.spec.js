import { addBug } from "../bugs";
import configureStore from "../configure-store";

describe("bugSlice", () => {
  it("should handle the addBug action", async () => {
    const store = configureStore();
    const bug = { description: "as" };
    await store.dispatch(addBug(bug));
    console.log("store.getstate:", store.getState());
    expect(store.getState().entities.bugs.list).toHaveLength(1);
  });
});
