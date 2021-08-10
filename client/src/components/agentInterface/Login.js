//Rendering layer control (React router content)
import '../../css/index.css';
import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom'; 
import {connect} from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field} from 'redux-form';
import {withRouter} from 'react-router-dom';

import InterfaceHeader from "./InterfaceHeader";
import SurveyField from "../customs/CustomField";


class Login extends Component{
    state={};

    constructor(props) {
        super(props);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
      }
 
    handleUsernameChange(e) {
        this.setState({username: e.target.value});
     }
     handlePasswordChange(e){
        this.setState({password: e.target.value});
     } 

     renderContent(){
        if(this.props.auth===null||!this.props.auth.username){
            return (
              <BrowserRouter>
                <InterfaceHeader />
                <form
                  className="container"
                  onSubmit={this.props.handleSubmit(()=>this.props.login(this.props.history,this.props.form.loginForm.values))}
                            >
                  <Field
                    key="username"
                    label="Username"
                    type="text"
                    name="username"
                    component={SurveyField}
                    onChange={this.handleUsernameChange}
                  />
                  <Field
                    key="password"
                    label="Password"
                    type="password"
                    name="password"
                    component={SurveyField}
                    onChange={this.handlePasswordChange}
                  />
                  
                  <div className="red-text" style={{ marginBottom: '20px' }}>
                      {this.props.flash?this.props.flash.message:''}
                  </div>
                  <button
                    className="teal btn-flat right white-text"
                    type="submit"
                  >
                    Log-in
                    <i className="material-icons right">done</i>
                  </button>
                </form>
                {/* <div className="container">
                  <Route exact path="/" component={Landing} />
                  <Route exact path="/surveys" component={Dashboard} />
                  <Route path="/surveys/new" component={SurveyNew} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/contact" component={Contact} />
                  <Route exact path="/services" component={Services} />
                </div> */}
              </BrowserRouter>
            );
        }else{
            return (<Redirect to='/agentsHome' />);
        }
     }
   render(){
        return(  this.renderContent());
   }
};


function mapStateToProps(props){
    return props;
}
Login = connect(
    mapStateToProps,actions
  )(Login)
export default reduxForm({
    
    destroyOnUnmount:false,
    form:'loginForm'
})(withRouter(Login));