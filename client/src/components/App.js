import { Component } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Home from './front/Home';
import Login from './agentInterface/Login';
import AgentInterface from './agentInterface/AgentInterface';
import ClientOpenCases from './agentInterface/clients/ClientOpenCases';
import ClientClosedCases from './agentInterface/clients/ClientClosedCases';
import ClientProfile from './agentInterface/clients/ClientProfile';
import ClientOpenCase from './agentInterface/clients/ClientOpenCase';
import ClientClosedCase from './agentInterface/clients/ClientClosedCase';
import RentingReceipts from './agentInterface/clients/RentingReceipts';
import ClientOpenedRentingCases from './agentInterface/clients/ClientOpenedRentingCases';
import ClientClosedRentingCases from './agentInterface/clients/ClientClosedRentingCases';
import ClientOpenedRentingCase from './agentInterface/clients/ClientOpenedRentingCase';
import ClientClosedRentingCase from './agentInterface/clients/ClientClosedRentingCase';
import AgentsHome from './agentInterface/AgentsHome';
import AgentsList from './agentInterface/AgentsList';
import HomeAdsList from './agentInterface/HomeAdsList';
import Clients from './agentInterface/clients/Clients';
import Client from './agentInterface/clients/Client';
import Search from './agentInterface/Search';
import { Roles } from '../actions/types';
import Notaries from './agentInterface/Notaries';
import Syndics from './agentInterface/Syndics';
import MailsSender from './agentInterface/MailsSender';
import Landing from './front/Landing';
import About from './front/About';
import Contact from './front/Contact';
import Services from './front/Services';
import * as Sentry from '@sentry/react';

function RequireAuth(props) {
     let isNotAuthenticated =
          (!props.auth && props.auth !== null) ||
          (props.auth &&
               props.role === Roles.ADMIN &&
               props.auth.role !== props.role);
     return isNotAuthenticated ? <Navigate to="/login" /> : props.children;
}
class App extends Component {
     componentDidMount() {
          this.props.fetchUser();
     }

     render() {
          return (
               this.props.auth !== undefined && (
                    <BrowserRouter>
                         <Routes>
                              <Route path="/login" element={<Login />} />
                              <Route path="/*" element={<Home />}>
                                   <Route path="" element={<Landing />} />
                                   <Route path="about" element={<About />} />

                                   <Route
                                        path="contact"
                                        element={<Contact />}
                                   />
                                   <Route
                                        path="services"
                                        element={<Services />}
                                   />
                              </Route>

                              <Route
                                   path="/agentInterface/*"
                                   element={
                                        <RequireAuth auth={this.props.auth}>
                                             <AgentInterface />
                                        </RequireAuth>
                                   }
                              >
                                   <Route path="client/*" element={<Client />}>
                                        <Route
                                             path=":clientId/closedRentingCases/:caseId/rentingReceipts"
                                             element={<RentingReceipts />}
                                        />

                                        <Route
                                             path=":clientId/openedRentingCases/:caseId/rentingReceipts"
                                             element={<RentingReceipts />}
                                        />
                                        <Route
                                             path=":clientId/profile"
                                             element={<ClientProfile />}
                                        />
                                        <Route
                                             path=":clientId/closedRentingCases/:caseId"
                                             element={
                                                  <ClientClosedRentingCase />
                                             }
                                        />
                                        <Route
                                             path=":clientId/openedRentingCases/:caseId"
                                             element={
                                                  <ClientOpenedRentingCase />
                                             }
                                        />
                                        <Route
                                             path=":clientId/closedCases/:caseId"
                                             element={<ClientClosedCase />}
                                        />
                                        <Route
                                             path=":clientId/closedRentingCases"
                                             element={
                                                  <ClientClosedRentingCases />
                                             }
                                        />
                                        <Route
                                             path=":clientId/openedRentingCases"
                                             element={
                                                  <ClientOpenedRentingCases />
                                             }
                                        />
                                        <Route
                                             path=":clientId/closedCases"
                                             element={<ClientClosedCases />}
                                        />
                                        <Route
                                             path=":clientId/openCases/:caseId"
                                             element={<ClientOpenCase />}
                                        />
                                        <Route
                                             path=":clientId/openCases"
                                             element={<ClientOpenCases />}
                                        />
                                   </Route>
                                   <Route
                                        path="clients"
                                        element={<Clients />}
                                   />
                                   <Route path="search" element={<Search />} />
                                   <Route
                                        path="homeAdsList"
                                        element={
                                             <RequireAuth
                                                  auth={this.props.auth}
                                                  role={Roles.ADMIN}
                                             >
                                                  <HomeAdsList />{' '}
                                             </RequireAuth>
                                        }
                                   />

                                   <Route
                                        path="agentsList"
                                        element={<AgentsList />}
                                   />

                                   <Route
                                        path="syndics"
                                        element={<Syndics />}
                                   />
                                   <Route
                                        path="notaries"
                                        element={<Notaries />}
                                   />
                                   <Route
                                        path="mailsSender"
                                        element={<MailsSender />}
                                   />
                                   <Route
                                        path="agentsHome"
                                        element={<AgentsHome />}
                                   />
                              </Route>
                         </Routes>
                    </BrowserRouter>
               )
          );
     }
}
const mapStateToProps = (state) => ({
     auth: state.auth,
});
export default connect(mapStateToProps, actions)(Sentry.withProfiler(App));
