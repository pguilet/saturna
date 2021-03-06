import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { withRouter } from '../../../utils/routing';
import ClientCases from './ClientCases';

class ClientOpenCases extends Component {
     componentDidMount() {
          if (!this.props.propertyCases) {
               this.props.fetchOpenCases(this.props.client._id);
          }
     }

     render() {
          return (
               <ClientCases
                    addAction={this.props.createPropertyCase}
                    deleteAction={this.props.deleteOpenedPropertyCaseFromList}
                    isClosedCase={false}
               />
          );
     }
}

function mapStateToProps(props) {
     return props;
}
export default connect(mapStateToProps, actions)(withRouter(ClientOpenCases));
