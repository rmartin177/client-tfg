import React from 'react'

const ListOfAuthors = ({ item }) => {
    return (

        <li className="collection-item avatar">
            <img src="../../img/avatar.png" alt="" className="circle" />

            <p>
                {item.author}
            </p>

            <form action="#">
                <p>
                    <label>
                        <input type="checkbox" />
                        <span>Red</span>
                    </label>
                </p>
            </form>
            
            <a href="#!" classNameName="secondary-content">
                <i className="material-icons">grade</i>
            </a>
        </li>

    )
}

export default ListOfAuthors
