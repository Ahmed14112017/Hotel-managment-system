import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App, { theme } from "./App.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";

// import { Authcontextprovider } from "./contextApi/Logindata.tsx";
import { store } from "./Store.ts";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <Authcontextprovider> */}
      <Provider store={store}>
        <App />
      </Provider>
      {/* </Authcontextprovider> */}
    </ThemeProvider>
  </StrictMode>
);
