import React, { Component } from 'react'
import axios from '../../axios/axios-app'

import classes from './Resource.module.css'
import './Resource.css'
// import Button from '../Elements/Button/Button'
import Table from '../Elements/Table/Table'
import Search from '../Elements/Search/Search'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Resource extends Component {

    state = {
        Resource: null,
        errorInfo: null,
        showOption: false,
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

    searchHandler = () => {
        console.log("Search")
    }

    optionHandler = (event) => {
        console.log("Selection")
        this.setState({ showOption: !this.state.showOption })
    }

    addRowHandler = () => {
        this.optionHandler()
        console.log("Add row")
    }

    addColHandler = () => {
        this.optionHandler()
        console.log("Add col")
    }

    importCSVHandler = () => {
        this.optionHandler()
        console.log("Import csv")
    }

    render() {
        const datas = []
        const titles = ['Resource Name', 'Resource Code']
        if (this.state.Resource !== null) {
            for (let key in this.state.Resource.data) {
                datas.push(this.state.Resource.data[key])
            }
            for (let key in this.state.Resource.data[0].features) {
                titles.push(this.state.Resource.data[0].features[key].name);
            }
        }

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

        const table = (
            <div style={tabaleContainerStyle}>
                <Table style={style} colWidth={colWidth} titles={titles} datas={datas} isEditable={false} editable={this.editCellHandler} />
            </div>
        );

        return (
            <div className={classes.Container}>
                <div className={classes.TopBar}>
                    <div>
                        <Search clicked={this.searchHandler} placeholder={"Keyword"} />
                    </div>
                    <div>
                        <span className={classes.Title}>Resource Catalog</span>
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
        );
    }
}

export default Resource;