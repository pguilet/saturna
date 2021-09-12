//Rendering layer control (React router content)
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { withRouter } from 'react-router-dom';
import ClientCase from './ClientCase';

class ClientClosedCase extends Component {
     componentDidMount() {
          if (!this.props.theCase) {
               this.props.fetchCase(
                    this.props.match.params.clientId,
                    this.props.match.params.caseId
               );
          }
          this.props.clearFlashMessage();
     }
     render() {
          return (
               <ClientCase
                    deleteAction={this.props.deleteClosedPropertyCase}
                    editAction={this.props.editCase}
               />
          );
     }
}

function mapStateToProps(props) {
     return props;
}
export default connect(mapStateToProps, actions)(withRouter(ClientClosedCase));
