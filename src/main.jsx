import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextWrapper } from "./context/auth.context.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthContextWrapper>
    <Router>
      <App />
    </Router>
  </AuthContextWrapper>
);
