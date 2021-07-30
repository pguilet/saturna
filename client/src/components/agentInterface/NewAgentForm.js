// SurveyForm shows a form for the user to add inputs.
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import CustomField from '../customs/CustomField';
// import SurveyField from "./SurveyField";
// import validateEmails from '../../../utils/validateEmails';
// import formFields from './formFields';

class NewAgentForm extends Component {
     render() {
          return (
               <Dialog
                    open={this.props.doOpen}
                    aria-labelledby="form-dialog-title"
               >
                    <DialogTitle id="form-dialog-title">
                         Création d'utilisateur
                    </DialogTitle>
                    <DialogContent>
                         <DialogContentText>
                              Veuillez rentrer le nom d'utilisateur et le mot de
                              passe d'un agent pour que celui-ci puisse accéder
                              à l'interface dédiée.
                         </DialogContentText>{' '}
                         <form>
                              <Field
                                   key="Username"
                                   label="Username"
                                   type="text"
                                   name="Username"
                                   component={CustomField}
                              />
                              <Field
                                   key="Password"
                                   label="Password"
                                   type="text"
                                   name="Password"
                                   component={CustomField}
                              />
                         </form>
                    </DialogContent>
                    <DialogActions>
                         <button
                              className="yellow darken-3 white-text btn-flat"
                              onClick={this.props.onTheClose}
                         >
                              Back
                              <i className="material-icons right">cancel</i>
                         </button>
                         <button
                              className="green right btn-flat white-text"
                              onClick={() => {this.props.createUser(this.props.form);this.props.onTheClose();}}
                         >
                              Créer l'utilisateur
                              <i className="material-icons right">done</i>
                         </button>
                    </DialogActions>
               </Dialog>
          );
     }
}

function mapStateToProps(props) {
     return props;
}
NewAgentForm = connect(mapStateToProps, actions)(NewAgentForm);
export default reduxForm({
     destroyOnUnmount: false,
     form: 'newAgentForm',
})(NewAgentForm);

// export default connect (null,{fetchPage}) (Contact);
//     export default function NewAgentForm({onTheClose, doOpen}) {
//         const [open, setOpen] = React.useState(true);

//         const handleClickOpen = () => {
//           setOpen(true);
//         };

//         const handleClose = () => {
//             console.log('handle close');
//             console.log(this.state);
//           setOpen(false);
//         };

//         return (

//             console.log(onTheClose),
//           <div>
//             <Dialog open={doOpen} onClose={onTheClose} aria-labelledby="form-dialog-title">
//               <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
//               <DialogContent>
//                 <DialogContentText>
//                   To subscribe to this website, please enter your email address here. We will send updates
//                   occasionally.
//                 </DialogContentText>
//                 <TextField
//                   autoFocus
//                   margin="dense"
//                   id="name"
//                   label="Email Address"
//                   type="email"
//                   fullWidth
//                 />
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={handleClose} color="primary">
//                   Cancel
//                 </Button>
//                 <Button onClick={handleClose} color="primary">
//                   Subscribe
//                 </Button>
//               </DialogActions>
//             </Dialog>
//           </div>
//         );
//       }
