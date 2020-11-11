import { createStore } from "redux";
import reducer, { State } from "./reducers";

export const makeStore = (initialState?: State) => {
    const store = createStore(reducer, initialState);
    return store;
};

export * from "./actions";
export * from "./reducers";
