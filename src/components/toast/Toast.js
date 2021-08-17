import React from 'react'
import './toast.css'


const Toast = () => {

    return (
        <div className={'toast-block'}>
            <span className={'toast-txt'}>Input value must be an integer between -100 and 100</span>
        </div>
    )
}

export default Toast
