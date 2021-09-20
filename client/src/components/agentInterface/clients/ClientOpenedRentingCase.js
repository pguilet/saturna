//Rendering layer control (React router content)
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { withRouter } from 'react-router-dom';
import ClientRentingCase from './ClientRentingCase';

class ClientOpenedRentingCase extends Component {
     componentDidMount() {
          if (!this.props.rentingCase) {
               this.props.fetchRentingCase(
                    this.props.match.params.clientId,
                    this.props.match.params.caseId
               );
          }
          this.props.clearFlashMessage();
     }
     render() {
          return (
               <ClientRentingCase
                    deleteAction={this.props.deleteOpenedRentingCase}
                    editAction={this.props.editRentingCase}
               />
          );
     }
}

function mapStateToProps(props) {
     return props;
}
export default connect(
     mapStateToProps,
     actions
)(withRouter(ClientOpenedRentingCase));
