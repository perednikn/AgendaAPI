const usuarioCard = $("#usuarioCards");
const pagination = $("#navPagina");
const btnVerTodos = $("#btnVerTodos");
const btnVerId = $("#btnVerId");
const divVerTodos = $("#verTodos");
const botoneraId = $("#botoneraId");
const btnId = $(".radioId")
const cardInfoId = $("#infoId");
const btnVolver = $("#btnVolver");
const divCrear = $("#crear");
const btnCrear = $("#btnCrear");
const divBienvenida = $("#principal");
const btnHome = $("#btnHome");
const mailCreaUser = $("#mailCreaUser");

let URLJSON = "https://reqres.in/api/users?page=";
let listadoCiudades = [];
let nuevoRegistro = [];
let contenidoGeneral = []
let URLbyId = "https://reqres.in/api/users/";
let btnDisabled = "";

btnVerTodos.click(mostrarTodos);
btnVerId.click(mostrarID);
$("#btnHome").click(muestroHome);
btnCrear.click(muestraFormRegistro);



//método al cargar la web
$(document).ready(()=> {  
    divVerTodos.css('display', 'none');
   $("#verId").css('display', 'none');
});



//método GET usando parámetro ID para obtener información de un contacto
function muestroContacto(idElegido){
    let URLconId = URLbyId + idElegido

    $.getJSON(URLconId, (response, status)=> {
        if (status === "success") {
            let usuarioID = response.data;
            
            let tarjetaUsuario = 
            `<div class="card cardID" style='width: 18rem;'>
            <img src="${usuarioID.avatar}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${usuarioID.first_name} ${usuarioID.last_name}</h5>
            <p class="card-text">${usuarioID.email}</p>
            <a href="#" class="btn btn-primary">Contactame</a>
            </div>
        </div>
        `
            
        $("#infoId").html(tarjetaUsuario);

        //Habilita el botón de UserID que estaba inhabilitado
            $(btnDisabled).removeClass("disabled");

        //Inhabilita el botón del UserID que está mostrando en pantalla
             btnDisabled = "#btn" + idElegido;
            $(btnDisabled).addClass("disabled");
        }

    }

    )};

//Muestra div con buttons para elegir contacto por ID
function mostrarID(){
    divBienvenida.css('display', 'none');
    $("#verId").css('display', '');
    //agrega al div par botonera; info de usuario y btnVolver
    $("#verId").html(`<div class="row" id="botoneraId"></div>
                      <div class="row" id="infoId"> </div>
                       `);


    $("#divId").append(`<div class="container botoneraHome">
    <button type="submit" class="btn btn-success" id="btnHome" onClick="muestroHome()">HOME</button>
  </div>`);
    $("#verId").show();
  CargaOpcionesId();
   $("#banner").html(`<h2>Elegí un ID para ver la información almacenada</h2>`);
   $("#divId").show()
}


//Muestra 12 botones para seleccionar usuario
function CargaOpcionesId(){
    for (let i = 1; i < 12; i++){
        $("#botoneraId").append(`<button type="button" class="btn btn-info btnOpcionId" id="btn${i}" onClick="muestroContacto(${i})">#${i}</button>`)
    }
}

//Muestra div con todos los contactos y pagination 
function mostrarTodos(){
    userPagina(1);
    divBienvenida.css('display', 'none');
    divVerTodos.css('display', '');
    $("body").css("overflow-y", "scroll");
    $("#banner").html(`<h2>Estos son todos mis contactos</h2>`)
}

