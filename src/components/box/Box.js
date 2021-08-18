import React from 'react'
import './Box.css'


const Box = (props) => {
    return (
        <div className={'box'}>
            <svg width={'80'} height={'80'}>
                <rect height={'80'} width={'80'} fill={props.color} />
            </svg>
        </div>
    )
}

export default Box
