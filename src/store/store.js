import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";
import promiseMiddlerware from "redux-promise";
import logger from "redux-logger";
import ReduxThunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const enhancedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  enhancedReducer,
  composeWithDevTools(
    applyMiddleware(promiseMiddlerware, ReduxThunk.withExtraArgument(), logger)
  )
);
