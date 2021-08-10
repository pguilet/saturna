//Rendering layer control (React router content)
import '../../css/index.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Client extends Component {
     componentDidMount() {
          this.props.fetchClient(this.props.match.params);
     }

     render() {
          return (
               <div>
                    {this.props.client
                         ? this.props.client._id
                         : 'pas de client'}
                    <br />
                    {this.props.client
                         ? this.props.client.name
                         : 'pas de client'}
                    <br />
                    {this.props.client
                         ? this.props.client.surname
                         : 'pas de client'}
                    <br />
                    {this.props.client
                         ? this.props.client.birthday
                         : 'pas de client'}
               </div>
          );
     }
}
function mapStateToProps({ client, flash, auth }) {
     return { client, flash, auth };
}

export default connect(mapStateToProps, actions)(Client);
