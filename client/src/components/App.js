//Rendering layer control (React router content)
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Home from './front/Home';
import Dashboard from './front/Dashboard';
import GuardedRoute from './GuardedRoute';
import Login from './agentInterface/Login';
import AgentInterface from './agentInterface/AgentInterface';
import '../css/index.scss';
import * as Sentry from '@sentry/react';
class App extends Component {
     componentDidMount() {
          this.props.fetchUser();
     }

     render() {
          return (
               <BrowserRouter>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/about" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <GuardedRoute exact path="/surveys" component={Dashboard} />
                    <Route exact path="/contact" component={Home} />
                    <Route exact path="/services" component={Home} />
                    <GuardedRoute
                         exact
                         path="/agentsHome"
                         component={AgentInterface}
                    />
                    <GuardedRoute
                         exact
                         path="/notaries"
                         component={AgentInterface}
                    />
                    <GuardedRoute
                         exact
                         path="/syndics"
                         component={AgentInterface}
                    />
                    <GuardedRoute
                         exact
                         path="/agentsList"
                         component={AgentInterface}
                    />
                    <GuardedRoute
                         exact
                         path="/homeAdsList"
                         component={AgentInterface}
                    />
                    <GuardedRoute
                         exact
                         path="/clients"
                         component={AgentInterface}
                    />
                    <GuardedRoute
                         exact
                         path="/client/:clientId/profile"
                         component={AgentInterface}
                    />
                    <GuardedRoute
                         exact
                         path="/client/:clientId/openCases"
                         component={AgentInterface}
                    />
                    <GuardedRoute
                         exact
                         path="/client/:clientId/openCases/:caseId"
                         component={AgentInterface}
                    />
                    <GuardedRoute
                         exact
                         path="/client/:clientId/closedCases"
                         component={AgentInterface}
                    />
                    <GuardedRoute
                         exact
                         path="/client/:clientId/closedCases/:caseId"
                         component={AgentInterface}
                    />
                    <GuardedRoute
                         exact
                         path="/search"
                         component={AgentInterface}
                    />
               </BrowserRouter>
          );
     }
}

export default connect(null, actions)(Sentry.withProfiler(App));
