import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {
  termino: string = '';
  valError: boolean = false;
  paises: Country[] = [];

  constructor(private paisService: PaisService) { }

  buscar(termino: string) {
    this.valError = false;
    this.termino = termino;

    this.paisService.buscarCapital(termino)
        .subscribe((capital) => {
          // console.log(capital);
          this.paises = capital;
        }, (err) => {
          this.valError = true;
          this.paises = [];
        })
  }
}
