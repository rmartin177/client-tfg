import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import M from "materialize-css";
import "./Modal.css";
const Modal = (props) => {
  const {
    listOfAuthors,
    showModal,
    setauthorsChoosen,
    authorsChoosen,
    setsanitize,
    setSpinner,
    userSearch,
  } = props;
  useEffect(() => {
    if (showModal !== false) {
      console.log(userSearch);
      const elem = document.getElementById("modal1");
      var instance = M.Modal.init(elem, { dismissible: false });
      //inicializacion del modal
      instance.open();
      appendCards();
    }
  }, []);

  const [numberOfCardsSelected, setnumberOfCardsSelected] = useState(0);

  const selectedAuthors = (e) => {
    e.preventDefault();
    //seleccionamos los input que ha elegido el usuario
    var cardsChecked = document.querySelectorAll("div[ischecked = true]");
    let ar = 0;
    var returnedTarget;
    for (let index = 0; index < cardsChecked.length; index++) {
      let obj = {
        author: cardsChecked[index].getAttribute("value"),
        link: cardsChecked[index].getAttribute("link"),
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
      instance.destroy();
    }
  };

  const appendCards = () => {
    //funcion que te dice el tamaño de un objeto
    Object.size = function (obj) {
      var size = 0,
        key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
      }
      return size;
    };
    //cogemos la zona donde van a ir las cartas
    const collection = document.querySelector("#list");
    //seleccionamos las cartas
    const cards = collection.getElementsByClassName("card");

    //vamos a ir creando div para poner las cartas de cada autor
    for (let index = 0; index < listOfAuthors.length; index++) {
      let divPpal = document.createElement("div");
      //lo mismo lo pongo centrado
      let divName = document.createElement("div");
      let divCards = document.createElement("div");
      divCards.classList.add("flex");

      let name = document.createElement("p");
      name.innerText = "Results for: " + userSearch[index];
      name.classList.add("searchTitles");
      divName.appendChild(name);
      for (let j = 0; j < Object.size(listOfAuthors[index]); j++) {
        //cojo siempre la 0 por que segun las vas cogiendo todo se reposiciona y se rellena otra vez el 0
        divCards.appendChild(cards[0]);
      }
      divPpal.appendChild(divName);
      divPpal.appendChild(divCards);
      collection.appendChild(divPpal);
    }
  };

  if (showModal === false) return null;
  else {
    return (
      <>
        <div id="modal1" className="modal modal-fixed-footer">
          <div className="modal-content">
            <h5 className="header white-text">Choose the correct authors:</h5>
            <ul className="collection" id="list">
              <p id="contador">Authors Selected: {numberOfCardsSelected}</p>
              {listOfAuthors.map((elm, i) => {
                return Object.keys(elm).map(function (key, i) {
                  return (
                    <Card
                      item={elm[key]}
                      key={i}
                      numberOfCardsSelected={numberOfCardsSelected}
                      setnumberOfCardsSelected={setnumberOfCardsSelected}
                    />
                  );
                });
              })}
            </ul>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-action waves-effect waves-red btn-flat"
              id="accept"
              onClick={(e) => selectedAuthors(e)}
            >
              Accept
            </a>
            <a
              href="#!"
              className="modal-action waves-effect waves-green btn-flat"
              id="close"
              onClick={() => {
                window.location.reload();
                return false;
              }}
            >
              Close
            </a>
          </div>
        </div>
      </>
    );
  }
};

export default Modal;
