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
class InterfaceHeader extends Component {
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
                                   <Link to="/agentsHome" className="nav-link">
                                        Dashboard
                                   </Link>
                                   <Link to="/agentsHome" className="nav-link">
                                        Clients
                                   </Link>
                              </Nav>

                              <Form className="d-flex">
                                   <FormControl
                                        type="search"
                                        placeholder="Search"
                                        className="mr-2"
                                        aria-label="Search"
                                   />
                                   <Button variant="outline-success">
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

function mapStateToProps({ auth, pageSelected, history }) {
     return { auth, pageSelected, history };
}
export default connect(mapStateToProps)(InterfaceHeader);
