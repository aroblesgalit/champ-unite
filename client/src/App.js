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
import API from "./utils/API";
import OtherUserProfile from './pages/OtherUserProfile';
import Battle from "./pages/Battle";
import Ranking from "./pages/Ranking";
import CreateChampion from "./pages/CreateChampion";
import Credits from "./pages/Credits";
import { UserProvider } from './utils/UserContext';

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
    <UserProvider>
      <Router>
        <div>
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
            <Route path="/battle/:userid/vs/:otheruserid">
              <Battle />
            </Route>
            <Route path="/ranking">
              <Ranking />
            </Route>
            <Route path="/create_champion">
              <CreateChampion />
            </Route>
            <Route path="/credits">
              <Credits />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
