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


function App() {
  // Building the Vars for the url 
  const urlVars = `ts=${TimeVal}&apikey=${process.env.REACT_APP_PUB_API_KEY}&hash=${hash}`
  let [hulk , setHulk] = useState('test');
  
  
  
  let [carRes , setCarRes] = useState([])
  let [searchRes , setSearchRes] = useState([])
  
  // the URL
  const allcharacters = `https://gateway.marvel.com/v1/public/characters?orderBy=name&limit=100&${urlVars}`;
  const chrSrch = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${hulk}&${urlVars}`;
  // calling the request 
  useEffect( () => {
    axios.get(allcharacters).then(characters => {
      setCarRes(characters.data.data.results);
    });
    } , [])

  // calling the request 
  useEffect( () => {
    axios.get(chrSrch).then(chrRes => {
      setSearchRes(chrRes.data.data.results);
      console.log(chrRes)
    });
    } , [hulk])

    
    const srchVal = (a) => {
       console.log(a.target.value)  
       setHulk(a.target.value)  
    }
    
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
              <Link to="/about">Users</Link>
            </li>
            <li>
              <Link to="/users">all characters</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/about">
            About 
          </Route>
          <Route path="/users">
              {carRes.map(val =>  
              <div>
                <p> name : {val.name} </p>
                <p> id ; {val.id}</p>
                {/* <p> modified : {val.modified} </p> */}
              </div>
          
          )}
          </Route>
          <Route path="/">
          Search 
          <input type="search" name="search" onChange={srchVal} />


          <div> , 
                {searchRes.map(

                  val => <div key={val.id}> {} res 
                <p> Name : {val.name}</p> 
                <p> Description: {val.description.substring(1, 110) + "..."} </p>
                <p> modified : {val.modified} </p>
                    <div> 
                      {val.urls.map(
                        ur => 
                          <p> 
                            <a href={ur.url} target="_blank"> {ur.type} </a> 
                          </p>
                      )}
                    </div>
                  </div>
                  )
                }

          </div>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
