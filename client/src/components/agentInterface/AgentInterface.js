//Rendering layer control (React router content)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import InterfaceHeader from './InterfaceHeader';
import AgentsHome from './AgentsHome';
import AgentsList from './AgentsList';
import GuardedRoute from '../GuardedRoute';
import HomeAdsList from './HomeAdsList';
import Clients from './clients/Clients';
import Client from './clients/Client';
import Search from './Search';
import { Roles } from '../../actions/types';
import Notaries from './Notaries';
import Syndics from './Syndics';
class AgentInterface extends Component {
     render() {
          return (
               <>
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
                              path="/notaries"
                              component={Notaries}
                         />
                         <GuardedRoute
                              exact
                              path="/syndics"
                              component={Syndics}
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
                         <GuardedRoute
                              exact
                              path="/client/:clientId/openCases/:caseId"
                              component={Client}
                         />
                         <GuardedRoute
                              exact
                              path="/client/:clientId/closedCases/:caseId"
                              component={Client}
                         />
                    </main>
               </>
          );
     }
}

export default connect(null, actions)(AgentInterface);
