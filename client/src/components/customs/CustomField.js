//Rendering layer control (React router content)
import '../../css/index.css';
// import 'materialize-css/dist/css/materialize.min.css';//we have to precise extension when not importing js files
import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field } from 'redux-form';

class CustomField extends Component {
     state = { value: '' };

     componentDidMount() {
          this.setState({
               value: this.props.valuetoset?this.props.valuetoset:'',
          });
     }
     constructor(props) {
          super(props);
     }

     getTag(type, label, disabled,  input) {
          if (type === 'textarea') {
               return (
                    <textarea
                         {...input}
                         id={label}
                         disabled={disabled}
                         value={this.state.value}
                         onChange={(e) =>
                              this.setState({ value: e.target.value })
                         }
                         name={label}
                    ></textarea>
               );
          } else {
               return (
                    <input
                         id={label}
                         {...input}
                         type={type}
                         style={{ marginBottom: '5px' }}
                         disabled={disabled}
                         value={this.state.value}
                         onChange={(e) =>
                              this.setState({ value: e.target.value })
                         }
                    />
               );
          }
     }
     render() {
          return (
               <div>
                    {this.getTag(
                         this.props.type,
                         this.props.label,
                         this.props.disabled,
                         this.props.input
                    )}
                    <div className="red-text" style={{ marginBottom: '20px' }}>
                         {this.props.meta.touched && this.props.meta.error}
                    </div>
               </div>
          );
     }
}

function mapStateToProps(props) {
     return props;
}
export default connect(mapStateToProps, actions)(CustomField);
