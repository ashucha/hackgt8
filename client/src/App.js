import "./App.css";

// Libraries
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import AppPage from "./pages/AppPage";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/app" component={AppPage} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
