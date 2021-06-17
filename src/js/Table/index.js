import { writeAuthorsOnTable } from "../Table/author";
import { writePublicationOnTable } from "../Table/publications";
import { syntaxHighlight } from "../utils";

//Esta funcion se encarga de escribir el json en las tablas
export const writeOnTable = (
  json,
  paginaActualAutores,
  articulosPorPaginaAutores,
  paginaActualPublicaciones,
  articulosPorPaginaPublicaciones,
  filtersAuthors
) => {
  //--- Authors ---
  writeAuthorsOnTable(
    json,
    paginaActualAutores,
    articulosPorPaginaAutores,
    filtersAuthors
  );

  //--- Publications ---
  writePublicationOnTable(
    json,
    paginaActualPublicaciones,
    articulosPorPaginaPublicaciones,
    filtersAuthors
  );

  //--- Errors ---
  writeErrors(json);
};

//se encargade mostrarlos errores
function writeErrors(json) {
  let errorContainer = document.getElementById("tabErrors");
  let ul = document.createElement("ul");
  console.log(json);
  if(json.errors != undefined){
    let cont = 0;
  for (let index = 0; index < json.errors.length; index++) {
    for (let array2 = 0; array2 < json.errors[index].length; array2++) {
      cont++;
      let li = document.createElement("li");
      let span = document.createElement("span");
      span.classList.add("errorText");
      span.innerText = "Error " + cont + ": ";
      li.appendChild(span);
      li.appendChild(document.createTextNode(json.errors[index][array2]));
      ul.appendChild(li);
      let br = document.createElement("br");
      ul.appendChild(br);
    }
    
  }
  errorContainer.appendChild(ul);
}
  
}
//Esta funcion se encarga de todo lo que es la parte de descargar el json
export const downloadObjectAsJson = (exportObj, exportName) => {
  var jsonPretty = syntaxHighlight(exportObj);
  var dataStr =
    "data:text/json;charset=utf-8," + encodeURIComponent(jsonPretty);
  var downloadAnchorNode = document.getElementById("downloadJson");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
};

//funcion que se usa en las pestañas
export const tabsFunction = (id) => {
  var tabcontent, tablinks;
  //oculta todo el contenido de las pestañas
  tabcontent = document.getElementsByClassName("tabContent");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // quita la clase activo de las pestañas
  tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace("active", "");
  }

  // le añade activo a la que estamos pulsando y la enseña
  var current = document.getElementById(id);
  current.style.display = "block";
  current.classList.add("active");
};
