import React, { Component } from 'react';
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
class NewItemPage extends Component {

    state = {
        personId: '',
        formType: 'Add new item',
        formError: false,
        formSuccess: '',
        defaultImg: '',
        isAdded: false,
        formdata: {
            title: {
                element: 'input',
                value: '',
                config: {
                    label: 'Your item`s title',
                    name: 'title',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            description: {
                element: 'input',
                value: '',
                config: {
                    label: 'Describe your item',
                    name: 'description',
                    type: 'text'
                },
                validation: {
                    required: false,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            category: {
                element: 'select',
                value: 'Select',
                config: {
                    label: 'Category of your items',
                    name: 'category',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            price: {
                element: 'input',
                value: '',
                config: {
                    label: 'Price of your item(in rub)',
                    name: 'price',
                    type: 'number'
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
            restService.createItem(dataToSubmit)
                .then(res => {
                    if (res.status === 201) {
                        return res;
                    } else {
                        throw new Error("Server say that your data is bad");
                    }
                })
                .then(() => {
                    this.setState({ isAdded: true })
                })
                .catch(error => {
                    this.setState({
                        formError: true
                    })
                })
        }
    }

    componentDidMount = () => {
        let restService = new RestService();
        let newFormdata = { ...this.state.formdata };
        restService.getAllCategories().then(res=>{
            res.forEach(item => {
                newFormdata.category.config.options.push(item.value)
            });
            this.setState({formdata : newFormdata});
        })
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

        if (this.state.isAdded) {
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


export default withStyles(styles)(NewItemPage);