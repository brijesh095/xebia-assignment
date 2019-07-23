import React from 'react';
import logo from './logo.svg';
import Login from './components/login'
import Search from './components/search'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {

  
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/' component={Login} exact></Route>
          <Route path='/search' component={Search}  ></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
