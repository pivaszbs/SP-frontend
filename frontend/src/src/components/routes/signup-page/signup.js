import React, { Component } from 'react';
import './signup.css';
import FormField from '../../ui/formfield/formfield';
import { validate } from '../../ui/misc';
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import RestService from '../../../services/rest-service';
import { withStyles } from '@material-ui/core';

const styles = {
   root: {
      color: "white"
   }
}

class SignUp extends Component {

   state = {
      personId: '',
      formType: 'Registration',
      formError: false,
      formSuccess: '',
      defaultImg: '',
      isRegistered: false,
      formdata: {
         name: {
            element: 'input',
            value: '',
            config: {
               label: 'Your first name',
               name: 'name',
               type: 'text'
            },
            validation: {
               required: true
            },
            valid: false,
            validationMessage: '',
            showLabel: true
         },
         email: {
            element: 'input',
            value: '',
            config: {
               label: 'Your email',
               name: 'email',
               type: 'text'
            },
            validation: {
               required: false,
               email: true
            },
            valid: false,
            validationMessage: '',
            showLabel: true
         },
         username: {
            element: 'input',
            value: '',
            config: {
               label: 'Your username',
               name: 'username',
               type: 'text'
            },
            validation: {
               required: true
            },
            valid: false,
            validationMessage: '',
            showLabel: true
         },
         password: {
            element: 'input',
            value: '',
            config: {
               label: 'Your password',
               name: 'password',
               type: 'password'
            },
            validation: {
               required: false
            },
            valid: false,
            validationMessage: '',
            showLabel: true
         },
         anotherPassword: {
            element: 'input',
            value: '',
            config: {
               label: 'The same password',
               name: 'anotherPassword',
               type: 'password'
            },
            validation: {
               required: false
            },
            valid: false,
            validationMessage: '',
            showLabel: true
         }
      }
   }

   updateForm(element, content = '') {
      const newFormdata = { ...this.state.formdata }
      const newElement = { ...newFormdata[element.id] }

      if (content === '') {
         newElement.value = element.event.target.value;
      } else {
         newElement.value = content
      }

      let validData = validate(newElement)
      newElement.valid = validData[0];
      newElement.validationMessage = validData[1];
      if (newElement.config.name === "anotherPassword") {
         if (newElement.value !== this.state.formdata.password.value) {
            newElement.validationMessage = "Passwords are not the same";
            newElement.valid = false;
         } else {
            newElement.valid = true;
         }
      }
      if (!newElement.valid) {
         newElement.style = {
            border: "2px solid #F44336",
            borderLeft: "none",
            borderRight: "none",
            borderTop: "none",
            transition: "2s"
         }
      } else {
         newElement.style = {};
      }
      newFormdata[element.id] = newElement;
      this.setState({
         formError: false,
         formdata: newFormdata
      })
   }


   successForm = (message) => {
      this.setState({
         formSuccess: message
      });
      setTimeout(() => {
         this.setState({
            formSuccess: ''
         });
      }, 2000)

   }

   submitForm(event) {
      event.preventDefault();
      let restService = new RestService();
      let dataToSubmit = {};
      let formIsValid = true;

      for (let key in this.state.formdata) {
         dataToSubmit[key] = this.state.formdata[key].value;
         formIsValid = this.state.formdata[key].valid && formIsValid;
      }

      if (formIsValid) {
         restService.register(dataToSubmit)
            .then(res => {
               if (res.status === 201) {
                  return res;
               } else {
                  throw new Error("Server say that your data is bad");
               }
            })
            .then(() => {
               this.setState({ isRegistered: true })
            })
            .catch(error => {
               this.setState({
                  formError: true
               })
            })
      }
   }


   render() {
      const { classes } = this.props;
      let { formdata } = this.state;
      const forms = Object.keys(this.state.formdata).map((key) => (
         <FormField
            key={formdata[key].config.name}
            style={formdata[key].style}
            id={formdata[key].config.name}
            formdata={formdata[key]}
            change={(element) => this.updateForm(element)}
         >
         </FormField>
      ));

      if (this.state.isRegistered) {
         return (
            <Redirect to="/" />
         )
      }
      return (
         <div className="container">
            <div className="sign-in-wrapper">
               <h2 style={{color:"white"}}>
                  {this.state.formType}
               </h2>
               <div>
                  <form onSubmit={(event) => this.submitForm(event)}>
                     {forms}
                     <div className="success_label">{this.state.formSuccess}</div>
                     {this.state.formError ?
                        <div className="error_label">
                           Something is wrong
                               </div>
                        : ''
                     }
                     <div className="admin_submit">

                        <Button classes={{ root: classes.root }} onClick={(event) => this.submitForm(event)}>
                           {this.state.formType}
                        </Button>

                     </div>
                  </form>

               </div>
            </div>
         </div>
      );
   }
}


export default withStyles(styles)(SignUp);