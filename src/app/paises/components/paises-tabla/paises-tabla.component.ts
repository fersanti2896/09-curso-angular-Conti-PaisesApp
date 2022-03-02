import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-paises-tabla',
  templateUrl: './paises-tabla.component.html'
})
export class PaisesTablaComponent {
  @Input() paises: Country[] = [];

}
