//Rendering layer control (React router content)
import React, { Component } from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';

import InterfaceHeader from './InterfaceHeader';
import CustomField from '../customs/CustomField';
import Button from 'react-bootstrap/Button';

class ClientCases extends Component {
     componentDidMount() {
          this.clientId = this.props.match.params;
          if (!this.props.client) {
               //cas where we come directly from url
               this.props.fetchClient(this.clientId);
          }
     }
     renderContent() {
          return 'toto';
     }
     render() {
          return this.renderContent();
     }
}

function mapStateToProps(props) {
     return props;
}
ClientCases = connect(mapStateToProps, actions)(ClientCases);
export default reduxForm({
     destroyOnUnmount: false,
     form: 'loginForm',
})(withRouter(ClientCases));
