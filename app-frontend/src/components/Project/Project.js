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
        initProjectId: "1",
        leftResourceIdList: [],
        rightResourceIdList: [],
        RightResource: [],
        loading: false,
    }

    componentDidMount() {
        axios.get('/getProject/' + this.state.initProjectId)
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

    checkBoxAddHandler = (event, resourceId) => {
        // console.log(event.target.checked)
        // console.log(resourceId)
        // console.log(checkBoxIndex)
        // const leftRemoveIndexList = [...this.state.leftRemoveIndexList]
        const leftResourceIdList = [...this.state.leftResourceIdList]
        if (event.target.checked) {
            leftResourceIdList.push(Number(resourceId))
            // leftRemoveIndexList.push(Number(checkBoxIndex))
        } else {
            for(var i = 0; i < leftResourceIdList.length; i++){ 
                if (leftResourceIdList[i] === resourceId) {
                    leftResourceIdList.splice(i, 1); 
                }
            }
            // for (i = 0; i < leftRemoveIndexList; i++) {
            //     if (leftRemoveIndexList[i] === checkBoxIndex) {
            //         leftRemoveIndexList.splice(i, 1);
            //     }
            // }
        }
        this.setState({leftResourceIdList: leftResourceIdList})
                        // leftRemoveIndexList: leftRemoveIndexList})
    }

    checkBoxDeleteHandler = (event, resourceId) => {
        // console.log(this.state.RightResource)
        // console.log(resourceId)
        const rightResourceIdList = [...this.state.rightResourceIdList]
        if (event.target.checked) {
            rightResourceIdList.push(Number(resourceId))
        } else {
            for(var i = 0; i < rightResourceIdList.length; i++){ 
                if (rightResourceIdList[i] === resourceId) {
                    rightResourceIdList.splice(i, 1); 
                }
            }
        }
        this.setState({rightResourceIdList: rightResourceIdList})
    }

    addToRightBtnHandler = (event) => {
        // console.log(this.leftResourceIdList)
        const list = [...this.state.RightResource]
        // const Resource = []
        // var leftRemoveIndexList = [...this.state.leftRemoveIndexList]
        // leftRemoveIndexList = leftRemoveIndexList.sort().reverse()
        // console.log(leftRemoveIndexList)
        if (this.state.Resource) {
            for (let key in this.state.Resource.data) {
                // const obj = this.state.Resource.data[key]
                if (this.state.leftResourceIdList.includes(this.state.Resource.data[key].resource.id)
                    && !list.includes(this.state.Resource.data[key])) {
                    list.push(this.state.Resource.data[key])
                }
                // if (!leftRemoveIndexList.includes(Number(key))) {
                //     Resource.push(this.state.Resource.data[key])
                // }
            }
        }
        this.setState({RightResource: list})
                            // , Resource: {data:Resource}})
        this.cancelLeftAllHandler()
    }

    rightTrashHandler = (event) => {
        const list = []
        
            for (let key in this.state.RightResource) {
                if (!this.state.rightResourceIdList.includes(this.state.RightResource[key].resource.id)) {
                    list.push(this.state.RightResource[key])
                }
            }
        
        this.setState({RightResource: list})
        this.cancelRightAllHandler()
    }

    selectLeftAllHandler = (event) => {
        var objs = document.getElementById('left-table').getElementsByTagName('input')
        for (var i = 0; i < objs.length; i++) {
            objs[i].checked = true
        }
        const leftResourceIdList = [];
        for (let key in this.state.Resource.data) {
            leftResourceIdList.push(this.state.Resource.data[key].resource.id)
        }
        this.setState({leftResourceIdList: leftResourceIdList})
    }

    cancelLeftAllHandler = (event) => {
        var objs = document.getElementById('left-table').getElementsByTagName('input')
        for (var i = 0; i < objs.length; i++) {
            objs[i].checked = false
        }
    }

    cancelRightAllHandler = (event) => {
        var objs = document.getElementById('right-table').getElementsByTagName('input')
        for (var i = 0; i < objs.length; i++) {
            objs[i].checked = false
        }
    }

    render() {
        console.log(this.state.Resource)
        // console.log(this.state.leftResourceIdList)
        const datas = []
        var Resource = { ...this.state.Resource }
        if (Resource) {
            for (let key in Resource.data) {
                datas.push(Resource.data[key])
                Resource.data[key].features = []
            }
        }
        const colWidth = '50%';
        const titles = ['Project Name', 'Project Code']
        const style = {
            width: '100%'
        }

        const rightDatas = [...this.state.RightResource]

        return (
            <div className={classes.Container}>
                <div className="project-page">
                    <Select list={this.state.ProjectList} clicked={(e) => this.selectProjectHandlder(e)} />
                </div>
                <div className={classes.Tables}>
                    <div id="left-table" className={classes.Table}>
                        <div className={classes.TopBar}>
                            <div className={classes.Title}>
                                <span>Resource Catalog</span>
                            </div>
                            <div className={classes.dropdown}>
                                <button onClick={(e) => this.optionHandler(e)} className={classes.Button}>
                                    <FontAwesomeIcon color="rgb(255, 255, 255)" icon="list" />
                                </button>
                                {this.state.showOption && <div id="myDropdown" className={classes.dropdownContent}>
                                    <div onClick={this.selectLeftAllHandler}><a href="#row">Select all</a></div>
                                    <div onClick={this.cancelAllHandler}><a href="#col">Clear selection</a></div>
                                </div>}
                            </div>
                            <div className={classes.dropdown}>
                                <button onClick={(e) => this.addToRightBtnHandler(e)} className={classes.Button}>
                                    <FontAwesomeIcon color="rgb(255, 255, 255)" icon="arrow-alt-circle-right" />
                                </button>
                            </div>
                        </div>
                        <Table hasCheckBox={true} style={style} colWidth={colWidth} titles={titles} datas={datas} checkboxClick={this.checkBoxAddHandler} editable={this.editCellHandler} />
                    </div>
                    <div id="right-table" className={classes.Table}>
                        <div className={classes.TopBar}>
                            <div className={classes.Title}>
                                <span>Project</span>
                            </div>
                            <div className={classes.dropdown}>
                                <button onClick={(e) => this.rightTrashHandler(e)} className={classes.Button}>
                                    <FontAwesomeIcon color="rgb(255, 255, 255)" icon="trash" />
                                </button>
                            </div>
                        </div>
                        <Table hasCheckBox={true} style={style} colWidth={colWidth} titles={titles} datas={rightDatas} checkboxClick={this.checkBoxDeleteHandler} editable={this.editCellHandler} />
                    </div>
                </div>
            </div>
        )
    }

}

export default Project;