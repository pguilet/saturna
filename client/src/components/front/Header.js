import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
     renderContent() {
          switch (this.props.auth) {
               case null:
                    return; //we don't want to see any button while loading the page to avoid flashes.
               case false:
                    return (
                         <li>
                              <a href="/auth/google">Login with google</a>
                         </li>
                    );
               default:
                    return [
                         <li key="3" style={{ margin: '0 10px' }}>
                              Credits: {this.props.auth.credits}
                         </li>,
                         <li key="2">
                              <a href="/api/logout">Logout</a>
                         </li>,
                    ];
          }
     }
     render() {
          return (
               <div id="header-background">
                    <div className="container">
                         <h1 className="brand"> La Pierre Nantaise</h1>
                         <p className="brand-description">
                              Agence immobilière créée par un petit beurre et
                              pour tous le monde. Béni par le dieu Pierre
                              Guilet.
                         </p>

                         <ul class="nav nav-fill">
                              <li class="nav-item">
                                   <Link
                                        to="/"
                                        className={
                                             this.props.pageSelected ===
                                             'landing'
                                                  ? 'nav-link active'
                                                  : 'nav-link'
                                        }
                                   >
                                        Accueil
                                   </Link>
                              </li>
                              <li class="nav-item">
                                   <Link
                                        to="/about"
                                        className={
                                             this.props.pageSelected === 'about'
                                                  ? 'nav-link active'
                                                  : 'nav-link'
                                        }
                                   >
                                        À Propos
                                   </Link>
                              </li>
                              <li class="nav-item">
                                   <Link
                                        to="/services"
                                        className={
                                             this.props.pageSelected ===
                                             'services'
                                                  ? 'nav-link active'
                                                  : 'nav-link'
                                        }
                                   >
                                        Services
                                   </Link>
                              </li>
                              <li class="nav-item">
                                   <Link
                                        to="/contact"
                                        className={
                                             this.props.pageSelected ===
                                             'contact'
                                                  ? 'nav-link active'
                                                  : 'nav-link'
                                        }
                                   >
                                        Nous Contacter
                                   </Link>
                              </li>
                         </ul>

                         {/* <nav>
                        <div className="nav-wrapper">
                            <Link 
                            className="left brand-logo" 
                            to={this.props.auth?'/surveys':'/'}
                            >
                                Emaily
                            </Link>    
                            <ul className="right">
                                {this.renderContent()}
                            
                            </ul>
                        </div>             

                    </nav> */}
                    </div>
               </div>
          );
     }
}

function mapStateToProps({ auth, pageSelected }) {
     return { auth, pageSelected };
}
export default connect(mapStateToProps)(Header);
