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


class CustomField extends Component{
    state={};

    constructor(props) {
        super(props);
}
 
   render(){
        return( <div></div>);
   }
};


function mapStateToProps(props){
    return props;
}
export default connect(mapStateToProps, actions)(CustomField);
