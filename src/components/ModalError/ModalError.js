import React from 'react'
import "./ModalError.css"

function ModalError() {
    return (
        <>
            <div className="backdropp" onClick={()=>window.location.reload()}></div>
            <div className="error-container">
                <span id="closeBackdrop" onClick={()=>window.location.reload()}>X</span>
                <span>An error occurred with one author´s name, please try again</span>
                <button onClick={()=>window.location.reload()}>try again</button>
            </div>
        </>
    )
}

export default ModalError
