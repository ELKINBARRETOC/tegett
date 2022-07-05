import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'edad'
})
export class EdadPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    
    let fecha_nacimiento = new Date(value);
    let fecha_actual = new Date();

    let diferencia = (fecha_actual.getTime()-fecha_nacimiento.getTime())/(1000 * 3600 * 24 * 365);
    
    return Math.floor(diferencia);
  }

}
