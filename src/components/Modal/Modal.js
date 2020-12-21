import React, { Fragment, useEffect } from "react";
import List from "../ListOfAuthors/List";
import ReactDOM from "react-dom";
import M from "materialize-css";
import "./Modal.css";
const Modal = (props) => {
  const {
    listOfAuthors,
    showModal,
    setauthorsChoosen,
    authorsChoosen,
    setsanitize,
  } = props;
  useEffect(() => {
    if (showModal !== false) {
      const elem = document.getElementById("modal1");
      var instance = M.Modal.init(elem, { dismissible: false });
      //inicializacion del modal
      instance.open();
    }
  }, []);

  const selectedAuthors = (e) => {
    e.preventDefault();
    //seleccionamos los input que ha elegido el usuario
    var inputsChecked = document.querySelectorAll("input[ischecked = true]");
    console.log("Ha selecionado: " + inputsChecked.length);
    let ar = 0;
    var returnedTarget;
    for (let index = 0; index < inputsChecked.length; index++) {
      let obj = {
        author: inputsChecked[index].value,
        link: inputsChecked[index].getAttribute("link"),
      };
      //esto es para que la primera vez concatene con los autores que ya estaban seleccionados
      //y la segunda ya no se pisen
      if (index === 0) {
        returnedTarget = authorsChoosen.concat(obj);
        setauthorsChoosen(returnedTarget);
        ar++;
      } else {
        returnedTarget = returnedTarget.concat(obj);
        setauthorsChoosen(returnedTarget);
        ar++;
      }
    }
    //Si no ha seleccionado ningun autor salta el toast
    if (ar === 0) {
      var toastHTML =
        '<span class="errorEmpty">You have to choose at least one author.</span>';
      M.toast({ html: toastHTML, classes: "rounded" });
    } else {
      const elem = document.getElementById("modal1");
      var instance = M.Modal.init(elem, { dismissible: false });
      //se avisa de que hay que llamar a getSanitize
      setsanitize(true);
      //se cierra el modal si todo esta ok
      instance.close();
    }
  };

  if (showModal === false) return null;
  else {
    return (
      <div id="modal1" className="modal bottom-sheet">
        <div className="modal-content">
          <h3 className="header white-text">Choose the correct authors:</h3>
          <ul className="collection" id="list">
            {listOfAuthors.map((elm, i) => {
              return Object.keys(elm).map(function (key, i) {
                console.log(key);
                return <List item={elm[key]} key={i} />;
              });
            })}
          </ul>
          <a
            href=""
            className="modal-action waves-effect waves-red btn-flat"
            id="accept"
            onClick={(e) => selectedAuthors(e)}
          >
            Accept
          </a>
          <a
            href=""
            className="modal-action modal-close waves-effect waves-green btn-flat"
            id="close"
          >
            Close
          </a>
        </div>
      </div>
    );
  }
};

export default Modal;
