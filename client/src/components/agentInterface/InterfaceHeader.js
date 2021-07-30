import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {Roles} from '../../actions/types.js';
class InterfaceHeader extends Component {
    renderAgentList() {
    if (this.props.auth!==null && this.props.auth.role === Roles.ADMIN) {
      return (
        <li class="nav-item">
          <a href="/agentsList" className="nav-link">
            Agents list
          </a>
        </li>
      );
    }

  }

  renderLogoutLink() {
    if (this.props.auth) {
      return (
        <li class="nav-item">
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
          <h1 className="brand"> La Pierre Nantaise: Agent Interface</h1>
          <p className="brand-description">
            Agence immobilière créée par un petit beurre et pour tous le monde.
            Béni par le dieu Pierre Guilet.
          </p>

          <ul class="nav nav-fill">
            <li class="nav-item">
              <a href="/" className="nav-link">
                Accueil
              </a>
            </li>
            {this.renderAgentList()}
            {this.renderLogoutLink()}
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

function mapStateToProps({ auth, pageSelected, history }) {
  return { auth, pageSelected, history };
}
export default connect(mapStateToProps)(InterfaceHeader);
