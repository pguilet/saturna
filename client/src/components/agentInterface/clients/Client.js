import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import Nav from 'react-bootstrap/Nav';
import { Link, Outlet } from 'react-router-dom';
import { withRouter } from '../../../utils/routing';

class Client extends Component {
     state = {};
     componentDidMount() {
          //case where we come directly from url
          if (!this.props.client) {
               this.props.fetchClient(this.props.params.clientId);
          }
          let lastSegment = this.props.location.pathname.split('/')[3];
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
               case 'openedRentingCases':
                    this.setState({ activeTab: 'openedRentingCases' });
                    break;
               case 'closedRentingCases':
                    this.setState({ activeTab: 'closedRentingCases' });
                    break;
               default:
                    break;
          }
     }

     getClassNames(pageName) {
          var className = '';
          if (this.props.location.pathname.includes(pageName)) {
               className = className + ' active';
          }
          return className;
     }
     renderSideBar() {
          return (
               <Nav className="flex-column">
                    <Link
                         to={
                              '/agentInterface/client/' +
                              this.props.client._id +
                              '/profile'
                         }
                         className={this.getClassNames('profile')}
                         onClick={() => (this.activeTab = 'profile')}
                    >
                         Profile
                    </Link>
                    <Link
                         to={
                              '/agentInterface/client/' +
                              this.props.client._id +
                              '/openCases'
                         }
                         className={this.getClassNames('openCases')}
                         onClick={() =>
                              this.props.fetchOpenCases(this.props.client._id)
                         }
                    >
                         Dossier en cours
                    </Link>
                    <Link
                         to={
                              '/agentInterface/client/' +
                              this.props.client._id +
                              '/closedCases'
                         }
                         className={this.getClassNames('closedCases')}
                         onClick={() =>
                              this.props.fetchClosedCases(this.props.client._id)
                         }
                    >
                         Dossiers cloturés
                    </Link>
                    <Link
                         to={
                              '/agentInterface/client/' +
                              this.props.client._id +
                              '/openedRentingCases'
                         }
                         className={this.getClassNames('openedRentingCases')}
                         onClick={() =>
                              this.props.fetchOpenedRentingCases(
                                   this.props.client._id
                              )
                         }
                    >
                         Gestion locative en cours
                    </Link>
                    <Link
                         to={
                              '/agentInterface/client/' +
                              this.props.client._id +
                              '/closedRentingCases'
                         }
                         className={this.getClassNames('closedRentingCases')}
                         onClick={() =>
                              this.props.fetchClosedRentingCases(
                                   this.props.client._id
                              )
                         }
                    >
                         Gestion locative cloturées
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
                                   <Outlet />
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
