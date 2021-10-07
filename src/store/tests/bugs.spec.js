import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { addBug, resolveBug } from "../bugs";
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

  describe("selectors", () => {
    it("get unresolved bugs", async () => {
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
