import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { addBug, resolveBug, loadBugs } from "../bugs";
import configureStore from "../configure-store";
import { getUnresolvedBugs } from "./../bugs";

describe("bugSlice", () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  const bugSlice = () => store.getState().entities.bugs;

  const createState = () => ({
    entities: {
      bugs: {
        list: [],
      },
    },
  });

  describe("loading bugs", () => {
    describe("if the bugs exist in the cache", () => {
      it("should not be fetched from the sever again", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());
        await store.dispatch(loadBugs());

        expect(bugSlice().list).toHaveLength(1);
      });
    });
    describe("if the bugs don't exist in the cache", () => {
      it("should be fetched from the sever and put in the store", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());

        expect(fakeAxios.history.get.length).toBe(1);
      });

      describe("loading indicators", () => {
        it("should be true while fetching the bugs", () => {
          fakeAxios.onGet("/bugs").reply(() => {
            expect(bugSlice().loading).toBe(true);
            return [200, [{ id: 1 }]];
          });

          store.dispatch(loadBugs());
        });
        it("should be false while fetching the bugs", async () => {
          fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);
          await store.dispatch(loadBugs());
          expect(bugSlice().loading).toBe(false);
        });
        it("should be false if the server return error", async () => {
          fakeAxios.onGet("/bugs").reply(500);
          await store.dispatch(loadBugs());
          expect(bugSlice().loading).toBe(false);
        });
      });
    });
  });

  it("should add the bug to store if it stored to server", async () => {
    // Arrange
    const bug = { description: "as" };
    const savedBug = { ...bug, id: 1 };
    fakeAxios.onPost("/bugs").reply(200, savedBug);

    // Act
    await store.dispatch(addBug(bug));

    // Assert
    expect(bugSlice().list).toContainEqual(savedBug);
  });

  it("should not add bug to store if it not stored to server", async () => {
    const bug = { description: "as" };
    fakeAxios.onPost("/bugs").reply(500);

    await store.dispatch(addBug(bug));

    expect(bugSlice().list).toHaveLength(0);
  });

  it("should mark the bug as resolved if it is saved to server", async () => {
    fakeAxios.onPost("/bugs").reply(200, { id: 1 });
    fakeAxios.onPatch("/bugs/1").reply(200, { id: 1, isResolved: true });

    await store.dispatch(addBug({}));
    await store.dispatch(resolveBug(1));

    expect(bugSlice().list[0].isResolved).toBe(true);
  });

  it("should not mark the bug as resolved if it is not saved to server", async () => {
    fakeAxios.onPost("/bugs").reply(200, { id: 1 });
    fakeAxios.onPatch("/bugs/1").reply(500);

    await store.dispatch(addBug({}));
    await store.dispatch(resolveBug(1));

    expect(bugSlice().list[0].isResolved).not.toBe(true);
  });

  describe("selectors", () => {
    it("get unresolved bugs", () => {
      const state = createState();
      state.entities.bugs.list = [
        { id: 1, isResolved: true },
        { id: 2 },
        { id: 2 },
      ];

      const result = getUnresolvedBugs(state);

      expect(result).toHaveLength(2);
    });
  });
});
