let tareas = [];

let inputNombre = document.getElementById("nombre");
let inputApellido = document.getElementById("apellido");
let selectSexo = document.getElementById("sexo");
let inputEdad = document.getElementById("edad");
let inputTdp = document.getElementById("tdp");
let btn = document.getElementById("btn");
let list = document.getElementById("list");

const agregarTarea = () => {
    const nombre = inputNombre.value.trim();
    const apellido = inputApellido.value.trim();
    const sexo = selectSexo.value. trim();
    const edad = inputEdad.value.trim();
    const tdp = inputTdp.value.trim();

    if (nombre === "" || apellido === "" || sexo === "" || edad === "" || tdp === "") {
        alert("Completa todos los campos.");
        return;
    }
    
    const nuevaTarea = {
        nombre: nombre,
        apellido: apellido,
        sexo: sexo,
        edad: edad,
        tdp: tdp
    };
    
    tareas.push(nuevaTarea);
    guardartareasenlocalStorage();
    limpiarCampos();
    mostrarTareas();
};

const guardartareasenlocalStorage = () => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
};

const cargartareasdesdelocalStorage = () => {
    const tareasGuardadas = localStorage.getItem("tareas");
    if (tareasGuardadas) {
        tareas = JSON.parse(tareasGuardadas);
        mostrarTareas();
    }
};

const limpiarCampos = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    selectSexo.value = "";
    inputEdad.value = "";
    inputTdp.value = "";
};

const mostrarTareas = () => {
    list.innerHTML = "";
    console.clear();
    
    tareas.forEach((tarea, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
        <span>${tarea.nombre} ${tarea.apellido} ${tarea.sexo} ${tarea.edad} ${tarea.tdp}</span>
        <button class="delete" onclick="eliminarTarea(${index})">Eliminar</button>
        `;
        list.appendChild(listItem);
        console.log(`Tarea ${index + 1}: ${tarea.nombre} ${tarea.apellido}`);
    });
};

const eliminarTarea = (index) => {
    tareas.splice(index, 1);
    guardartareasenlocalStorage();
    mostrarTareas();
};

const init = () => {
    cargartareasdesdelocalStorage();
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
inputTdp.addEventListener("keydown", manejarTecla);

btn.addEventListener("click", agregarTarea);




// let pago8clases = 1600;
// let pago12clases = 1850;
// let paseLibre = 2200;
// let boxLibre = 2400;

// class Alumno {
//     constructor(Nombre, Apellido, tipodePase, asistioClase) {
//         this.Nombre = Nombre;
//         this.Apellido = Apellido;
//         this.tipodePase = tipodePase;
//         this.asistioClase = asistioClase;
//     }
// }

// function asistenciaClase(alumno) {
//     let asistencia = prompt("Asistio a clase?");
//     if (asistencia == "si") {
//         alumno.asistioClase = alumno.asistioClase + 1;
//         return alumno.asistioClase;
//     } else {
//         aalert(alumno.Nombre + " " + alumno.Apellido + " No asistió");
//         return alumno.asistioClase;
//     }
// }

// function nuevoAlumno() {
//     let Nombre = prompt("Ingrese su Nombre");
//     let Apellido = prompt("Ingrese su Apellido");
//     let tipodePase = prompt(
//         "Tipo de pase 8-clases, 12-Clases, Pase Libre, Open Box"
//     );
//     let asistioClaseAlumno = asistenciaClase(
//         new Alumno(Nombre, Apellido, tipodePase, 0)
//     );
//     return asistioClaseAlumno;
// }

// let asistenciasHoy = Number(prompt("Asistencias Totales hoy"));

// let i = 1;
// while (i <= asistenciasHoy) {
//     let asistioClaseAlumno = nuevoAlumno();
//     i++;
// }

// class Promocion {
//     constructor(nombrePromo, precioPromo) {
//         this.nombrePromo = precioPromo;
//         this.precioPromo = precioPromo;
//     }
// }

// const promociones = [];

// const promo1 = { nombrePromo: "pago8clases", precioPromo: 1600 };
// const promo2 = { nombrePromo: "pago12clases", precioPromo: 1600 };
// const promo3 = { nombrePromo: "paseLibre", precioPromo: 2200 };
// const promo4 = { nombrePromo: "boxLibre", precioPromo: 2400 };

// promociones.push(promo1, promo2, promo3, promo4);

// console.log(promociones);

// function altaPromocion() {
//     let nombre = prompt("Ingrese nombre de la Promocion");
//     let precio = pparseFloat(
//         prompt("Ingrese precio de la Promocion. Solo valores numericos")
//     );

//     const promocion = new Promocion(nombre, precio);
//     promociones.push(promocion);

//     return promocion;
// }

// function buscarAlumno(nombre) {
//     return alumnos.find((alumno) => alumno.Nombre == nombre);
// }
