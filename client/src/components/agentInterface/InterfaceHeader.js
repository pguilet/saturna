import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Roles } from '../../actions/types.js';
import * as actions from '../../actions';
import { withRouter } from '../../utils/routing';
import '../../css/agentInterface.scss';

class InterfaceHeader extends Component {
     constructor(props) {
          super(props);
          this.searchField = React.createRef();
     }

     renderUserConnectedDropDown() {
          if (this.props.auth) {
               const isAdmin = this.props.auth.role === Roles.ADMIN;
               const isAgent = this.props.auth.role === Roles.AGENT;
               return (
                    <NavDropdown
                         title={this.props.auth.username}
                         id="basic-nav-dropdown"
                    >
                         <NavDropdown.Item href="/api/logout">
                              Logout
                         </NavDropdown.Item>
                         {(isAgent || isAdmin) && (
                              <Link
                                   to="/agentInterface/homeAdsList"
                                   className="dropdown-item"
                              >
                                   Annonces immobilières
                              </Link>
                         )}
                         {isAdmin && (
                              <Link
                                   to="/agentInterface/agentsList"
                                   className="dropdown-item"
                              >
                                   Liste des agents
                              </Link>
                         )}
                         {isAdmin && (
                              <Link
                                   to="/agentInterface/mailsSender"
                                   className="dropdown-item"
                              >
                                   Envoi de mails
                              </Link>
                         )}
                    </NavDropdown>
               );
          }
     }

     handleSubmit = (event) => {
          event.preventDefault();
          this.props.search(this.searchField.current.value, this.props.history);
     };
     getClassNames(pageName) {
          var className = 'nav-link';
          if (this.props.location.pathname.includes(pageName)) {
               className = className + ' active';
          }
          return className;
     }
     render() {
          return (
               <Navbar bg="light" expand="lg" fixed="top">
                    <Container>
                         <Link to="/">
                              <img
                                   className="intranetLogo"
                                   src={require('../../images/saturnaLogo.jpg')}
                              />
                         </Link>

                         <Navbar.Toggle aria-controls="basic-navbar-nav" />
                         <Navbar.Collapse id="basic-navbar-nav">
                              <Nav className="me-auto">
                                   <Link
                                        to="/agentInterface/agentsHome"
                                        className={this.getClassNames(
                                             'agentsHome'
                                        )}
                                   >
                                        Dashboard
                                   </Link>

                                   {this.props.auth && (
                                        <>
                                             <Link
                                                  to="/agentInterface/clients"
                                                  className={this.getClassNames(
                                                       'client'
                                                  )}
                                             >
                                                  Clients
                                             </Link>
                                             <Link
                                                  to="/agentInterface/notaries"
                                                  className={this.getClassNames(
                                                       'notaries'
                                                  )}
                                             >
                                                  Notaires
                                             </Link>
                                             <Link
                                                  to="/agentInterface/syndics"
                                                  className={this.getClassNames(
                                                       'syndics'
                                                  )}
                                             >
                                                  Syndics
                                             </Link>
                                        </>
                                   )}
                              </Nav>

                              <Form
                                   className="d-flex"
                                   onSubmit={this.handleSubmit}
                              >
                                   <FormControl
                                        ref={this.searchField}
                                        type="search"
                                        placeholder="Search"
                                        className="mr-2"
                                        aria-label="Search"
                                   />
                                   <Button
                                        variant="outline-success"
                                        type="submit"
                                   >
                                        Search
                                   </Button>
                              </Form>
                              <Nav className="">
                                   {this.renderUserConnectedDropDown()}
                              </Nav>
                         </Navbar.Collapse>
                    </Container>
               </Navbar>
          );
     }
}

function mapStateToProps({ auth, pageSelected }) {
     return { auth, pageSelected };
}
export default connect(mapStateToProps, actions)(withRouter(InterfaceHeader));
