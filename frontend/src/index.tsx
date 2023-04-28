import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import React from "react";
import { createRoot } from "react-dom/client";
import { persistStore } from "redux-persist";
import reportWebVitals from "./reportWebVitals";
import { store } from "./_store/store";

const persistor = persistStore(store);
const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <App />
    </PersistGate>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