//Carga usuarios por página
function userPagina(nroPage){
    URLJSON = "https://reqres.in/api/users?page=";
       URLJSON += nroPage;
       debugger;
            $.getJSON(URLJSON, (response, status)=> {
                if (status === "success") {
                    let listadoUsuarios = response.data;
                    console.log(listadoUsuarios);
                    contenidoGeneral = listadoUsuarios;
                    usuarioCard.html("");
                    for (const usuario of contenidoGeneral) {
                            
                        let tarjetaUsuario = 
                        `<div class="card cardVerTodos" style='width: 18rem;'>
                        <img src="${usuario.avatar}" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${usuario.first_name} ${usuario.last_name}</h5>
                        <p class="card-text">${usuario.email}</p>
                        <a href="#" class="btn btn-primary">Contactame</a>
                        </div>
                    </div>
                    `
                        
                        usuarioCard.append(tarjetaUsuario);
                       
                        }
  
                        $("#divHome").html(`
                            <div class="container botoneraHome">
                            <button type="submit" class="btn btn-success" id="btnHome" onClick="muestroHome()">HOME</button>
                            </div>`);

                }
                
            })
        
   
}



//Muestra Form para crear registro
function muestraFormRegistro(){
    divCrear.show();
    divBienvenida.css('display', 'none');
    divCrear.html(`
    <div class="container formCreaUser">
        <div class="container datosForm">
            <div class="mb-3">
                <label for="nombreCreaUser" class="form-label">Nombre y Apellido</label>
                <input type="text" class="form-control" id="nombreCreaUser" placeholder="Nicolás Perednik">
            </div>
            <div class="mb-3">
                <label for="mailCreaUser" class="form-label">Email</label>
                <input type="email" class="form-control" id="mailCreaUser" placeholder="perednikn@gmail.com ">
            </div>
        </div>
        <div class="container botoneraForm">
            <button type="submit" class="btn btn-success" id="btnCrearUser" onClick="creaUsuario()">Crear Usuario</button>
            <button type="reset" class="btn btn-danger" id="btnLimpiarForm" onClick="limpiaForm()">Limpiar Formulario</button>
        </div>

    </div>

    <div class="container botoneraHome">
        <button type="submit" class="btn btn-success" id="btnHome" onClick="muestroHome()">HOME</button>
    </div>


    `); 
    divCrear.css("overflow", "hidden");
    $("#banner").html(`<h2>Completá los datos de tu nuevo contacto</h2>`);

    

    
}


//Oculta todos los div's, muestra botonera home
function muestroHome(){
    divVerTodos.css('display', 'none');
    $("#divId").css('display', 'none');
    divCrear.hide();
    divBienvenida.css('display', '');
    $("body").css("overflow", "hidden");
    $("#banner").html(`<h2> Mi Agenda v1.0</h2>`);
   

};

//Crea usuario vía método POST
function creaUsuario(){
    if ($("#nombreCreaUser").val() != "" && $("#mailCreaUser").val() != ""){
        $.ajax({
            url: "https://reqres.in/api/users",
            type: "POST",
            data: {
                name: $("#nombreCreaUser").val(),
                mail: $("#mailCreaUser").val()
            },
            success: function (response) {
                
                let nuevoId = response.id;
                              
                divCrear.html(`   
                <div class="container formCreaUser">
                <div class="container divRegistroExitoso">
                
                <p> El contacto ${$("#nombreCreaUser").val()} ha sido agendado con el ID número #${nuevoId}</p>
                </div>  
                </div>
        
                <div class="container botoneraHome">
                    <button type="submit" class="btn btn-success" id="btnHome" onClick="muestroHome()">HOME</button>
                </div>
                
                `);
                console.log(nuevoId);
                
                limpiaForm()

            },
            error: function (response) {

                divCrear.html(`   
                <div class="container formCreaUser">
                <div class="container divRegistroExitoso">
                
                <p> El contacto ${$("#nombreCreaUser").val()} no ha podido ser creado. Intente nuevamente. Gracias</p>
                </div>  
                </div>
        
                <div class="container botoneraHome">
                    <button type="submit" class="btn btn-success" id="btnHome" onClick="muestroHome()">HOME</button>
                </div>
                
                `);
            }
        });
    }else{
        alert("Completá todos los datos para crear el usuario");
    }

}

//Limpia Formulario de nuevo Usuario
function limpiaForm(){
    $("#nombreCreaUser").val("");
    $("#mailCreaUser").val("");
  
}