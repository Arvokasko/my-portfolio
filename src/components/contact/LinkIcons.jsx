import React, { useRef } from 'react'

const LinkIcons = ({ iconClass, linkUrl }) => {

    return (
        <div style={{ width: "150px", height: "150px", margin: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <a href={linkUrl} target='_blank' rel="noreferrer" className="link-icon">
                <i className={iconClass}></i>
            </a>
        </div>
    )
}

export default LinkIcons