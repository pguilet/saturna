//Rendering layer control (React router content)
import '../../css/index.css';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TextField from '@material-ui/core/TextField';

class CustomField extends Component {
     state = { valueToSet: '', valuesToSet: [] };

     componentDidMount() {
          this.setState({
               valueToSet: this.props.valuetoset ? this.props.valuetoset : '',
               valuesToSet: this.props.valuestoset
                    ? this.props.valuestoset
                    : [],
               deletedImages: [],
          });
     }

     renderFirstOption(valueToSet, selectvalues) {
          return _.map(selectvalues, (value) => {
               if (value === valueToSet) {
                    return (
                         <option key={value} value={value} defaultValue>
                              {value}
                         </option>
                    );
               }
          });
     }
     renderOtherOptions(valueToSet, selectvalues) {
          return _.map(selectvalues, (value) => {
               if (value !== valueToSet) {
                    return (
                         <option key={value} value={value}>
                              {value}
                         </option>
                    );
               }
          });
     }

     async uploadHomeAdImageLocally(files, identifiant) {
          let data = new FormData();
          if (files) {
               for (var x = 0; x < files.length; x++) {
                    data.append('file', files[x]);
               }
          }
          data.append('identifiant', identifiant);

          var res = await axios.post('/api/uploadHomeAdImageLocally', data, {
               headers: { 'Content-Type': 'multipart/form-data' },
          });
          return res.data;
     }

     getTag(type, label, disabled, input, id) {
          if (type === 'datePicker') {
               return (
                    <>
                         <br />
                         <TextField
                              id={id}
                              name={id}
                              {...input}
                              type="date"
                              InputLabelProps={{
                                   shrink: true,
                              }}
                         />
                    </>
               );
          } else if (type === 'textarea') {
               return (
                    <Form.Control
                         as="textarea"
                         rows={3}
                         {...input}
                         id={label}
                         disabled={disabled}
                         value={this.state.valueToSet}
                         onChange={(e) =>
                              this.setState({ valueToSet: e.target.value })
                         }
                         name={label}
                    ></Form.Control>
               );
          } else if (type === 'images') {
               var result = (
                    <input
                         key={0}
                         id={label}
                         label={label}
                         type="file"
                         style={{ display: 'none' }}
                         disabled={disabled}
                         value={this.state.valueToSet}
                         onChange={async (e) => {
                              const result =
                                   await this.uploadHomeAdImageLocally(
                                        e.target.files,
                                        this.props.identifiant
                                   );
                              const values = [
                                   ...new Set([
                                        ...result,
                                        ...this.state.valuesToSet,
                                   ]),
                              ]; //concatenante with no duplicate
                              this.setState({ valuesToSet: values });
                              this.props.statetriggeredvaluesupdatefunction(
                                   values
                              );
                         }}
                         multiple
                    />
               );
               const images = _.map(this.state.valuesToSet, (imageKey) => {
                    if (!this.state.deletedImages.includes(imageKey)) {
                         return (
                              <div
                                   key={imageKey}
                                   className="img-container separated"
                              >
                                   <img
                                        key={imageKey}
                                        title={imageKey}
                                        className="thumbnail"
                                        src={'/api/images/' + imageKey}
                                   />
                                   <span
                                        onClick={() => {
                                             const newValues =
                                                  this.state.valuesToSet.filter(
                                                       (item) =>
                                                            item !== imageKey
                                                  );
                                             this.setState({
                                                  deletedImages:
                                                       this.state.deletedImages.concat(
                                                            imageKey
                                                       ),
                                                  valuesToSet: newValues,
                                             });

                                             this.props.statetriggeredvaluesupdatefunction(
                                                  newValues
                                             );
                                        }}
                                        className="overlay selectable"
                                   >
                                        {' '}
                                        <span className="material-icons text-danger">
                                             delete
                                        </span>
                                   </span>
                              </div>
                         );
                    }
               });
               return [
                    <br key={2} />,
                    result,
                    <Button
                         type="button"
                         key={7}
                         type="button"
                         className="teal btn-flat white-text"
                         onClick={() => document.getElementById(label).click()}
                    >
                         Sélectionner
                    </Button>,
                    <input
                         key={1}
                         type="hidden"
                         id="images"
                         {...input}
                         value={this.state.valuesToSet}
                    />,
                    <br key={4} />,
                    images,
               ];
          } else if (type === 'select') {
               return (
                    <Form.Select
                         aria-label={label}
                         name={label}
                         id={label}
                         {...input}
                    >
                         {this.renderFirstOption(
                              this.state.valueToSet,
                              this.state.valuesToSet
                         )}
                         {this.renderOtherOptions(
                              this.state.valueToSet,
                              this.state.valuesToSet
                         )}
                    </Form.Select>
               );
          } else {
               return (
                    <Form.Control
                         type="text"
                         placeholder=""
                         id={label}
                         {...input}
                         type={type}
                         style={{ marginBottom: '5px' }}
                         disabled={disabled}
                         value={this.state.valueToSet}
                         onChange={async (e) => {
                              this.setState({ valueToSet: e.target.value });
                         }}
                         multiple
                    />
               );
          }
     }
     render() {
          return (
               <div>
                    <Form.Label>{this.props.label}</Form.Label>
                    {this.getTag(
                         this.props.type,
                         this.props.label,
                         this.props.disabled,
                         this.props.input,
                         this.props.id
                    )}
                    <div
                         className="text-danger"
                         style={{ marginBottom: '20px' }}
                    >
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
