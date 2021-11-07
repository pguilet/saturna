import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { withRouter } from '../../../utils/routing';

import ClientCases from './ClientCases';

class ClientClosedCases extends Component {
     componentDidMount() {
          if (!this.props.propertyCases) {
               this.props.fetchClosedCases(this.props.client._id);
          }
     }

     render() {
          return (
               <ClientCases
                    addAction={this.props.createPropertyCase}
                    deleteAction={this.props.deleteClosedPropertyCaseFromList}
                    noCreateButton={true}
                    isClosedCase={true}
               />
          );
     }
}

function mapStateToProps(props) {
     return props;
}
export default connect(mapStateToProps, actions)(withRouter(ClientClosedCases));
