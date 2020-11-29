import React ,{useState}from 'react'
import avatar from '../../img/avatar.png'
import "./List.css"

const List = (props) => {
    const { item } = props;

    const [isChecked, setisChecked] = useState("false");

    return (
        <li className="collection-item avatar">
            <img src={avatar} alt="" className="circle" />
            <span className="title white-text">Author´s name: {item.author}</span>
    
            <form className="secondary-content" action="#">
                <p>
                    <label>
                        <input type="checkbox" value={item.author} ischecked={isChecked} link={item.link} onClick={()=>{
                            isChecked === "false" ? setisChecked("true") : setisChecked("false")}}/>
                        <span></span>
                    </label>
                </p>
            </form>
        </li>
    );
}

export default List
