import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile";
import ChampionsSearch from "./pages/ChampionsSearch";
import UsersSearch from "./pages/UsersSearch";
import OtherUserProfile from './pages/OtherUserProfile';
import Battle from "./pages/Battle";
import Ranking from "./pages/Ranking";
import CreateChampion from "./pages/CreateChampion";
import Credits from "./pages/Credits";
import ChampSelectModal from "./components/ChampSelectModal";
import { UserProvider, UserConsumer } from "./utils/UserContext";
import { UsersProvider } from "./utils/UsersContext";

function App() {
  return (
    <UserProvider>
      <UsersProvider>
        <Router>
          <div>
            <ChampSelectModal />
            <UserConsumer>
              {
                value => {
                  return value.battleMode ? "" : <Header />
                }
              }
            </UserConsumer>
            <Switch>
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route path="/login">
                <UserConsumer>
                  {
                    value => {
                      return value.loggedIn ? <Redirect to="/profile" /> : <Login />
                    }

                  }
                </UserConsumer>
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route exact path="/profile">
                <UserConsumer>
                  {
                    value => {
                      return value.loggedIn ? <UserProfile /> : <Redirect to="/login" />
                    }
                  }
                </UserConsumer>
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
                <UserConsumer>
                  {
                    value => {
                      return value.loggedIn ? <Battle /> : <Redirect to="/login" />
                    }
                  }
                </UserConsumer>
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
            <UserConsumer>
              {
                value => {
                  return value.battleMode ? "" : <Footer />
                }
              }
            </UserConsumer>
          </div>
        </Router>
      </UsersProvider>
    </UserProvider>
  );
}

export default App;
