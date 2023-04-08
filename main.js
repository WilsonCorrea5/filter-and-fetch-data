//seleccionamos y guardamos en una variable la lista ordenada del documento
const userList = document.querySelector("#users");
const listData = [];
//evento que carga el contenido del dom, el primer argumento es el evento y el segundo ejecuta una funcion que carga los usuarios de forma asincrona y desestructura la propiedad data.
window.addEventListener("DOMContentLoaded", async () => {
  userList.innerText = "...";
  const { data } = await loadUsers();
  //le agregamos al array vacio la data con el spread operator
  listData.push(...data);
  renderUser(listData);
});
//funcion que recibe y recorre el array de objetos y retorna el nombre/apellido del usuario en una etiqueta li
function createUserItems(users) {
  return users
    .map(
      (user) =>
        `<li class='bg-zinc-800 hover:bg-sky-900 hover:cursor-pointer py-1'>${user.firstname} ${user.lastname} </li>`
    )
    .join(" ");
}
//funcion que recibe y renderiza los tados del usuario en el DOM
function renderUser(users) {
  const itemString = createUserItems(users);
  userList.innerHTML = itemString;
}

//funcion asincrona que solicita los datos del api
async function loadUsers() {
  const response = await fetch(
    "https://fakerapi.it/api/v1/users?_quantity=100"
  );
  return await response.json(); // convertimos los datos a json
}

//seleccionamos y guardamos en una variable el input del documento
const input = document.querySelector("#searchInput");

//escuchamos el evento de tecla del input, en el segundo filtramos informacion que coincida con lo ingresado en el input
input.addEventListener("keyup", (e) => {
  const listFiltered = listData.filter((list) =>
    `${list.firstname.toLowerCase()} ${list.lastname.toLowerCase()}`.includes(
      input.value.toLowerCase()
    )
  );
  renderUser(listFiltered);
});
