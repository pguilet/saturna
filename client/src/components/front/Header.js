import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from '../../utils/routing';
import '../../css/front.scss';

class Header extends Component {
     getClassNames(pageName) {
          var className = 'front-menu-link';
          if (
               this.props.location.pathname &&
               this.props.location.pathname === pageName
          ) {
               className = className + ' front-active-menu-item';
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
               <div className={this.props.className}>
                    <div className="front-menu-logo-container">
                         <img src={require('../../images/saturnaLogo.jpg')} />
                    </div>
                    <div className="front-menu">
                         <Link to="/" className={this.getClassNames('/')}>
                              Accueil
                         </Link>
                         <Link
                              to="/about"
                              className={this.getClassNames('/about')}
                         >
                              À Propos
                         </Link>
                         <Link
                              to="/services"
                              className={this.getClassNames('/services')}
                         >
                              Services
                         </Link>
                         <Link
                              to="/contact"
                              className={this.getClassNames('/contact')}
                         >
                              Nous Contacter
                         </Link>
                    </div>
                    <div id="hiddenLinkToLogin">
                         <Link to="/login">Login</Link>
                    </div>
               </div>
          );
     }
}

function mapStateToProps({ auth, pageSelected }) {
     return { auth, pageSelected };
}
export default connect(mapStateToProps)(withRouter(Header));
