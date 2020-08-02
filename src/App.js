import React, { useEffect, useState } from 'react'
import md5 from 'md5';
import axios from 'axios';
import Navbar from './lib/header/Navbar';
import Footer from './lib/footer/Footer';
import Card from './lib/search-res/Card';
import { BrowserRouter , Switch, Route } from "react-router-dom";
import './App.scss';

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

      <BrowserRouter>
        <header className="App-header">
          <Navbar/>
        </header>
        <Switch>
          <Route path="/about">
            About 
          </Route>
          <Route path="/users">
              {carRes.map(val =>  
              <div>
                <p>{val.name} </p>
                {/* <p> id ; {val.id}</p> */}
                {/* <p> Description: {val.description} </p> */}
                {/* <p> resourceURI: {val.resourceURI} </p> */}
                {/* <p> modified : {val.modified} </p> */}
              </div>
          )}
          </Route>
          <Route path="/">
            <div className="search-body container">
              <div class="search-container">
                <input type="search" name="search" onChange={srchVal} />
                <div class="search"></div>
              </div>
              <div className="search--resualts"> 
                    {searchRes.map(
                      val => <div key={val.id} className="card--res" >  
                        <Card 
                        name={val.name} 
                        urls={val.urls} 
                        thumbnail={val.thumbnail.path} 
                        thumbnailExt={val.thumbnail.extension} 
                        description={val.description.substring(1, 100) + "..."} 
                        modified={val.modified} />
                      </div>
                      )
                    }
              </div>
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
