import React, { Component } from 'react'
import Aux from '../../hoc/Aux';
import axios from '../../axios/axios-app'

import classes from './Resource.module.css'
// import Button from '../Elements/Button/Button'
import Cell from '../../components/Elements/TableCell/Cell'

class Resource extends Component {

    state = {
        Resource: null,
        loading: false
    }

    componentDidMount() {
        axios.get('/getProject/1')
            .then(response => {
                // console.log(response);
                this.setState({ Resource: response })
            })
            .catch(error => {
                console.log(error);
            })
    }

    getProjectById = (projectId) => {
        // console.log(projectId)
        axios.get('/getProject/1')
            .then(response => {
                console.log(response.data);
                this.setState({ Resource: { response } })
            })
            .catch(error => {
                console.log(error);
            })
    }

    editCellHandler = (event, projectId, resourceId, featureId) => {
        console.log(projectId + " " + resourceId + " " + featureId)
        var element = event.target;
        var curVal = element.innerHTML;
        element.innerHTML = "";
        var newObj = document.createElement("input");
        // newObj.className="input";
        newObj.value = curVal;
        element.appendChild(newObj);
        // console.log(nextObj)
        newObj.focus();
        newObj.onblur = () => {
            element.innerHTML = this.value ? this.value : newObj.value;
        }
    }

    render() {
        const datas = []
        const titles = ['Resource Name', 'Resource Code']
        if (this.state.Resource !== null) {
            for (let key in this.state.Resource.data) {
                datas.push(this.state.Resource.data[key])
                // console.log(this.state.Resource.data[key])
            }
            for (let key in this.state.Resource.data[0].features) {
                // console.log(this.state.Resource.data[0].features[key].name)
                titles.push(this.state.Resource.data[0].features[key].name);
            }
        }

        const colsNum = titles.length;
        const colWidth = String(100 / colsNum) + "%";

        const table = (
            <Aux>
                <div className={classes.TopBar}>TopBar</div>
                <div className={classes.Table}>
                    {/* Generate title */}
                    <div className={classes.Columns}>
                        {titles.map((title, index) => (
                            <Cell key={index} width={colWidth} value={title} isHeader={true} />
                        ))}
                    </div>

                    {datas.map((data, index) => (
                        <div key={index} className={classes.Columns}>
                            {/* Generate first two columns */}
                            <Cell width={colWidth} value={data.resource.name} />
                            <Cell width={colWidth} value={data.resource.code} />
                            {/* Generate features */}
                            {data.features.map((feature, indexF) => (
                                <Cell key={indexF} width={colWidth} value={feature.content} />
                            ))}
                        </div>
                    )
                    )}
                </div>
            </Aux>
        );

        // const featureId = 10;
        return (
            <div className={classes.Container}>
                {table}
                {/* <Button clicked={this.getProjectById}>Generating data</Button> */}
                {/* <div onDoubleClick={(e) => this.editCellHandler(e, 'projectId', 'resourceId', featureId)}>小米笔记本电脑</div> */}
            </div>
        );
    }
}

export default Resource;