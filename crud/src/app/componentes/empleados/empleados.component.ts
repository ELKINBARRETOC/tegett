import { Component, OnInit } from '@angular/core';

// Importar Servicio Empleados
import { EmpleadosService } from '../../servicios/empleados.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
})
export class EmpleadosComponent implements OnInit {

  public empleados: any[] = [];

  public cargando = true;

  constructor(private empleadosServicio: EmpleadosService) {}

  ngOnInit() {
    this.empleadosServicio.getEmpleados().subscribe((empleados:any) => {
      this.cargando = false;
      console.log(empleados);
      this.empleados = empleados;
    });
  }
}
