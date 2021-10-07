import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { addBug } from "../bugs";
import configureStore from "../configure-store";

describe("bugSlice", () => {
  it("should handle the addBug action", async () => {
    const bug = { description: "as" };
    const savedBug = { ...bug, id: 1 };

    const fakeAxios = new MockAdapter(axios);
    fakeAxios.onPost("/bugs").reply(200, savedBug);

    const store = configureStore();
    await store.dispatch(addBug(bug));
    console.log("store.getstate:", store.getState().entities.bugs.list);
    expect(store.getState().entities.bugs.list).toContainEqual(savedBug);
  });
});
