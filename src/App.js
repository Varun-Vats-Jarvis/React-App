//import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
//import { useState } from 'react';
import NavBar from './components/NavBar';
import Recipe from './components/Recipe';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'


const App = ()=> {
  
  const apiKey = process.env.REACT_APP_RECIPE_API
  const [progress, setProgress] = useState(0)
 
    return (
      
      <div>
        <Router>
        <NavBar/>
        <LoadingBar
            color='#f11946'
            progress={progress}
            
          />
        <Routes>
        <Route path='/React-App' element={<Recipe  key='indian' setProgress={setProgress} apiKey={apiKey} cuisine='indian'number = {20} />}></Route>
        <Route path='/mexican' element={<Recipe  key='mexican' setProgress={setProgress} apiKey={apiKey} cuisine='mexican' number = {20}/>}></Route>
        <Route path='/chinese' element={<Recipe  key='chinese' setProgress={setProgress} apiKey={apiKey} cuisine='chinese' number = {20} />}></Route>
        <Route path='/italian' element={<Recipe  key='italian' setProgress={setProgress} apiKey={apiKey} cuisine='italian'number = {20} />}></Route>
        <Route path='/greek' element={<Recipe   key='greek' setProgress={setProgress} apiKey={apiKey} cuisine='greek' number = {20}/>}></Route>

        </Routes>
        </Router>
     </div>
      
      
    )
  
}



export default App

