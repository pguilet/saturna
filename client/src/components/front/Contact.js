import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ContactMap from './ContactMap';

class Contact extends Component {
     state = { open: false, sendingMessage: null };
     constructor(props) {
          super(props);
          this.handleClose = this.handleClose.bind(this);
     }

     render(status) {
          return <h1>{status}</h1>;
     }
     handleClickOpen = () => {
          this.setState({ open: true });
     };
     com;
     handleClose = () => {
          this.setState({ open: false });
     };
     handleSubmit = async (event) => {
          event.preventDefault();

          const data = new FormData(event.currentTarget);
          const values = Object.fromEntries(data.entries());
          let res = await axios.post('/api/sendMailToOwner', values);
          if (res.data.sent) {
               this.setState({ sendingMessage: 'Message bien envoyé' });
          } else {
               this.setState({
                    sendingMessage:
                         "Un problème à eu lieu lors de l'envoi, veuillez réessayer plus tard. Nous sommes désolé de la gêne occasionnée.",
               });
          }
          this.handleClickOpen();
     };
     render() {
          return (
               <div className="contact">
                    <div className="section-container">
                         <h1>CONTACTEZ-NOUS</h1>
                    </div>
                    <div className="contact-container">
                         <form
                              className="front-contact-form"
                              onSubmit={this.handleSubmit}
                              method="post"
                         >
                              <div className="front-inputs">
                                   <input
                                        type="text"
                                        placeholder="Prénom"
                                        className="front-input-md"
                                        name="firstName"
                                        required
                                   ></input>
                                   <div>*</div>
                              </div>
                              <div className="front-inputs">
                                   <input
                                        type="text"
                                        placeholder="Nom"
                                        className="front-input-md"
                                        required
                                        name="lastName"
                                   ></input>
                                   <div>*</div>
                              </div>
                              <div className="front-inputs">
                                   <input
                                        type="text"
                                        placeholder="Email"
                                        className="front-input-ld"
                                        required
                                        name="email"
                                   ></input>
                                   <div>*</div>
                              </div>
                              <div className="front-inputs">
                                   <input
                                        type="text"
                                        placeholder="Téléphone"
                                        className="front-input-ld"
                                        name="phone"
                                   ></input>
                                   <div>&nbsp;&nbsp;</div>
                              </div>
                              <div className="front-inputs">
                                   <textarea
                                        type="text"
                                        placeholder="Message"
                                        className="front-input-ld"
                                        required
                                        name="message"
                                   ></textarea>
                                   <div>*</div>
                              </div>
                              <div className="front-inputs">
                                   <input type="submit" value="Envoyer"></input>
                              </div>
                              <div id="map">
                                   <ContactMap />
                              </div>

                              <Dialog
                                   open={this.state.open}
                                   onClose={this.handleClose}
                                   aria-labelledby="alert-dialog-title"
                                   aria-describedby="alert-dialog-description"
                              >
                                   <DialogTitle id="alert-dialog-title">
                                        {'Envoi du mail'}
                                   </DialogTitle>
                                   <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                             {this.state.sendingMessage}
                                        </DialogContentText>
                                   </DialogContent>
                                   <DialogActions>
                                        <Button
                                             onClick={this.handleClose}
                                             autoFocus
                                        >
                                             Fermer
                                        </Button>
                                   </DialogActions>
                              </Dialog>
                         </form>
                    </div>
               </div>
          );
     }
}
export default connect(null, null)(Contact);
