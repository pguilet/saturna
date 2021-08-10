//Rendering layer control (React router content)
import '../../css/index.css';
import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'; 
import {connect} from 'react-redux';
import * as actions from '../../actions';
import InterfaceHeader from "./InterfaceHeader";
import AgentsHome from "./AgentsHome";
import AgentsList from "./AgentsList";
import GuardedRoute from "../GuardedRoute";
import HomeAdsList from './HomeAdsList';


class AgentInterface extends Component{
    

   render(){
     return (
       <BrowserRouter>
           <InterfaceHeader />

        <div className="container">
           <GuardedRoute exact path="/agentsHome" component={AgentsHome} />
           <GuardedRoute exact path="/agentsList" component={AgentsList} />
           <GuardedRoute exact path="/homeAdsList" component={HomeAdsList} />
         </div>
       </BrowserRouter>
     );
   }
};

export default connect(null,actions)(AgentInterface);