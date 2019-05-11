import React, { Component } from 'react'

import classes from './Signup.module.css'
import Input from '../Login/Input/Input.js'
import Button from '../Login/Button/Button.js'

import signupImg from '../../asset/signup.png'

class SignUp extends Component {

    state = {
        signupForm: {
            // firstName: {
            //     elementType: 'input',
            //     elementConfig: {
            //         type: 'text',
            //         placeholder: 'First Name'
            //     },
            //     valid: false,
            //     validation: {
            //         required: true,
            //     },
            //     value: '',
            //     touched: false
            // },
            // lastName: {
            //     elementType: 'input',
            //     elementConfig: {
            //         type: 'text',
            //         placeholder: 'First Name'
            //     },
            //     valid: false,
            //     validation: {
            //         required: true,
            //     },
            //     value: '',
            //     touched: false
            // },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email'
                },
                valid: false,
                validation: {
                    required: true,
                    isEmail: true
                },
                value: '',
                touched: false
            }, 
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Password'
                },
                valid: false,
                validation: {
                    required: true,
                },
                value: '',
                touched: false
            },
            confirmPassword: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Confirm Password'
                },
                valid: false,
                validation: {
                    required: true,
                },
                value: '',
                touched: false
            }
        },
        formIsValid: false,
        loading: false
    }

    checkValidity = (value, validation) => {
        let isValid = true;
        // no validation
        if (!isValid) {
            return true;
        }
        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid;
        }
        if (validation.maxLength) {
            isValid = value.length <= validation.maxLength && isValid;
        }
        if (validation.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }
        if (validation.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updateForm = {
            ...this.state.signupForm
        }
        const updateFormElement = {
            ...updateForm[inputIdentifier]
        }
        updateFormElement.value = event.target.value;
        updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation);
        updateFormElement.touched = true;
        updateForm[inputIdentifier] = updateFormElement;

        let formIsValid = true;
        for (let identifier in updateForm) {
            formIsValid = updateForm[identifier].valid && formIsValid;
        }
        this.setState({signupForm: updateForm, formIsValid: formIsValid});
    }

    submitHandler = (event) => {
        this.setState({loading: true});
        const formData = {};
        for (let inputIdentifier in this.state.signupForm) {
            formData[inputIdentifier] = this.state.signupForm[inputIdentifier]
        }
        console.log(formData)
        // do http request here
        this.props.history.push('/login')
    }
    
    render() {

        const formElementsArray = [];
        for (let key in this.state.signupForm) {
            formElementsArray.push({
                id: key,
                config: this.state.signupForm[key]
            })
        }
        
        let form = (
            <form onSubmit={this.submitHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        // label={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        invalid={!formElement.valid}
                        value={formElement.value}
                        shouldValidation={formElement.validation}
                        touched={formElement.touched}
                        changed={(event) => this.inputChangeHandler(event, formElement.id)}
                    />
                ))}
                <Button btnType='Success' disabled={!this.state.formIsValid}>Sign up</Button>
            </form>
        )

        return (
            <div className={classes.SignupForm}>
                <img src={signupImg} className={classes.Img} alt="Smiley face"></img>
                {form}
            </div>
        );
    }
}

export default SignUp;