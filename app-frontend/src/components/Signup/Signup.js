import React, { Component } from 'react'
// import axios from '../../axios/axios-app'
import { connect } from 'react-redux'
import { history } from '../../_helpers/history'
import classes from './Signup.module.css'
import Input from '../Elements/Input/Input.js'
import Button from '../Elements/Button/Button.js'

import signupImg from '../../asset/signup.png'
import { userActions } from '../../_actions';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.inputChangeHandler = this.inputChangeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    state = {
        signupForm: {
            firstName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'First Name'
                },
                valid: false,
                validation: {
                    required: true,
                },
                value: '',
                touched: false
            },
            lastName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Last Name'
                },
                valid: false,
                validation: {
                    required: true
                },
                value: '',
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email(Username): email@email.com'
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
                    placeholder: 'Password: At least 6 charactors'
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
        loading: false,
        errorInfo: null,
        submitted: false
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
        this.setState({ signupForm: updateForm, formIsValid: formIsValid });
    }

    loginHandler = () => {
        history.push('/login')
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true, submitted: true });
        const formData = {};
        for (let inputIdentifier in this.state.signupForm) {
            formData[inputIdentifier] = this.state.signupForm[inputIdentifier].value
        }
        const { dispatch } = this.props
        // console.log(formData)
        // do http request here
        if (formData.firstName && formData.lastName && formData.email && formData.password) {
            dispatch(userActions.register(formData));
        }
    }

    render() {
        // const { registering } = this.props;
        const { submitted } = this.state
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
                        errorInfo={this.state.errorInfo}
                        hasCheckBox={false}
                        submitted = {submitted}
                    />
                ))}
                <Button btnType='Success' disabled={!this.state.formIsValid} >Sign up</Button>
            </form>
        )

        return (
            <div className={classes.SignupForm}>
                <img src={signupImg} className={classes.Img} alt="Smiley face"></img>
                <div className={classes.ErrorMessage}>{this.state.errInfo}</div>
                {form}
                <div className={[classes.FormBottom].join(' ')}>
                    <div className={classes.BottomText} onClick={this.loginHandler}>Already have account?</div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    }
}
const connectedRegisterPage = connect(mapStateToProps)(SignUp)
export default connectedRegisterPage;
// export default SignUp;