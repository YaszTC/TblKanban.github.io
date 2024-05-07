const tarea = {
    id: "",
    nombre: "",
    descripcion: "",
    responsable: "",
};

let Editando = false;
let Valido = false;

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    event.currentTarget.appendChild(document.getElementById(data));
}

function crearTarea(event) {
    event.preventDefault();
    validarCampos(
        document.getElementById("tarea-nombre").value,
        document.getElementById("tarea-descripcion").value
    );
    if (Valido) {
        if (Editando) {
            const divTarea = document.getElementById(tarea.id);
            divTarea.childNodes[0].textContent = document.getElementById("tarea-nombre").value;
            divTarea.childNodes[1].textContent = document.getElementById("tarea-descripcion").value;
            divTarea.childNodes[2].textContent = document.getElementById("tarea-responsable").value;

            const btnEditar = document.getElementById("btn-crear-editar");
            btnEditar.value = "Crear Tarea";
            btnEditar.classList.remove("btn-editar");
            btnEditar.classList.add("btn-crear");
        } else {
            tarea.nombre = document.getElementById("tarea-nombre").value;
            tarea.descripcion = document.getElementById("tarea-descripcion").value;
            tarea.responsable = document.getElementById("tarea-responsable").value;

            registrarTarea();
        }
    }
    limpiarCampos();
    limpiarObj();
}

function limpiarCampos() {
    document.getElementById("tarea-nombre").value = '';
    document.getElementById("tarea-descripcion").value = '';
    document.getElementById("tarea-responsable").value = '';
}

function limpiarObj() {
    tarea.id = '';
    tarea.nombre = '';
    tarea.descripcion = '';
    tarea.responsable = '';
}

function validarCampos(nombre, descripcion) {
    if (nombre === "" || descripcion === "") {
        alert("Debes asignar el nombre y la descripcion de la tarea");
        Valido = false;
    } else {
        Valido = true;
    }
}

function registrarTarea() {
    tarea.id = new Date().getTime();
    const pendientes = document.getElementById("pendientes");

    const divTarea = document.createElement("div");

    divTarea.classList.add("tarea");
    divTarea.setAttribute("id", tarea.id);
    divTarea.setAttribute("draggable", true);
    divTarea.setAttribute("ondragstart", "drag(event)");

    const ParrafoNombre = document.createElement("p");
    ParrafoNombre.setAttribute("id", "nombre");
    ParrafoNombre.textContent = tarea.nombre;

    const ParrafoDescripcion = document.createElement("p");
    ParrafoDescripcion.setAttribute("id", "descripcion");
    ParrafoDescripcion.textContent = tarea.descripcion;

    const ParrafoResponsable = document.createElement("p");
    ParrafoResponsable.setAttribute("id", "responsable");
    ParrafoResponsable.textContent = tarea.responsable;

    const inputEditar = document.createElement("input");
    inputEditar.classList.add("btn-crear");
    inputEditar.setAttribute("type", "submit");
    inputEditar.value = "Editar";
    inputEditar.onclick = function () {
        Editando = true;
        tarea.id = divTarea.getAttribute("id");
        tarea.nombre = ParrafoNombre.textContent;
        tarea.descripcion = ParrafoDescripcion.textContent;
        tarea.responsable = ParrafoResponsable.textContent;
        editarTarea();
    };

    const inputBorrar = document.createElement("input");
    inputBorrar.classList.add("btn-borrar");
    inputBorrar.setAttribute("type", "submit");
    inputBorrar.value = "Borrar";
    inputBorrar.onclick = function () {
        localStorage.removeItem(tarea.id);
        divTarea.remove();
    };

    divTarea.appendChild(ParrafoNombre);
    divTarea.appendChild(ParrafoDescripcion);
    divTarea.appendChild(ParrafoResponsable);
    divTarea.appendChild(inputEditar);
    divTarea.appendChild(inputBorrar);
    pendientes.appendChild(divTarea);

    // Almacenar los datos en localStorage
    localStorage.setItem(tarea.id, JSON.stringify(tarea));
}

function editarTarea() {
    const btnEditar = document.getElementById("btn-crear-editar");
    btnEditar.value = "Editar Tarea";
    btnEditar.classList.remove("btn-crear");
    btnEditar.classList.add("btn-editar");

    document.getElementById("tarea-nombre").value = tarea.nombre;
    document.getElementById("tarea-descripcion").value = tarea.descripcion;
    document.getElementById("tarea-responsable").value = tarea.responsable;
}
// Función para mostrar las tareas almacenadas en localStorage cuando la página se carga
window.onload = function() {
    // Recuperar y mostrar todas las tareas almacenadas en localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));
        console.log("Clave:", key, "Valor:", value);
        
        // Crear la tarea con los datos recuperados
        tarea.id = value.id;
        tarea.nombre = value.nombre;
        tarea.descripcion = value.descripcion;
        tarea.responsable = value.responsable;
        mostrarTarea(tarea);
    }
}

// Función para mostrar una tarea en el HTML
function mostrarTarea(tarea) {
    const pendientes = document.getElementById("pendientes");

    const divTarea = document.createElement("div");

    divTarea.classList.add("tarea");
    divTarea.setAttribute("id", tarea.id);
    divTarea.setAttribute("draggable", true);
    divTarea.setAttribute("ondragstart", "drag(event)");

    const ParrafoNombre = document.createElement("p");
    ParrafoNombre.setAttribute("id", "nombre");
    ParrafoNombre.textContent = tarea.nombre;

    const ParrafoDescripcion = document.createElement("p");
    ParrafoDescripcion.setAttribute("id", "descripcion");
    ParrafoDescripcion.textContent = tarea.descripcion;

    const ParrafoResponsable = document.createElement("p");
    ParrafoResponsable.setAttribute("id", "responsable");
    ParrafoResponsable.textContent = tarea.responsable;

    const inputEditar = document.createElement("input");
    inputEditar.classList.add("btn-crear");
    inputEditar.setAttribute("type", "submit");
    inputEditar.value = "Editar";
    inputEditar.onclick = function () {
        Editando = true;
        tarea.id = divTarea.getAttribute("id");
        tarea.nombre = ParrafoNombre.textContent;
        tarea.descripcion = ParrafoDescripcion.textContent;
        tarea.responsable = ParrafoResponsable.textContent;
        editarTarea();
    };

    const inputBorrar = document.createElement("input");
    inputBorrar.classList.add("btn-borrar");
    inputBorrar.setAttribute("type", "submit");
    inputBorrar.value = "Borrar";
    inputBorrar.onclick = function () {
        localStorage.removeItem(tarea.id);
        divTarea.remove();
    };

    divTarea.appendChild(ParrafoNombre);
    divTarea.appendChild(ParrafoDescripcion);
    divTarea.appendChild(ParrafoResponsable);
    divTarea.appendChild(inputEditar);
    divTarea.appendChild(inputBorrar);
    pendientes.appendChild(divTarea);
}
