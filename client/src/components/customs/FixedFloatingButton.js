//Rendering layer control (React router content)
import React, { Component } from 'react';
import { connect } from 'react-redux';

class FixedFloatingButton extends Component {
     render() {
          return (
               <div className="fixed-button">
                    <div
                         className="button-floating"
                         onClick={this.props.onClick}
                    >
                         <i className="large material-icons">add</i>
                    </div>
               </div>
          );
     }
}

function mapStateToProps(props) {
     return props;
}
export default connect(mapStateToProps, null)(FixedFloatingButton);
