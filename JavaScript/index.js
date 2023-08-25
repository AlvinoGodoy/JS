let tareas = [];

let inputNombre = document.getElementById("nombre");
let inputApellido = document.getElementById("apellido");
let selectSexo = document.getElementById("sexo");
let inputEdad = document.getElementById("edad");
let selectTdp = document.getElementById("tdp");
let btn = document.getElementById("btn");
let list = document.getElementById("list");
let alumnoContador = 0;

const agregarTarea = () => {
    const nombre = inputNombre.value.trim();
    const apellido = inputApellido.value.trim();
    const sexo = selectSexo.value;
    const edad = inputEdad.value.trim();
    const tdp = selectTdp.value.trim();

    if (nombre === "" || apellido === "" || sexo === "" || edad === "" || tdp === "") {
        swal("Campletar Campos", "Favor completa todos los campos", "error");
        return;
    }

    const tdpValue = parseFloat(selectTdp.value);
    if (isNaN(tdpValue) || tdpValue === 0) {
        swal("Campletar Campos", "Favor completa todos los campos", "error");
        return;
    }

    const nuevaTarea = {
        nombre: nombre,
        apellido: apellido,
        sexo: sexo,
        edad: edad,
        tdp: tdpValue
    };

    alumnoContador++;

    tareas.push(nuevaTarea);
    guardartareasenlocalStorage();
    limpiarCampos();
    mostrarTareas();

    guardartareasenlocalStorage()
        .then(() => {
            limpiarCampos();
            mostrarTareas();
        })
        .catch(error => {
            console.error("Error al guardar en el localStorage:", error);
        });
};

const guardartareasenlocalStorage = () => {
    return new Promise((resolve, reject) => {
        try {
            localStorage.setItem("tareas", JSON.stringify(tareas));
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

const cargartareasdesdelocalStorage = () => {
    return new Promise((resolve, reject) => {
        const tareasGuardadas = localStorage.getItem("tareas");
        if (tareasGuardadas) {
            tareas = JSON.parse(tareasGuardadas);
            mostrarTareas();
            resolve(tareas);
        } else {
            reject("No hay tareas guardadas");
        }
    });
};

const limpiarCampos = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    selectSexo.value = "";
    inputEdad.value = "";
    selectTdp.value = "";
};

const mostrarTareas = () => {
    list.innerHTML = "";
    let total = 0;
    console.clear();

    tareas.forEach((tarea, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
        <span>${tarea.nombre} ${tarea.apellido} ${tarea.sexo} ${tarea.edad} ${tarea.tdp}</span>
        <button class="delete" onclick="eliminarTarea(${index})">Eliminar</button>
        `;
        list.appendChild(listItem);
        total += tarea.tdp;
    });

    document.getElementById("contador").textContent = tareas.length;

    console.log(`Total: $${total}`);
};

const eliminarTarea = (index) => {
    swal({
        title: "Estás seguro?",
        text: "Esta acción eliminará la tarea, Deseas continuar?",
        icon: "warning",
        buttons: ["Cancelar", "Eliminar"],
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            tareas.splice(index, 1);
            guardartareasenlocalStorage();
            mostrarTareas();
            swal("Tarea eliminada", "La tarea ha sido eliminada exitosamente", "success");
            document.getElementById("contador").textContent = tareas.length;
        }
    });
};

const init = () => {
    fetchTareas()
        .then(() => mostrarTareas())
        .catch(error => console.error("Error al cargar tareas:", error));
};

const fetchTareas = () => {
    return new Promise((resolve, reject) => {
        try {
            const tareasGuardadas = localStorage.getItem("tareas");
            if (tareasGuardadas) {
                tareas = JSON.parse(tareasGuardadas);
                resolve();
            } else {
                reject("No hay tareas guardadas");
            }
        } catch (error) {
            reject(error);
        }
    });
};

const manejarTecla = (event) => {
    if (event.key === "Enter") {
        agregarTarea();
    }
};

inputNombre.addEventListener("keydown", manejarTecla);
inputApellido.addEventListener("keydown", manejarTecla);
selectSexo.addEventListener("keydown", manejarTecla);
inputEdad.addEventListener("keydown", manejarTecla);
selectTdp.addEventListener("keydown", manejarTecla);

btn.addEventListener("click", agregarTarea);


