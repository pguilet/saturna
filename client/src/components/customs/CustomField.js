//Rendering layer control (React router content)
import '../../css/index.css';
import _ from 'lodash';
// import 'materialize-css/dist/css/materialize.min.css';//we have to precise extension when not importing js files
import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect, ReactReduxContext } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field } from 'redux-form';
import axios from 'axios';

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
                         <option key={value} value={value}>
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

     getTag(type, label, disabled, input) {
          if (type === 'textarea') {
               return (
                    <textarea
                         {...input}
                         id={label}
                         disabled={disabled}
                         value={this.state.valueToSet}
                         onChange={(e) =>
                              this.setState({ valueToSet: e.target.value })
                         }
                         name={label}
                    ></textarea>
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
                                             const newValues=this.state.valuesToSet.filter(
                                                  (item) => item !== imageKey
                                             )
                                             this.setState({
                                                  deletedImages:
                                                       this.state.deletedImages.concat(
                                                            imageKey
                                                       ),
                                                  valuesToSet:newValues,
                                             });
                                          
                                             this.props.statetriggeredvaluesupdatefunction(
                                                  newValues
                                             );
                                        }}
                                        className="overlay selectable red-text"
                                   >
                                        <i className="material-icons">delete</i>
                                   </span>
                              </div>
                         );
                    }
               });
               return [
                    <br key={2} />,
                    result,<input  key={7}  type="button" className="teal btn-flat white-text" value="Sélectionner" onClick={()=>document.getElementById(label).click()} />,
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
                    <select name={label} id={label} className="browser-default">
                         {this.renderFirstOption(
                              this.state.valueToSet,
                              this.state.valuesToSet
                         )}
                         {this.renderOtherOptions(
                              this.state.valueToSet,
                              this.state.valuesToSet
                         )}
                    </select>
               );
          } else {
               return (
                    <input
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
                    <label>{this.props.label}</label>
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
