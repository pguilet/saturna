import { Route, Redirect } from "react-router-dom";
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

class GuardedRoute extends Component{
    renderContent(props){
        // console.log('fuckkk');
        let Component=this.props.component;
        if( this.props.auth===false){
            return (<Redirect to='/login' />);
        }else if(this.props.auth!=undefined){
            return (<Component {...props} />);
        }
        return null;
    }
   render(){ 
        return (
            <Route exact={this.props.exact} path={this.props.path} render={
                (props) =>(
                    this.renderContent(props)
                 )
            } />
        );
   }
};
function mapStateToProps({auth}){
    return {auth};
  }
  export default connect(mapStateToProps,actions) (GuardedRoute);