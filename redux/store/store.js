import { createStore, applyMiddleware, combineReducers, compose } from "redux";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
// reducers list
import rootReducer from "../reducer/rootReducer";

function configureStore(initialState = {}) {
  const reducer = combineReducers({
    auth: () => ({ mock: true }),
    vantage: persistReducer(
      {
        key: "Vantage", // key for localStorage key, will be: "persist:form"
        storage,
        debug: true,
        blacklist: ["foo", "quotesReducer"],
      },
      rootReducer
    ),
  });

  const store = createStore(
    persistReducer(
      {
        key: "VantageAuth",
        debug: true,
        storage,
        whitelist: ["auth"],
      },
      reducer
    ),
    initialState,
    compose(applyMiddleware(thunk))
  );

  const persistor = persistStore(store, null, () => {
    // if you want to get restoredState
    return store.getState();
  });

  return { store, persistor };
}

export default configureStore;
