import React, { Component } from 'react'

import classes from './Project.module.css'
import axios from '../../axios/axios-app'
import Select from '../Elements/Selection/Selection'
import Table from '../Elements/Table/Table'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Project extends Component {

    state = {
        Resource: null,
        ProjectList: [],
        currentProjectId: "1",
        addProjectList: [],
        loading: false,
    }

    componentDidMount() {
        axios.get('/getProject/1')
            .then(response => {
                this.setState({ Resource: response })
            })
            .catch(error => {
                console.log(error);
                this.setState({ errorInfo: 'Not found Reource' })
            });
        axios.get('/getAllProjects')
            .then(response => {
                this.setState({ ProjectList: response.data });
            })
    }

    selectProjectHandlder = (event) => {
        axios.get('/getProject/' + Number(event.target.value))
            .then(response => {
                this.setState({ Resource: response })
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

    optionHandler = (event) => {
        console.log("Selection")
        this.setState({ showOption: !this.state.showOption })
    }

    render() {
        const datas = []
        var Resource = { ...this.state.Resource }
        if (Resource) {
            for (let key in Resource.data) {
                datas.push(Resource.data[key])
                Resource.data[key].features = []
            }
        }
        const colWidth = '50%';
        const titles = ['Resource Name', 'Resource Code']
        const style = {
            width: '100%'
        }

        const table = (
            <Table style={style} colWidth={colWidth} titles={titles} datas={datas} editable={this.editCellHandler} />
        )
        return (
            <div className={classes.Container}>
                <div className="project-page">
                    {/* <Select list={this.state.ProjectList} clicked={(e) => this.selectProjectHandlder(e)} /> */}
                </div>
                <div className={classes.Tables}>
                    <div className={classes.Table}>
                        <div className={classes.TopBar}>
                            <div className={classes.Title}>
                                <span>Resource Catalog</span>
                            </div>
                            <div className={classes.dropdown}>
                                <button onClick={(e) => this.optionHandler(e)} className={classes.Button}>
                                    <FontAwesomeIcon color="rgb(255, 255, 255)" icon="plus" />
                                </button>
                                {this.state.showOption && <div id="myDropdown" className={classes.dropdownContent}>
                                    <div onClick={this.addRowHandler}><a href="#row">Add row</a></div>
                                    <div onClick={this.addColHandler}><a href="#col">Add column</a></div>
                                    <div onClick={this.importCSVHandler}><a href="#csv">Import CSV</a></div>
                                </div>}
                            </div>
                        </div>
                        {table}
                    </div>
                    <div className={classes.Table}>
                        <div className={classes.TopBar}>
                            <div className={classes.Title}>
                                <span>Resource Catalog</span>
                            </div>
                            <div className={classes.dropdown}>
                                <button onClick={(e) => this.optionHandler(e)} className={classes.Button}>
                                    <FontAwesomeIcon color="rgb(255, 255, 255)" icon="plus" />
                                </button>
                                {this.state.showOption && <div id="myDropdown" className={classes.dropdownContent}>
                                    <div onClick={this.addRowHandler}><a href="#row">Add row</a></div>
                                    <div onClick={this.addColHandler}><a href="#col">Add column</a></div>
                                    <div onClick={this.importCSVHandler}><a href="#csv">Import CSV</a></div>
                                </div>}
                            </div>
                        </div>
                        <Table style={style} colWidth={colWidth} titles={titles} datas={[]} editable={this.editCellHandler} />
                    </div>
                </div>
            </div>
        )
    }

}

export default Project;