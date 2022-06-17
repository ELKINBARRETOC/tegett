import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

// Importar mis componentes
import { EmpleadosComponent } from './componentes/empleados/empleados.component';
import { HomeComponent } from './componentes/home/home.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';

// Importar archivo de rutas
import { APP_ROUTING } from './routes/routes.module';

// Importar servicio EmpleadosService
import { EmpleadosService } from './servicios/empleados.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpleadoComponent } from './componentes/empleado/empleado.component';

@NgModule({
  declarations: [
    AppComponent,
    EmpleadosComponent,
    HomeComponent,
    NavbarComponent,
    EmpleadoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule, 
    APP_ROUTING
  ],
  providers: [EmpleadosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
