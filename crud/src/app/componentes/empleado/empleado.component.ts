import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/modelos/empleado.models';
import { EmpleadosService } from 'src/app/servicios/empleados.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})

export class EmpleadoComponent implements OnInit {

  formulario  : FormGroup;
  public id   = "nuevo";
  public cargando = true;

  constructor(
    private fb:FormBuilder,
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private empleadosService:EmpleadosService
  ){ 
    
    this.formulario = this.crearFormulario();
    
  }
  



  ngOnInit(): void {
    
    //Obtenemos el :id recibido por parametro
    this.activatedRoute.params.subscribe((params) => {
      
      //console.log(params['id']);

      this.id = params['id'];

      //this.cargando = false;
      
      if(this.id ==='nuevo'){
        //console.log("formulario para empleado nuevo");
        this.cargando = false;
      }
      else{
        //console.log("formulario para empleado existente");
        
        // Deshabilitar cuadro de texto ID
        this.formulario.controls['id'].disable();

        //Obtenemos el empleado con :id recibido por parametro
        this.empleadosService.getEmpleado(Number(params['id'])).subscribe(resp=>{
          
          //console.log(resp);
          this.establecerFormulario(resp as Empleado);
          
          this.cargando = false;

        })
        
      }

    });

  }





  // Medodo para crear un formulario en blanco.
  crearFormulario(){
    return this.fb.group({
      //id      :   [{value:'', disabled:this.id!=='nuevo'},[Validators.required]],
      id      :   ['',[Validators.required]],
      cedula  :   ['',[Validators.required]],
      nombre  :   ['',[Validators.required]],
      apellido:   ['',[Validators.required]],
      //fechaNacimiento: ['',[Validators.required]],
      fechaNacimiento: [this.formatearFecha(),[Validators.required]],
      sexo    :   ['',[Validators.required]]
    });
  } 


  // Metodo para establecer los valores del formulario a partir de un Empleado recibido para 
  establecerFormulario(empleado:Empleado){
    //console.log(empleado);
    empleado.fechaNacimiento = this.formatearFecha(empleado.fechaNacimiento);
    this.formulario.setValue(empleado);
  }



  // formatear fecha formato yyyy-mm-dd
  formatearFecha(fecha?: string):string{
    
    let fn, anio, mes, dia;
    
    if(fecha){
      fn = new Date(fecha);
    }
    else{
      fn = new Date();
      
    }

    anio = fn.getFullYear();
    ((fn.getMonth()+1) <10)? mes = "0"+(fn.getMonth()+1) : mes = fn.getMonth()+1;
    dia = fn.getDate();
      
    return `${anio}-${mes}-${dia}`;
  }

  // Metodo para realizar enviar el formulario
  guardar(){
    
    // Si el formulario es v??lido
    if(this.formulario.valid){

      // Si formulario es para empleado nuevo
      if(this.id ==='nuevo'){

        console.log("Creando empleado....");
        
        this.empleadosService.crearEmpleado(this.formulario.value).subscribe({
          // Callback Exito
          next: (resp)=>{
            console.log("Empleado creado correctamente!");
            alert("Empleado creado correctamente!");
            this.formulario.reset();
          },
          //Callback Error
          error:(e)=>{
            console.log(e);
            alert("Error al crear empleado: "+e.message);
          }
        });
      }
      else{// Formulario para empleado existente
        console.log("Actualizando empleado...");
        //this.empleadosService.actualizarEmpleado(this.formulario.value).subscribe({
        this.empleadosService.actualizarEmpleado({
               fechaNacimiento : this.formulario.get('fechaNacimiento')?.value,
               id              : Number(this.formulario.get('id')?.value),
               nombre          : this.formulario.get('nombre')?.value,
               apellido        : this.formulario.get('apellido')?.value,
               cedula          : Number(this.formulario.get('cedula')?.value),
               sexo            : this.formulario.get('sexo')?.value
           }).subscribe({
              // Callback Exito
              next: (resp)=>{
                console.log("Empleado actualizado correctamente!");
                alert("Empleado acualizado correctamente!");
              },
              //Callback Error
              error:(e)=>{
                console.log(e.message)
                alert("Error al actualizar el Empleado:"+e);
              }
        });
      }
    }
  }


  // Metodo para eliminar un empleado
  eliminar(){

    if(this.id!=='nuevo'){

      let eliminar = confirm("??Eliminar?");

      if(eliminar){
        
        console.log('Eliminando empleado...');
        
        this.empleadosService.eliminarEmpleado(Number(this.id)).subscribe({
          // Callback Exito
          next:(resp)=>{
            alert("Empleado eliminado correctamente!");
            this.formulario.reset();
            this.router.navigate(['/empleados']);
          },
          // Callback Error
          error:(e)=>{console.log(e)}
  
        });
      }
    }
  }

  

  // Metodo para verificar si hay error
  get idInvalido(){
    return (this.formulario.get('id')?.invalid) && (this.formulario.get('id')?.touched)
  }

  // Metodo para verificar si hay error
  get cedulaInvalido(){
    return (this.formulario.get('cedula')?.invalid) && (this.formulario.get('cedula')?.touched)
  }

  // Metodo para verificar si hay error
  get nombreInvalido(){
    return (this.formulario.get('nombre')?.invalid) && (this.formulario.get('nombre')?.touched)
  }

  // Metodo para verificar si hay error
  get apellidoInvalido(){
    return (this.formulario.get('apellido')?.invalid) && (this.formulario.get('apellido')?.touched)
  }

  // Metodo para verificar si hay error
  get fechaNacimientoInvalido(){
    return (this.formulario.get('fechaNacimiento')?.invalid) && (this.formulario.get('fechaNacimiento')?.touched)
  }
  
  // Metodo para verificar si hay error
  get sexoInvalido(){
    return (this.formulario.get('sexo')?.invalid) && (this.formulario.get('sexo')?.touched)
  }
}
