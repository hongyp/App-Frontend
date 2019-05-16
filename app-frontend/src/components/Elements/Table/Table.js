import React from 'react'
import Aux from '../../../hoc/Aux'

import classes from './Table.module.css'
import Cell from '../TableCell/Cell'

const table = (props) => {

    const colWidth = props.colWidth;
    const style = props.style;
    const titles = props.titles;
    const datas = props.datas;

    return (
        <Aux>
            <div className={classes.Table} style={style}>
                {/* Generate title */}
                <div className={classes.Columns}>
                    {titles.map((title, index) => (
                        <Cell key={index} width={colWidth} value={title} isHeader={true} />
                    ))}
                </div>

                {datas.map((data, index) => (
                    <div key={index} className={classes.Columns}>
                        {/* Generate first two columns */}
                        <Cell editable={(e) => props.editable(e, data.projectId, data.resource.id, '', data.resource.name, data.resource.code, true)} width={colWidth} value={data.resource.name} />
                        <Cell editable={(e) => props.editable(e, data.projectId, data.resource.id, '', data.resource.name, data.resource.code, false)} width={colWidth} value={data.resource.code} />
                        {/* Generate features */}
                        {data.features.map((feature, indexF) => (
                            <Cell editable={(e) => props.editable(e, data.projectId, data.resource.id, feature.id)} key={indexF} width={colWidth} value={feature.content} />
                        ))}
                    </div>
                )
                )}
            </div>
        </Aux>
    );

}

export default table;