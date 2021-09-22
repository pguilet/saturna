import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { withRouter } from 'react-router-dom';

import ClientRentingCases from './ClientRentingCases';

class ClientClosedRentingCases extends Component {
     componentDidMount() {
          if (!this.props.rentingCases) {
               this.props.fetchClosedRentingCases(this.props.client._id);
          }
     }

     render() {
          return (
               <ClientRentingCases
                    addAction={this.props.createRentingCase}
                    deleteAction={this.props.deleteClosedRentingCaseFromList}
                    noCreateButton={true}
                    isClosedCase={true}
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
)(withRouter(ClientClosedRentingCases));
