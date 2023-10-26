// Variables
const formulario = document.querySelector("#formulario");
const tituloForm = document.querySelector("#titulo-formulario");
const task = document.querySelector(".tareas")
const total = document.querySelector("#total")
const completadas = document.querySelector("#completadas")
let tareas = [];


// Eventos
function Eventos() {
  formulario.addEventListener("submit", validarFormulario);
  task.addEventListener("click",eliminarTarea)
  task.addEventListener("click",tareaCompletada)
}

// Llamar a la función Eventos para configurar el evento de envío del formulario
Eventos();

// Funciones
function validarFormulario(e) {
  e.preventDefault();

  // Validar los datos
  const tarea = document.querySelector("#tarea").value;
  if (!tarea.trim()) {
    tituloForm.textContent = 'Formulario Vacío';
    setTimeout(() => {
      tituloForm.textContent = 'Formulario';
    }, 2000);
    return;
  }

  // Crear un objeto
  const objTarea = {
    id: Date.now(),
    tarea: tarea,
    estado: false
  }

 tareas =[...tareas,objTarea];
 
  formulario.reset();
  mostrarHtml();

}


function mostrarHtml(){

    task.innerHTML = '';

    if(tareas.length === 0 ){
        const mensaje = document.createElement("h5");
        mensaje.textContent = "~SIN TAREAS~"
        return
    }

    tareas.forEach( (item) =>{
        const itemTarea = document.createElement("div");
        itemTarea.classList.add("item-tarea")
        itemTarea.innerHTML = `
         ${item.estado ? (
            `<p class="completa">${item.tarea}</p> `
          ) : (
            `<p> ${item.tarea}</p>`
          ) }
        <div class="botones">
            <button data-id="${item.id}" class="eliminar">X</button>
            <button data-id="${item.id}" class="completada">✓</button>

        </div>
        `;
        task.appendChild(itemTarea) 
    })

      //Mostrar datos totales y completados

      const totalTareas = tareas.length;
      total.textContent = `Total tareas: ${totalTareas}`;
      const tareasCompletadas = tareas.filter(item => item.estado === true).length;
      completadas.textContent = `Tareas completadas: ${tareasCompletadas}`;

}

//Eliminar Tarea

function eliminarTarea(e){
    if (e.target.classList.contains("eliminar")){
      const tareaId = Number(e.target.getAttribute("data-id"))
      //Eliminar tarea

      const newTask = tareas.filter( (item) => item.id !==tareaId );
      tareas = newTask;
      mostrarHtml()

    }
}

function tareaCompletada(e) {
  if (e.target.classList.contains("completada")) {
    const tareaId = Number(e.target.getAttribute("data-id"));

    // Tarea completada
    const newTask = tareas.map((item) => {
      if (item.id === tareaId) {
        item.estado = !item.estado;
      }
      return item;
    });

    mostrarHtml()
    }
}