import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Roles } from '../../actions/types.js';
class InterfaceHeader extends Component {
  renderAgentList() {
    if (this.props.auth !== null && this.props.auth.role === Roles.ADMIN) {
      return (
        <li className="nav-item">
          <Link
            to="/agentsList"
            className={
              this.props.pageSelected === 'agentsList'
                ? 'nav-link active'
                : 'nav-link'
            }
          >
            Liste des agents
          </Link>
        </li>
      );
    }
  }
  renderHomeAdsList() {
    if (this.props.auth !== null && (this.props.auth.role === Roles.ADMIN||this.props.auth.role === Roles.AGENT)) {
      return (
        <li className="nav-item">
          <Link
            to="/homeAdsList"
            className={
              this.props.pageSelected === 'homeAdsList'
                ? 'nav-link active'
                : 'nav-link'
            }
          >
            Annonces immobilières
          </Link>
        </li>
      );
    }
  }

  renderLogoutLink() {
    if (this.props.auth) {
      return (
        <li className="nav-item">
          <a href="/api/logout" className="nav-link">
            Logout
          </a>
        </li>
      );
    }
  }
  render() {
    return (
      <div id="header-background">
        <div className="container">
          <h1 className="brand" onClick={() => (window.location.href = '/')}>
            {' '}
            La Pierre Nantaise: Agent Interface
          </h1>
          <p className="brand-description">
            Agence immobilière créée par un petit beurre et pour tous le monde.
            Béni par le dieu Pierre Guilet.
          </p>

          <ul className="nav nav-fill">
            <li className="nav-item">
              <Link
                to="/agentsHome"
                className={
                  this.props.pageSelected === 'agentsHome'
                    ? 'nav-link active'
                    : 'nav-link'
                }
              >
                Accueil
              </Link>
            </li>
            {this.renderAgentList()}
            {this.renderHomeAdsList()}
            {this.renderLogoutLink()}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, pageSelected, history }) {
  return { auth, pageSelected, history };
}
export default connect(mapStateToProps)(InterfaceHeader);
