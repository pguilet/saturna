//Rendering layer control (React router content)
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TextField from '@material-ui/core/TextField';
import {
     getDownloadSignedLink,
     uploadImageFileLocally,
} from '../../utils/filesHandling.js';

class CustomField extends Component {
     state = {
          valueToSet: '',
          valuesToSet: [],
          imagesToShow: [],
          pdfValueToSet: '',
          deletedImages: [],
     };

     constructor(props) {
          super(props);
          this.onChange = this.onChange.bind(this);
     }

     componentDidMount() {
          this.setState({
               valueToSet:
                    this.props.valuetoset && this.props.type !== 'pdf'
                         ? this.props.valuetoset
                         : '',
               valuesToSet: this.props.valuestoset
                    ? this.props.valuestoset
                    : [],
               imagesToShow: this.props.valuestoset
                    ? this.props.valuestoset
                    : [],
               pdfValueToSet:
                    this.props.valuetoset && this.props.type === 'pdf'
                         ? this.props.valuetoset
                         : '',
               deletedImages: [],
          });
     }

     renderOtherOptions(valueToSet, selectvalues, objectIdToLabelRender) {
          if (!objectIdToLabelRender) {
               return _.map(selectvalues, (value) => {
                    return (
                         <option key={value} value={value}>
                              {value}
                         </option>
                    );
               });
          } else {
               return _.map(selectvalues, (value) => {
                    return (
                         <option key={value.objectId} value={value.objectId}>
                              {value.objectLabel}
                         </option>
                    );
               });
          }
     }

     onChange(e) {
          const {
               input: { onChange },
          } = this.props;
          onChange(e.target.files[0]);
     }

