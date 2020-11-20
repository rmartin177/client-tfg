import React, { Fragment } from 'react'
import Listado from '../ListOfAuthors/ListOfAuthors'
const Modal = (props) => {
    const {listOfAuthors,showModal} = props;

    if(showModal === false)
        return null;
    else{
        return (
            <Fragment>
    
                <div>
                    <div className="modal-content">
                        <h3 className="header">Choose the correct authors:</h3>
                        <ul className="collection">
                            {listOfAuthors.forEach((elm)=>{
                                return(<Listado item = {elm} key={elm.author} />);
                            })}
                            
                               
                </ul>
              </div>
            </div>
            </Fragment>
        )
    }
}

export default Modal
