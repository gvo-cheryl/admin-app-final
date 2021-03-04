import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store/store";
import { Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const history = createBrowserHistory();
const persistor = persistStore(store);

ReactDOM.render(
  // browserRouter 안에 route를 쓸수 있다.
  <BrowserRouter history={history}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Route path="/" component={AdminPage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
