import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from '../../utils/routing';

class Header extends Component {
     getClassNames(pageName) {
          var className = 'nav-link';
          if (
               this.props.location.pathname &&
               this.props.location.pathname === pageName
          ) {
               className = className + ' active';
          }
          return className;
     }

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
                              Eu sint ipsum velit pariatur quis exercitation
                              aliqua cupidatat ullamco aute anim ullamco. Fugiat
                              consequat adipisicing mollit officia eiusmod aute
                              Lorem. Sit quis aute eu consectetur. Duis est duis
                              exercitation ut ipsum deserunt amet eu officia in
                              qui incididunt. Eu cupidatat sint nostrud et
                              eiusmod sunt deserunt nisi. Esse consequat amet
                              est aliqua. Irure aliquip elit aliqua voluptate
                              adipisicing.
                         </p>

                         <ul className="nav nav-fill">
                              <li className="nav-item">
                                   <Link
                                        to="/"
                                        className={this.getClassNames('/')}
                                   >
                                        Accueil
                                   </Link>
                              </li>
                              <li className="nav-item">
                                   <Link
                                        to="/about"
                                        className={this.getClassNames('/about')}
                                   >
                                        À Propos
                                   </Link>
                              </li>
                              <li className="nav-item">
                                   <Link
                                        to="/services"
                                        className={this.getClassNames(
                                             '/services'
                                        )}
                                   >
                                        Services
                                   </Link>
                              </li>
                              <li className="nav-item">
                                   <Link
                                        to="/contact"
                                        className={this.getClassNames(
                                             '/contact'
                                        )}
                                   >
                                        Nous Contacter
                                   </Link>
                              </li>
                         </ul>

                         <div id="hiddenLinkToLogin">
                              <Link to="/login">Login</Link>
                         </div>
                    </div>
               </div>
          );
     }
}

function mapStateToProps({ auth, pageSelected }) {
     return { auth, pageSelected };
}
export default connect(mapStateToProps)(withRouter(Header));
