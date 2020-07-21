import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import ImageModal from "./components/ImageModal";
import ChampionCardAlerts from "./components/ChampionCardAlerts";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { UserProvider, UserConsumer } from "./utils/UserContext";
import { UsersProvider } from "./utils/UsersContext";
import { ChampionsProvider } from "./utils/ChampionsContext";

function App() {
  return (
    <UserProvider>
      <UsersProvider>
        <ChampionsProvider>
          <Router>
            <div>
              <ChampSelectModal />
              <ImageModal />
              <ChampionCardAlerts />
              <Header />
              <Switch>
                <Route exact path="/">
                  <Homepage />
                </Route>
                <Route path="/login">
                  <PublicRoute component={Login} />
                </Route>
                <Route path="/signup">
                  <Signup />
                </Route>
                <Route exact path="/profile">
                  <ProtectedRoute component={UserProfile} />
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
                  <ProtectedRoute component={Battle} />
                </Route>
                <Route path="/ranking">
                  <Ranking />
                </Route>
                <Route path="/create_champion">
                  <ProtectedRoute component={CreateChampion} />
                </Route>
                <Route path="/credits">
                  <Credits />
                </Route>
              </Switch>
              <Footer />
            </div>
          </Router>
        </ChampionsProvider>
      </UsersProvider>
    </UserProvider>
  );
}

export default App;
