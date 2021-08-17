import React from 'react'
import './Box.css'


const Box = (props) => {
    return (
        <div className={'box'}>
            <svg width={'100'} height={'100'}>
                <rect height={'100'} width={'100'} fill={props.color} />
            </svg>
        </div>
    )
}

export default Box
