import React, { Component } from 'react';
import './login.css';
import FormField from '../../ui/formfield/formfield';
import { validate } from '../../ui/misc';
import { Button } from '@material-ui/core';
import RestService from '../../../services/rest-service';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

const styles = {
    root: {
        color: "white"
    }
}

class Login extends Component {

    state = {
        personId: '',
        formType: 'Login',
        formError: false,
        formSuccess: '',
        defaultImg: '',
        formdata: {
            username: {
                element: 'input',
                value: '',
                config: {
                    label: 'Username',
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
                    label: 'Password',
                    name: 'password',
                    type: 'password'
                },
                validation: {
                    required: true
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
        if (!validData[0]) {
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
    let formIsValid = true;

    if (formIsValid) {
        let restSerivice = new RestService();
        restSerivice.logIn(this.state.formdata.username.value,
            this.state.formdata.password.value)
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    throw new Error("Omagad, login is bad")
                }
            })
            .then(res => {
                this.props.onLogin(res.token);
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
                style={formdata[key].style}
                key={formdata[key].config.name}
                id={formdata[key].config.name}
                formdata={formdata[key]}
                change={(element) => this.updateForm(element)}
            />
        ));
        if (this.props.isLoggedIn) {
            return (
                <Redirect to="/" />
            )
        }
        return (
            <div className="container">
                <div className="sign-in-wrapper">
                    <h2 style={{ color: "white" }}>
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

export default withStyles(styles)(Login);