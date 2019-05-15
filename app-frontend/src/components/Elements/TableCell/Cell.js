import React from 'react'
import classes from './Cell.module.css'

const cell = (props) => {

    const style = {
        width: props.width
    };

    const inputClasses = [classes.Cell]
    if (props.isHeader) {
        inputClasses.push(classes.Header)
    }

    return (
        <div style={style} className={inputClasses.join(' ')} onClick={props.clicked}>
            {props.value}
        </div>
    );
}

export default cell;