     getTag(type, label, disabled, input, id) {
          if (type === 'datePicker') {
               return (
                    <>
                         <br key={8} />
                         <TextField
                              id={id}
                              name={id}
                              {...input}
                              key={id}
                              value={this.state.valueToSet}
                              type="date"
                              InputLabelProps={{
                                   shrink: true,
                              }}
                              onChange={(e) => {
                                   this.setState({
                                        valueToSet: e.target.value,
                                   });
                                   this.props.statetriggeredvaluesupdatefunction(
                                        id,
                                        e.target.value
                                   );
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
                         id={id}
                         key={id}
                         disabled={disabled}
                         value={this.state.valueToSet}
                         onChange={(e) => {
                              this.setState({ valueToSet: e.target.value });
                              this.props.statetriggeredvaluesupdatefunction(
                                   id,
                                   e.target.value
                              );
                         }}
                         name={label}
                    ></Form.Control>
               );
          } else if (type === 'pdf') {
               var resultPdf = (
                    <input
                         key={id}
                         id={id}
                         label={label}
                         name={label}
                         type="file"
                         accept=".pdf"
                         style={{ display: 'none' }}
                         disabled={disabled}
                         value={this.state.valueToSet}
                         onChange={async (e) => {
                              this.setState({
                                   valueToSet: e.target.value,
                                   pdfValueToSet: e.target.value,
                              });
                              this.props.statetriggeredvaluesupdatefunction(
                                   'files',
                                   e.target.files[0]
                              );
                              this.props.statetriggeredvaluesupdatefunction(
                                   id,
                                   e.target.value
                                        .split('\\')
                                        .pop()
                                        .split('/')
                                        .pop()
                              );
                              this.onChange(e);
                         }}
                    />
               );
               return (
                    <>
                         <br key={1} />
                         {resultPdf}
                         <div
                              key={2}
                              className="inline-block margin-right-15px"
                         >
                              {this.state.pdfValueToSet
                                   .split('\\')
                                   .pop()
                                   .split('/')
                                   .pop()}
                         </div>

                         <Button
                              type="button"
                              key="pdfSelect"
                              className="teal btn-flat white-text margin-right-15px"
                              onClick={() =>
                                   document.getElementById(id).click()
                              }
                         >
                              Sélectionner
                         </Button>

                         <Button
                              type="button"
                              key="pdfDownload"
                              className="teal btn-flat white-text btn-success  margin-right-5px"
                              onClick={async () => {
                                   if (this.props.valuetoset) {
                                        const url = await getDownloadSignedLink(
                                             this.props.valuetoset
                                        );
                                        window.open(url);
                                   }
                              }}
                         >
                              <i key={3} className="material-icons">
                                   download
                              </i>
                         </Button>

                         <Button
                              type="button"
                              key="pdfDelete"
                              className="teal btn-flat white-text btn-danger  "
                              onClick={() => {
                                   this.setState({
                                        valueToSet: '',
                                        pdfValueToSet: '',
                                   });
                                   this.props.statetriggeredvaluesupdatefunction(
                                        id,
                                        ''
                                   );
                              }}
                         >
                              <i key={4} className="material-icons">
                                   delete
                              </i>
                         </Button>
                    </>
               );
          } else if (type === 'images') {
               var result = (
                    <input
                         key={id}
                         id={id}
                         label={label}
                         type="file"
                         style={{ display: 'none' }}
                         disabled={disabled}
                         value={this.state.valueToSet}
                         accept=".jpg, .png, .jpeg, .gif, .bmp, .tif*"
                         onChange={async (e) => {
                              const newFiles = _.filter(
                                   e.target.files,
                                   (file) =>
                                        !_.filter(
                                             this.state.imagesToShow,
                                             (imagePath) =>
                                                  imagePath
                                                       .split('\\')
                                                       .pop()
                                                       .split('/')
                                                       .pop() === file.name
                                        ).length > 0
                              );

                              const result = await uploadImageFileLocally(
                                   newFiles,
                                   this.props.modelParentId
                              );
                              const values = [
                                   ...new Set([
                                        ...result,
                                        ...this.state.imagesToShow,
                                   ]),
                              ]; //concatenante with no duplicate
                              this.setState({ imagesToShow: values });
                              this.props.statetriggeredvaluesupdatefunction(
                                   id,
                                   values
                              );
                         }}
                         multiple
                    />
               );

               var x = 0;
               const images = _.map(this.state.imagesToShow, (imageKey) => {
                    if (
                         !this.state.deletedImages.includes(imageKey) ||
                         imageKey.includes('upload')
                    ) {
                         return (
                              <div
                                   key={imageKey + x}
                                   className="img-container separated"
                              >
                                   <img
                                        key={imageKey}
                                        title={imageKey}
                                        className="thumbnail"
                                        src={'/api/images/' + imageKey}
                                        alt="thumbnail"
                                   />
                                   <span
                                        className="overlay"
                                        key={imageKey + x + x}
                                   >
                                        <div
                                             className="material-icons text-danger selectable"
                                             key={imageKey + x + x + x}
                                             onClick={() => {
                                                  const newValues =
                                                       this.state.imagesToShow.filter(
                                                            (item) =>
                                                                 item !==
                                                                 imageKey
                                                       );
                                                  this.setState({
                                                       deletedImages:
                                                            this.state.deletedImages.concat(
                                                                 imageKey
                                                            ),
                                                       imagesToShow: newValues,
                                                  });

                                                  this.props.statetriggeredvaluesupdatefunction(
                                                       id,
                                                       newValues
                                                  );
                                             }}
                                        >
                                             delete
                                        </div>
                                        <div
                                             key={20}
                                             className="material-icons selectable text-success"
                                             onClick={async () => {
                                                  if (
                                                       imageKey &&
                                                       !imageKey.includes(
                                                            'upload'
                                                       )
                                                  ) {
                                                       const url =
                                                            await getDownloadSignedLink(
                                                                 imageKey
                                                            );
                                                       window.open(url);
                                                  }
                                             }}
                                        >
                                             download
                                        </div>
                                   </span>
                              </div>
                         );
                    }
                    x++;
               });

               return [
                    <br key={5} />,
                    result,
                    <Button
                         type="button"
                         key="imageSelect"
                         className="teal btn-flat white-text"
                         onClick={() => document.getElementById(id).click()}
                    >
                         Sélectionner
                    </Button>,
                    <input
                         key="hiddenImage"
                         type="hidden"
                         id="images"
                         {...input}
                         value={this.state.imagesToShow}
                    />,
                    <br key={6} />,
                    images,
               ];
          } else if (type === 'selectWithDetailViewer') {
               return (
                    <>
                         <br key={7} />
                         <Form.Select
                              aria-label={label}
                              name={label}
                              id={id}
                              {...input}
                              key={id}
                              value={this.state.valueToSet}
                              className="margin-right-5px inline-block default-width"
                              onChange={async (e) => {
                                   this.props.statetriggeredvaluesupdatefunction(
                                        id,
                                        e.target.value
                                   );
                                   this.setState({
                                        valueToSet: e.target.value,
                                   });
                              }}
                         >
                              <option value=""></option>
                              {this.renderOtherOptions(
                                   this.state.valueToSet,
                                   this.state.valuesToSet,
                                   true
                              )}
                         </Form.Select>
                         <Button
                              type="button"
                              key="detailViewerButton"
                              className="teal btn-flat white-text"
                              onClick={() =>
                                   this.props.viewDetailAction(
                                        document.getElementById(id).options[
                                             document.getElementById(id)
                                                  .selectedIndex
                                        ].value
                                   )
                              }
                         >
                              ?
                         </Button>
                    </>
               );
          } else if (type === 'select') {
               return (
                    <Form.Select
                         aria-label={label}
                         name={label}
                         id={id}
                         {...input}
                         key={id}
                         value={this.state.valueToSet}
                         onChange={async (e) => {
                              this.props.statetriggeredvaluesupdatefunction(
                                   id,
                                   e.target.value
                              );
                              this.setState({
                                   valueToSet: e.target.value,
                              });
                         }}
                    >
                         <option value=""></option>
                         {this.renderOtherOptions(
                              this.state.valueToSet,
                              this.state.valuesToSet
                         )}
                    </Form.Select>
               );
          } else if (type === 'checkbox') {
               return (
                    <>
                         <Form.Check
                              inline
                              key={id}
                              id={id}
                              {...input}
                              type={type}
                              label={label}
                              checked={this.state.valueToSet}
                              onChange={async (e) => {
                                   this.setState({
                                        valueToSet: e.target.checked,
                                   });
                                   this.props.statetriggeredvaluesupdatefunction(
                                        id,
                                        e.target.checked
                                   );
                              }}
                         />
                         {this.props.br && <br key={9} />}
                    </>
               );
          } else {
               return (
                    <Form.Control
                         placeholder=""
                         id={id}
                         key={id}
                         {...input}
                         type={type}
                         disabled={disabled}
                         value={this.state.valueToSet}
                         onChange={async (e) => {
                              this.setState({ valueToSet: e.target.value });
                              if (
                                   this.props.statetriggeredvaluesupdatefunction
                              ) {
                                   this.props.statetriggeredvaluesupdatefunction(
                                        id,
                                        e.target.value
                                   );
                              }
                         }}
                         multiple
                    />
               );
          }
     }
     render() {
          return (
               <>
                    {this.props.type !== 'checkbox' && (
                         <Form.Label>{this.props.label}</Form.Label>
                    )}
                    {this.props.extralabel && (
                         <>
                              <Form.Label>{this.props.extralabel}</Form.Label>
                              <br key={10} />
                         </>
                    )}
                    {this.getTag(
                         this.props.type,
                         this.props.label,
                         this.props.disabled,
                         this.props.input,
                         this.props.id
                    )}
                    {this.props.type !== 'checkbox' && (
                         <div
                              className="text-danger"
                              style={{ marginBottom: '20px' }}
                         >
                              {this.props.meta.touched && this.props.meta.error}
                         </div>
                    )}
               </>
          );
     }
}

function mapStateToProps(props) {
     return props;
}
export default connect(mapStateToProps, actions)(CustomField);
