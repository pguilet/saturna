//Rendering layer control (React router content)
import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'; 
import {connect} from 'react-redux';
import * as actions from '../actions';

import Home from "./front/Home";
import Dashboard from "./front/Dashboard";
import GuardedRoute from "./GuardedRoute";
import Login from "./agentInterface/Login";
import AgentInterface from './agentInterface/AgentInterface';


class App extends Component{
    componentDidMount(){
        this.props.fetchUser();
    }
    
   render(){
     return (
       <BrowserRouter>        
           <Route exact path="/" component={Home} />
           <Route exact path="/about" component={Home} />
           <Route exact path="/login" component={Login} />
           <GuardedRoute exact path="/surveys" component={Dashboard} />
           <Route exact path="/contact" component={Home} />
           <Route exact path="/services" component={Home} />
           <GuardedRoute exact path="/agentInterface" component={AgentInterface}/>        
       </BrowserRouter>
     );
   }
};

export default connect(null,actions) (App);