import React, { useEffect, useState } from 'react'
import md5 from 'md5';
import axios from 'axios';
import {
  BrowserRouter ,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

// this is to call the environment vars
require('dotenv').config()

// salting 
let TimeVal = new Date().getDate();
// hashing
let hash = md5(TimeVal+process.env.REACT_APP_PRI_API_KEY+process.env.REACT_APP_PUB_API_KEY)
// creating the url 
const srh = `https://gateway.marvel.com/v1/public/characters?ts=${TimeVal}&apikey=${process.env.REACT_APP_PUB_API_KEY}&hash=${hash}`



function App() {

  let [searchRes , setSearchRes] = useState([])



// calling the request 
  useEffect( () => {
    axios.get(srh).then(characters => {
      setSearchRes(characters.data.data.results);
    
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
              {console.log(searchRes)}
          
          
              {searchRes.map(val =>  
              <div>
                <p> name : {val.name} </p>
                <p> id ; {val.id}</p>
                <p> Description: {val.description} </p>
                <p> resourceURI: {val.resourceURI} </p>
                <p> modified : {val.modified} </p>
              </div>
          
              )}
          
          
          
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
