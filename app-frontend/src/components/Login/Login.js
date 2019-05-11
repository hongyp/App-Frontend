import React, { Component } from 'react'

import classes from './Login.module.css'
import Input from './Input/Input.js'
import Button from './Button/Button.js'

import loginImg from '../../asset/login.png'

class Login extends Component {

    state = {
        loginForm: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Username'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        loading: false
    }

    submitHandler = (event) => {
        this.setState({loading: true});
        const formData = {};
        for (let inputIdentifier in this.state.loginForm) {
            formData[inputIdentifier] = this.state.loginForm[inputIdentifier].value
        }
        console.log(formData)
        // debugger;
        // Do http request here
        this.props.history.push('/Resource');
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
            ...this.state.loginForm
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
        this.setState({loginForm: updateForm, formIsValid: formIsValid});
    }

    signUpHandler = () => {
        console.log("Signup page")
        this.props.history.push('/signup');
    }

    resetPasswordHandler = () => {
        console.log("Reset password page")
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.loginForm) {
            formElementsArray.push({
                id: key,
                config: this.state.loginForm[key]
            })
        }

        let form = (
            <form onSubmit={this.submitHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                    key={formElement.id}
                    label={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    shouldValidate={formElement.config.validation}
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangeHandler(event, formElement.id)}
                    />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Login</Button>
            </form>
        )

        return (
            <div className={classes.LoginForm}>
                <img src={loginImg} className={classes.Img} alt="Smiley face"></img>

                {form}

                <div className={classes.FormBottom}>
                    <div className={[classes.BottomBtn].join(' ')}>
                        <Button type="button" btnType="Normal" clicked={this.signUpHandler}>Sign up</Button>
                    </div>
                </div>
                <div className={[classes.FormBottom, classes.BottomText].join(' ')}>
                    <div onClick={this.resetPasswordHandler}>Forgot password?</div>
                </div>
            </div>
        );
    }

}

export default Login;