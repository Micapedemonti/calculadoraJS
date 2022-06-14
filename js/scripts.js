//VARIABLES

let abonoTotal = document.getElementById("total");
let propinasDivPersonas=document.getElementById("prop_persona")
let mensajePropina="";
let btn=document.getElementById("btn");
let dolar=document.getElementById("dolar");
let pesoArgentino=document.getElementById("pesoArg")
let dolarPrecio=1;
let pesoArgen= 1;
let botonRegalo=document.getElementById("obsequioBoton");

const propinas= document.getElementById("propIng");
const personas = document.getElementById("divProp");
const mensAbono=document.getElementById("mensAbono");
const resultado=document.getElementById("total_persona");
const textoPer=document.getElementById("texto");
const CalculadoraArray=[]
const popup=document.querySelector("#popup-mensaje");



// CLASES
class Calculadora{
    constructor(abonoTotal,propinas, personas, propinasDivPersonas,resultado){
      this.abonoTotal=abonoTotal,
      this.propinas=propinas,
      this.personas=personas,
      this.resultadoUno=propinasDivPersonas,
      this.resultadoDos=resultado;
    }
}    

//FUNCION PARA LOS CALCULOS
function calculos(){
    let calculoPropina=(abonoTotal.value*propinas.value)/100
    propinasDivPersonas.value=Math.round((calculoPropina/personas.value ) /dolarPrecio);
}

function SDS(){
    resultado.value= Math.round((( parseInt (abonoTotal.value) / parseInt (personas.value)) + parseInt (propinasDivPersonas.value))/ dolarPrecio);
    arrayCalculadora();
}
function mensaje(mensajePropina){
    mensAbono.innerText=mensajePropina
}
function resetear() {
    document.getElementById("formulario").reset();
  }

// FUNCIONES PARA INGRESAR ABONO TOTAL
  function montoMenor(){
    abonoTotal.classList.add("noOk");
    abonoTotal.classList.remove("ok");
 mensajePropina="el monto no puede ser 0.00"
}

function montoMayor(){
    abonoTotal.classList.remove("noOk");
    abonoTotal.classList.add("ok");
   mensajePropina="el monto debe ser mayor a 10"  
}


// FUNCION EVENTO PARA EL INPUT DEL ABONO TOTAL CON OPERADOR TERNARIO
abonoTotal.addEventListener("input", function(){
    parseInt(abonoTotal.value )<10 ? montoMenor() : montoMayor();
    mensaje(mensajePropina); 
})
  //   FUNCIONES DEL CLICK USD Y CLICK ARG
function clickDolar(){
         dolarPrecio= 106;
     calculos(dolarPrecio);
    SDS(dolarPrecio);
 }
 function clickArg(){
dolarPrecio= 1;
  calculos(dolarPrecio);
  SDS(dolarPrecio);
 }
// FUNCION PARA CONVERTIR A USD CON OPERADOR TERNARIO
function convertir(){
  dolar.checked===true ? clickDolar():clickArg();
pesoArgentino.checked===true? clickArg():clickDolar();
}

// FUNCION DEL ARRAY DE LA CLASE 
function arrayCalculadora(){
 CalculadoraArray.push(new Calculadora( abonoTotal.value,propinas.value,personas.value, propinasDivPersonas.value, resultado.value))
 // SE HIZO UN LOCAL STORAGE DONDE SE GUARDARAN LOS REGISTROS DE LOS GASTOS DEL USUARIO EN NUESTRA APLICACION WEB.
 localStorage.setItem("registroDePagos", JSON.stringify(CalculadoraArray) );
 
}
 // EVENTO PARA ACTIVAR MENSAJE MONTO 
 abonoTotal.addEventListener("input", function(){
  if (parseInt(abonoTotal.value )<10 ){
      abonoTotal.classList.add("noOk");
      abonoTotal.classList.remove("ok");
   mensajePropina="el monto no puede ser 0.00"
   }else {
      abonoTotal.classList.remove("noOk");
      abonoTotal.classList.add("ok");
     mensajePropina="el monto debe ser mayor a 10"  
 }
  mensaje(mensajePropina);       
}
)

// Evento para seleccionar numero de personas
personas.oninput= ()=>{
  textoPer.innerHTML=personas.value
}

 
// EVENTOS DEL CLICK USD Y ARG

 dolar.addEventListener("click",function(){
   popup.classList.add("popup-active");

   setTimeout(()=>{
     popup.classList.remove("popup-active");
   },25000)

   clickDolar();
 })
 pesoArg.addEventListener("click",function(){
  clickArg()
  setTimeout(()=>{
    popup.classList.remove("popup-active");
  },0)

})
// EVENTO PARA RESETEAR CALCULOS
btn.addEventListener("click",function(resetear){
  calculos();
  SDS();
  convertir()
  resetear.preventDefault();

  })    
