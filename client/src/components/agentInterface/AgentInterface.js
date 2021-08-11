//Rendering layer control (React router content)
import '../../css/index.css';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import InterfaceHeader from './InterfaceHeader';
import AgentsHome from './AgentsHome';
import AgentsList from './AgentsList';
import GuardedRoute from '../GuardedRoute';
import HomeAdsList from './HomeAdsList';
import Clients from './Clients';
import Client from './Client';
import Search from './Search';
import { Roles } from '../../actions/types';

class AgentInterface extends Component {
     render() {
          return (
               <BrowserRouter>
                    <InterfaceHeader />

                    <main className="container">
                         <GuardedRoute
                              exact
                              path="/agentsHome"
                              component={AgentsHome}
                         />
                         <GuardedRoute
                              exact
                              path="/agentsList"
                              component={AgentsList}
                              role={Roles.ADMIN}
                         />
                         <GuardedRoute
                              exact
                              path="/homeAdsList"
                              component={HomeAdsList}
                         />
                         <GuardedRoute
                              exact
                              path="/clients"
                              component={Clients}
                         />
                         <GuardedRoute
                              exact
                              path="/search"
                              component={Search}
                         />
                         <GuardedRoute
                              exact
                              path="/client/:clientId"
                              component={Client}
                         />
                    </main>
               </BrowserRouter>
          );
     }
}

export default connect(null, actions)(AgentInterface);
