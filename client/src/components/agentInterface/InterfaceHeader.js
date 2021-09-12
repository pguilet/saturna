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
import { withRouter } from 'react-router-dom';

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
                              <Link to="/homeAdsList" className="dropdown-item">
                                   Annonces immobilières
                              </Link>
                         )}
                         {isAdmin && (
                              <Link to="/agentsList" className="dropdown-item">
                                   Liste des agents
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
          if (this.props.pageSelected === pageName) {
               className = className + ' active';
          }
          return className;
     }
     render() {
          return (
               <Navbar bg="light" expand="lg" fixed="top">
                    <Container>
                         <Navbar.Brand href="/">
                              La Pierre Nantaise
                         </Navbar.Brand>
                         <Navbar.Toggle aria-controls="basic-navbar-nav" />
                         <Navbar.Collapse id="basic-navbar-nav">
                              <Nav className="me-auto">
                                   <Link
                                        to="/agentsHome"
                                        className={this.getClassNames(
                                             'dashboard'
                                        )}
                                   >
                                        Dashboard
                                   </Link>

                                   {this.props.auth && (
                                        <>
                                             <Link
                                                  to="/clients"
                                                  className={this.getClassNames(
                                                       'clients'
                                                  )}
                                             >
                                                  Clients
                                             </Link>
                                             <Link
                                                  to="/notaries"
                                                  className={this.getClassNames(
                                                       'notaries'
                                                  )}
                                             >
                                                  Notaires
                                             </Link>
                                             <Link
                                                  to="/syndics"
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
