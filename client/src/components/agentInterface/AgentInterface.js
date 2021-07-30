//Rendering layer control (React router content)
import '../../css/index.css';
import 'materialize-css/dist/css/materialize.min.css';//we have to precise extension when not importing js files
import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'; 
import {connect} from 'react-redux';
import * as actions from '../../actions';

import InterfaceHeader from "./InterfaceHeader";
import AgentsHome from "./AgentsHome";
import AgentsList from "./AgentsList";
import GuardedRoute from "../GuardedRoute";


class AgentInterface extends Component{
    

   render(){
     return (
       <BrowserRouter>
           <InterfaceHeader />

        <div className="container">
           <GuardedRoute exact path="/agentsHome" component={AgentsHome} />
           <GuardedRoute exact path="/agentsList" component={AgentsList} />
         </div>
       </BrowserRouter>
     );
   }
};

export default connect(null,actions)(AgentInterface);