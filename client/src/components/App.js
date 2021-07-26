//Rendering layer control (React router content)
import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'; 
import {connect} from 'react-redux';
import * as actions from '../actions';

import Front from "./front/Front";
import AgentInterface from './agentInterface/AgentInterface';


class App extends Component{
    componentDidMount(){
        this.props.fetchUser();
    }
    
   render(){
     return (
       <BrowserRouter>        
           <Route exact path="/" component={Front} />
           <Route exact path="/back" component={AgentInterface} />        
       </BrowserRouter>
     );
   }
};

export default connect(null,actions) (App);