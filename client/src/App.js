import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile";
import ChampionsSearch from "./pages/ChampionsSearch";
import UserContext from './utils/UserContext';
import API from "./utils/API";

function App() {

  const [user, setUser] = useState({});

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    console.log("getUserData() ran...")
    const { data } = await API.getUserData();
    if (data) {
      setUser({
        loggedIn: true
      });
    } else {
      setUser({
        loggedIn: false
      });
    }
  }

  return (
    <Router>
      <div>
        <UserContext.Provider value={user} >
          <Header />
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/profile">
              <UserProfile />
            </Route>
            <Route path="/champions">
              <ChampionsSearch />
            </Route>
          </Switch>
          <Footer />
        </UserContext.Provider>
      </div>
    </Router>

  );
}

export default App;
