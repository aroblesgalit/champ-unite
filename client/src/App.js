import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
