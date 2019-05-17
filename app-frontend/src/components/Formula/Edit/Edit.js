import React, { Component } from 'react'
import axios from '../../../axios/axios-app'
import classes from './Edit.module.css'
import Cell from '../../Elements/TableCell/Cell'
import Field from '../Field/Field'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Edit extends Component {

    state = {
        FeaturesList: null,
        CurrentProjectId: 1,
        selectedFeaturesIdList: [],
        loading: false,
        InputFields: []
    }

    componentDidMount() {
        axios.get('/project/' + this.state.CurrentProjectId + '/getAllFeatures')
            .then(response => {
                this.setState({ FeaturesList: response.data });
                // console.log(response)
            })
    }

    backToFormulaHandler = () => {
        // this.props.history.push('/formula')
    }

    submitHandler = () => {
        console.log(this.state.selectedFeaturesIdList)
        var objs = document.getElementsByClassName('field')
        for (var index = 0; index < objs.length; index++) {
            var inputs = objs[index].getElementsByTagName('input')
            const obj = {
                name: inputs[0].value,
                type: inputs[1].value,
                content: null,
                projectId: this.state.CurrentProjectId
            }
            axios.post('/project/saveFeature', obj)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    checkboxClick = (event, featureValue, featureId) => {
        const selectedFeature = [...this.state.selectedFeaturesIdList]
        if (event.target.checked) {
            selectedFeature.push(Number(featureId));
        } else {
            for (var i = 0; i < selectedFeature.length; i++) {
                if (selectedFeature[i] === featureId) {
                    selectedFeature.splice(i, 1);
                }
            }
        }
        this.setState({ selectedFeaturesIdList: selectedFeature })
    }

    rightTrashHandler = (event, index) => {
        const fields = [...this.state.InputFields]
        fields[index - 1] = ''
        // console.log(index - 1)
        this.setState({ InputFields: fields })
    }

    optionChangeHandler = (event) => {
        // console.log(event.target.value)
        if (event.target.value !== 'Formula') {
            event.target.parentNode.nextSibling.childNodes[0].childNodes[2].disabled = true
        } else {
            event.target.parentNode.nextSibling.childNodes[0].childNodes[2].disabled = false
        }
    }

    addFieldHandler = (event) => {
        const fields = [...this.state.InputFields]
        fields.push(<div key={fields.length + 1} className={[classes.Field, 'field'].join(' ')}>
                        <Field index={fields.length + 1} isFormula={false} rightTrashHandler={this.rightTrashHandler} changed={this.optionChangeHandler}/>
                    </div>);
        this.setState({ InputFields: fields })
    }

    render() {
        console.log(this.state.FeaturesList)
        var features = [];
        if (this.state.FeaturesList) {
            features = [...this.state.FeaturesList]
        }
        return (
            <>
                <div className={classes.Container}>
                    <div className={classes.Tables}>
                        <div className={classes.LeftTable}>
                            <div className={classes.InnerTable}>
                                <Cell value={'Project Scope Field'} isHeader={true} />
                                <div className={classes.HeaderContainer}>
                                    {features.map((feature, index) => (
                                        <Cell className={classes.Cell} key={index} value={feature.name} id={feature.id} isHeader={false} hasCheckbox={true} checkBoxValue={feature.id} checkboxClick={this.checkboxClick} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={classes.RightTable}>
                            <div className={classes.InnerTable}>
                                <Cell value={'Quantity Survey Field'} isHeader={true} />
                            </div>
                            {/* <div id="fields" className={classes.Field}>
                                <Field index={0} isFormula={true} rightTrashHandler={this.rightTrashHandler} changed={this.optionChangeHandler}/>
                            </div> */}
                            {this.state.InputFields}
                            <div className={classes.RightTableBtn}>
                                Add Field&nbsp;
                                <button onClick={(e) => this.addFieldHandler(e)} className={classes.Button}>
                                    <FontAwesomeIcon color="rgb(255, 255, 255)" icon="plus" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>Bottom</div>
                    {/* <button onClick={this.backToFormulaHandler}>Submit</button> */}
                </div>
                <button onClick={this.submitHandler}>Submit</button>
            </>
        );
    }
}

export default Edit;