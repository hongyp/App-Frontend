import React, { Component } from 'react'
import axios from '../../axios/axios-app'
import classes from './Formula.module.css'
import Table from '../Elements/Table/Table'
import Select from '../Elements/Selection/Selection'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Formula extends Component {

    state = {
        ProjectResource: null,
        ProjectList: [],
        disableShowFeatureCols: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        loading: false
    }

    componentDidMount() {
        axios.get('/getProject/1')
            .then(response => {
                console.log(response)
                this.setState({ ProjectResource: response })
            })
            .catch(error => {
                console.log(error)
                console.log("Fail to get data")
            })
        axios.get('/getAllProjects')
            .then(response => {
                this.setState({ ProjectList: response.data });
            })
    }

    selectProjectHandlder = (event) => {
        axios.get('/getProject/' + Number(event.target.value))
            .then(response => {
                this.setState({ ProjectResource: response })
            })
            .catch(error => {
                console.log(error);
                this.setState({ errorInfo: 'Not found Reource' })
            });
    }

    updateResourceHandler = (projectId, resourceId, newVal, featureName, featureCode, isFeatureName) => {
        console.log(projectId + " " + resourceId + " " + newVal + " " + featureName + " " + featureCode + " " + isFeatureName)
        const feature = {};
        feature['id'] = resourceId
        feature['projectId'] = projectId
        if (isFeatureName) {
            feature['name'] = newVal
            feature['code'] = featureCode
        } else {
            feature['name'] = featureName
            feature['code'] = newVal
        }
        axios.put('/updateResource', feature)
            .then(res => {
                console.log(res)
                console.log("successfully update Resource")
            })
    }

    updateResourceHandler = (projectId, resourceId, newVal, featureName, featureCode, isFeatureName) => {
        console.log(projectId + " " + resourceId + " " + newVal + " " + featureName + " " + featureCode + " " + isFeatureName)
        const feature = {};
        feature['id'] = resourceId
        feature['projectId'] = projectId
        if (isFeatureName) {
            feature['name'] = newVal
            feature['code'] = featureCode
        } else {
            feature['name'] = featureName
            feature['code'] = newVal
        }
        axios.put('/updateResource', feature)
            .then(res => {
                console.log(res)
                console.log("successfully update Resource")
            })
    }

    updateFeatureValueHandler = (projectId, resourceId, featureId, newVal) => {
        // console.log(projectId + " " + resourceId + " " + featureId + " " + newVal)
        const featureValue = {};
        featureValue['value'] = newVal;
        featureValue['projectId'] = projectId;
        featureValue['resourceId'] = resourceId;
        featureValue['featureId'] = featureId;
        axios.put('/updateFeatureValue', featureValue)
            .then(res => {
                console.log(res);
                console.log("successfully update value");
            })
    }

    editCellHandler = (event, projectId, resourceId, featureId, featureName, featureCode, isFeatureName) => {
        var element = event.target;
        var curVal = element.innerHTML;
        element.innerHTML = "";
        var newObj = document.createElement("input");
        newObj.className = "edit";
        newObj.value = curVal;
        element.appendChild(newObj);
        var padding = element.style.padding;
        element.style.padding = '0'
        newObj.focus();
        newObj.onblur = () => {
            element.innerHTML = this.value ? this.value : newObj.value;
            element.style.padding = padding
            if (featureId === '') {
                this.updateResourceHandler(projectId, resourceId, newObj.value, featureName, featureCode, isFeatureName)
            } else {
                this.updateFeatureValueHandler(projectId, resourceId, featureId, newObj.value)
            }
        }
    }

    editBtnHandler = (event) => {
        console.log("Jump")
        this.props.history.push('/edit')
    }

    render() {
        const disableShowFeatureCols = [...this.state.disableShowFeatureCols]
        const datas = []
        const titles = ['Resource Name', 'Resource Code']
        var Resource = null;
        if (this.state.ProjectResource !== null) {
            Resource = { ...this.state.ProjectResource }
        }
        // console.log(Resource)
        if (Resource !== null && Resource.data[0] !== undefined) {
            for (let key in Resource.data[0].features) {
                if (disableShowFeatureCols.includes(Number(key))) { continue; }
                titles.push(Resource.data[0].features[key].name);
            }
            const order = disableShowFeatureCols.reverse();
            for (let key in Resource.data) {
                var obj = Resource.data
                var objFeatures = obj[key].features
                for (let index in order) {
                    objFeatures.splice(order[index], 1)
                }
                datas.push(obj[key])
            }
        }
        // console.log(titles)
        const colsNum = titles.length;
        const colWidth = String(100 / colsNum) + "%";
        var tableWith = '';
        var tabaleContainerStyle = {}
        if (colsNum < 5) {
            tableWith = '100%';
        } else {
            tableWith = String(170 * colsNum) + 'px';
            tabaleContainerStyle = {
                overflow: 'scroll',
                borderStyle: 'solid',
                borderWidth: '1px',
                borderColor: 'rgb(138, 138, 137)',
                paddingBottom: '12px'
            }
        }
        const style = {
            width: tableWith
        }

        return (
            <div className={classes.Container}>
                <Select list={this.state.ProjectList} clicked={(e) => this.selectProjectHandlder(e)} />
                <div className={classes.TablePart}>
                    <div className={classes.TopBar}>
                        <div className={classes.Title}>
                            <span>Quantity Survey</span>
                        </div>
                    </div>
                    <div style={tabaleContainerStyle}>
                        <Table style={style} colWidth={colWidth} titles={titles} datas={datas} isEditable={true} editable={this.editCellHandler} />
                    </div>
                </div>
                <div className={classes.Bottom}>
                    <div>
                        <label className={classes.EditLink} onClick={this.editBtnHandler}>
                            Edit Quantity Survey Template
                        </label>
                    </div>
                    <button className={classes.Button}>
                        <FontAwesomeIcon color="rgb(255, 255, 255)" icon="check" /> &nbsp;
                        submit
                    </button>
                </div>
            </div>
        )
    }

}

export default Formula;