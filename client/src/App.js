import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile";
import ChampionsSearch from "./pages/ChampionsSearch";
import UsersSearch from "./pages/UsersSearch";
import UserContext from './utils/UserContext';
import API from "./utils/API";
import OtherUserProfile from './pages/OtherUserProfile';

function App() {

  const [user, setUser] = useState({});

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    console.log("getUserData() ran...")
    const { data } = await API.getUserData();
    console.log("Running getUserData() from App.js...", data);
    if (data) {
      setUser({
        loggedIn: true,
        id: data.id,
        username: data.username,
        rank: data.rank,
        wins: data.wins,
        losses: data.losses,
        champions: data.champions
      });
    } else {
      setUser({
        loggedIn: false,
        id: "",
        username: "",
        rank: 0,
        wins: 0,
        losses: 0,
        champions: []
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
            <Route exact path="/profile">
              <UserProfile />
            </Route>
            <Route path="/champions">
              <ChampionsSearch />
            </Route>
            <Route path="/users">
              <UsersSearch />
            </Route>
            <Route path="/profile/:username">
              <OtherUserProfile />
            </Route>
          </Switch>
          <Footer />
        </UserContext.Provider>
      </div>
    </Router>

  );
}

export default App;
