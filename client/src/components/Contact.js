import React,{Component} from "react";
import {connect} from "react-redux";
import { fetchPage } from '../actions';

class Contact extends Component{
    componentDidMount(){
        console.log(this.props);
        this.props.fetchPage("contact");
    }
   render(){ 
        return (
          <div style={{ textAlign: 'center' }}>
            <h1>Contact</h1>
            <p>
                3615 ULA    
            </p>    
          </div>
        );
   }
};
export default connect (null,{fetchPage}) (Contact);