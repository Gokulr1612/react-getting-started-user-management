import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import  UsersComponent  from './users';
import  AboutComponent  from './about';
import ContactComponent from './contact';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

export default class Home extends React.Component{
  render(){
    return (
      <div className='App'>
        <Router history={history}>
          <div className='routerclass'>
            
                <Link to={'/about'} className='about'>About</Link>
                <Link to={'/users'} className='users'>Users</Link>
                <Link to={'/contact'} className='contact'>Contact</Link>

                <Switch>
                <Route exact path={'/'} >
                <Redirect to="/about" />
                </Route>
                <Route path={'/about'} ><AboutComponent /></Route>
                <Route path={'/users'} ><UsersComponent /></Route>
                <Route path={'/contact'} ><ContactComponent /></Route>
                </Switch>
          </div>
        </Router>
      </div>
    );
  }
}