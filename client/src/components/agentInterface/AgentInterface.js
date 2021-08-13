//Rendering layer control (React router content)
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
import Nav from 'react-bootstrap/Nav';
import ClientCases from './ClientCases';
class AgentInterface extends Component {
     render() {
          return (
               <BrowserRouter>
                    <InterfaceHeader />

                    <main id="agentInterface" className="container-fluid">
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
                              path="/client/:clientId/profile"
                              component={Client}
                         />
                         <GuardedRoute
                              exact
                              path="/client/:clientId/openCases"
                              component={Client}
                         />
                         <GuardedRoute
                              exact
                              path="/client/:clientId/closedCases"
                              component={Client}
                         />
                    </main>
               </BrowserRouter>
          );
     }
}

export default connect(null, actions)(AgentInterface);
