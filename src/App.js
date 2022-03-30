import './App.css';
import { Switch, Route } from "react-router-dom";
import ReactGA from 'react-ga';
import React, {useEffect} from 'react'


// Import Pages
import Template from "./Pages/Template";
import Landing from "./Pages/Landing";
import Login from "./Pages/login";
import Signup from "./Pages/signup";
import Homepage from "./Pages/Homepage";

function App() {
  localStorage.setItem("bannerPath", JSON.stringify("/banner/i0qRtPl9Tndifhi2wr5RCWZA7xh2"));
  useEffect(() => {
    ReactGA.initialize('G-D1HNY218WB');
    ReactGA.pageview(window.location.pathname + window.location.search)
    },[]);
  
    
  return (
    <Template>
      <Switch>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/Homepage:uid" children = {<Homepage />}>
        </Route>
      </Switch>
    </Template>
  );
}

export default App;
