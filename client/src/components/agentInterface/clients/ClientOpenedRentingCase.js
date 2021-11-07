import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { withRouter } from '../../../utils/routing';
import ClientRentingCase from './ClientRentingCase';

class ClientOpenedRentingCase extends Component {
     componentDidMount() {
          if (!this.props.rentingCase) {
               this.props.fetchRentingCase(
                    this.props.params.clientId,
                    this.props.params.caseId
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
