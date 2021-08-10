import { Route, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Roles } from '../actions/types';

class GuardedRoute extends Component {
     renderContent(props) {
          let Component = this.props.component;
          //auth is either null when not initialized, false when initialized but user is not identified and is true when identified.
          if (
               (!this.props.auth && this.props.auth !== null) ||
               (this.props.auth &&
                    this.props.role === Roles.ADMIN &&
                    this.props.auth.role !== this.props.role)
          ) {
               return <Redirect to="/login" />;
          } else if (this.props.auth) {
               return <Component {...props} />;
          }
          return '';
     }
     render() {
          return (
               <Route
                    exact={this.props.exact}
                    path={this.props.path}
                    render={(props) => this.renderContent(props)}
               />
          );
     }
}
function mapStateToProps(props) {
     return props;
}
export default connect(mapStateToProps, actions)(GuardedRoute);
