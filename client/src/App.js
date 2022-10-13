import { Route } from "react-router-dom";
import "./App.css";
import AccountPage from "./pages/AccountPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="app">
      <Route exact path="/" component={HomePage} />
      <Route path="/account" component={AccountPage} />
    </div>
  );
}

export default App;
