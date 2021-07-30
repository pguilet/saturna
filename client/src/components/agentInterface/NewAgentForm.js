// SurveyForm shows a form for the user to add inputs.
import _ from 'lodash';
import React,{Component} from "react";
import { reduxForm, Field} from 'redux-form';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import SurveyField from "./SurveyField";
// import validateEmails from '../../../utils/validateEmails';
// import formFields from './formFields';



class NewAgentForm extends Component{
    // renderFields(){
    //     return _.map(formFields,({label, name})=>{
    //         return (
    //             <Field 
    //                 key={name}  
    //                 label={label}
    //                   type="text" 
    //                   name={name} 
    //                   component={SurveyField} />
    //         );
    //     });
    // }
     constructor(props) {
        super(props);
        this.state = {
            open: 0
        };
      }

     handleClickOpen = () => {
      this.state.open=true;
    };
  
     handleClose = () => {
        this.state.open=false;
    };
    render(){
        return(
            <div>
      <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={ this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
        );
    }
}

function validate(values){
    const errors={};


    // _.each(formFields,({name})=>{
    //     if(!values[name]){
    //         errors[name]='You must provide a value'
    //     }
    // });

    
    // errors.recipients=validateEmails(values.recipients|| '');
    
    return errors;
}

export default reduxForm({
    validate,
    destroyOnUnmount:false,
    form:'agentForm'
})(NewAgentForm);