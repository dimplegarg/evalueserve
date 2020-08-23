import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './assets/css/element.css';
import Home from "./component/Home";
import UserList from "./component/UserList";
import Game from "./component/Game";

class App extends Component {
  render() {
    return (
      <Router> 
	  	  <Switch>
	  			<Route path="/" exact component={Home} />
          <Route path="/user-list" component={UserList} /> 
          <Route path="/tic-tac-toe" component={Game} /> 
		    </Switch>
	    </Router>
    );
  }
}

export default App;
