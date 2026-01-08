import React from 'react'

const Icons = ({ iconClass }) => {

    return (
        <div style={{ width: "150px", height: "150px", margin: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <i className={iconClass}></i>
        </div>
    )
}

export default Icons