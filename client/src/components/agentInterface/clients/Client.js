//Rendering layer control (React router content)
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import Nav from 'react-bootstrap/Nav';
import { Link, withRouter } from 'react-router-dom';
import GuardedRoute from '../../GuardedRoute';
import ClientOpenCases from './ClientOpenCases';
import ClientClosedCases from './ClientClosedCases';
import ClientProfile from './ClientProfile';
import ClientOpenCase from './ClientOpenCase';
import ClientClosedCase from './ClientClosedCase';

class Client extends Component {
     state = {};
     componentDidMount() {
          //cas where we come directly from url
          if (!this.props.client) {
               this.props.fetchClient(this.props.match.params.clientId);
          }
          let lastSegment = this.props.match.path.split('/')[3];
          switch (lastSegment) {
               case 'profile':
                    this.setState({ activeTab: 'profile' });
                    break;
               case 'openCases':
                    this.setState({ activeTab: 'openCases' });
                    break;
               case 'closedCases':
                    this.setState({ activeTab: 'closedCases' });
                    break;
               default:
                    break;
          }
          this.props.fetchPage('');
     }

     renderSideBar() {
          return (
               <Nav className="flex-column">
                    <Link
                         to={'/client/' + this.props.client._id + '/profile'}
                         className={
                              this.state.activeTab === 'profile' ? 'active' : ''
                         }
                         onClick={() => (this.activeTab = 'profile')}
                    >
                         Profile
                    </Link>
                    <Link
                         to={'/client/' + this.props.client._id + '/openCases'}
                         className={
                              this.state.activeTab === 'openCases'
                                   ? 'active'
                                   : ''
                         }
                         onClick={() =>
                              this.props.fetchOpenCases(this.props.client._id)
                         }
                    >
                         Dossier en cours
                    </Link>
                    <Link
                         to={
                              '/client/' +
                              this.props.client._id +
                              '/closedCases'
                         }
                         className={
                              this.state.activeTab === 'closedCases'
                                   ? 'active'
                                   : ''
                         }
                         onClick={() =>
                              this.props.fetchClosedCases(this.props.client._id)
                         }
                    >
                         Dossiers cloturés
                    </Link>
                    <Link
                         to={'/client/' + this.props.client._id}
                         className={
                              this.state.activeTab === 'location'
                                   ? 'active'
                                   : ''
                         }
                         // onClick={() => (this.activeTab = 'location')}
                    >
                         Gestion locative
                    </Link>
               </Nav>
          );
     }

     render() {
          return (
               this.props.client && (
                    <>
                         <div className="row">
                              <div className="col-2">
                                   {this.renderSideBar()}
                              </div>
                              <div className="col-10">
                                   <GuardedRoute
                                        exact
                                        path="/client/:clientId/openCases"
                                        component={ClientOpenCases}
                                   />
                                   <GuardedRoute
                                        exact
                                        path="/client/:clientId/openCases/:caseId"
                                        component={ClientOpenCase}
                                   />
                                   <GuardedRoute
                                        exact
                                        path="/client/:clientId/closedCases"
                                        component={ClientClosedCases}
                                   />
                                   <GuardedRoute
                                        exact
                                        path="/client/:clientId/closedCases/:caseId"
                                        component={ClientClosedCase}
                                   />
                                   <GuardedRoute
                                        exact
                                        path="/client/:clientId/profile"
                                        component={ClientProfile}
                                   />
                              </div>
                         </div>
                    </>
               )
          );
     }
}

function mapStateToProps(props) {
     return props;
}
Client = connect(mapStateToProps, actions)(Client);
export default withRouter(Client);
