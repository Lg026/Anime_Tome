import React from 'react';
import loadstyles from '../styles/loadstyles.module.css'

const Loading = () => {
    return (
        <div className={loadstyles.container}>
            <div className={loadstyles.loader}></div>
        </div>
    );
}


export default Loading