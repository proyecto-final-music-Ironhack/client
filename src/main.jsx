import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextWrapper } from "./context/auth.context.jsx";
import { ChakraProvider } from "@chakra-ui/react";
// import '@fontsource/kanit'
import theme from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthContextWrapper>
    <Router>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Router>
  </AuthContextWrapper>
);
