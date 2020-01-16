import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {
  BrowserRouter ,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
require('dotenv').config()
// this is the URL for the 1st TEst :D 
// https://gateway.marvel.com:443/v1/public/characters?apikey=aee1cc960ea813e46f5af91d0e2c09b3
const srh = `https://gateway.marvel.com:443/v1/public/characters?apikey=${process.env.REACT_APP_PUB_API_KEY}`



function App() {



  useEffect( () => {
    axios.get(srh).then(crh => {
      console.log(crh)


    });
    } , [])


  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/about">
            About 
          </Route>
          <Route path="/users">
            Users 
          </Route>
          <Route path="/">
            Home
               s
              
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
