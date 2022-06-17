import { Injectable } from '@angular/core';

//importar modulo HttpClient
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Empleado } from '../modelos/empleado.models';

@Injectable()
export class EmpleadosService {
  
  constructor(private http: HttpClient) {}

  // Metodo para obtener un Empleado a partir del id
  getEmpleado(id:number){

    return this.http.get(`http://api.ci.saludplusweb.com/Api/Empleados/Consulta/${id}`)
    
  }

  // Metodo para obtener todos los Empleados
  getEmpleados() {
    return this.http.get(
      'http://api.ci.saludplusweb.com/Api/Empleados/Listado'
    );
  }

  /*getEmpleados() {
    return this.http
      .get(
          'https://restcountries.com/v3.1/lang/spa'
      )
      .pipe(
        map((resp: any[]) => {
          return resp.map((pais) => ({
            nombre: pais.name.official,
            abreviatura: pais.cca2,
          }));
        })
      );
  }*/



  crearEmpleado(empleado:Empleado){
    
    //console.log("Solicitud recibida");

    return this.http.post('http://api.ci.saludplusweb.com/Api/Empleados/Crear', empleado );        
  }





  // Medodo para actualizar un empleado
  actualizarEmpleado(empleado:Empleado){

    return this.http.put('http://api.ci.saludplusweb.com/Api/Empleados/Actualizar', empleado )

  }


  // Metodo para eliminar un empleado
  eliminarEmpleado(id:number){

    return this.http.delete(`http://api.ci.saludplusweb.com/Api/Empleados/Eliminar?Id=${id}`);
  }


}
