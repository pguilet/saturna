import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import ClientCase from './ClientCase';
import { withRouter } from '../../../utils/routing';

class ClientOpenCase extends Component {
     componentDidMount() {
          if (!this.props.propertyCase) {
               this.props.fetchCase(
                    this.props.params.clientId,
                    this.props.params.caseId
               );
          }
          this.props.clearFlashMessage();
     }
     render() {
          return (
               <ClientCase
                    deleteAction={this.props.deleteOpenedPropertyCase}
                    editAction={this.props.editCase}
               />
          );
     }
}

function mapStateToProps(props) {
     return props;
}
export default connect(mapStateToProps, actions)(withRouter(ClientOpenCase));
