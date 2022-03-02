import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
    li {
      cursor: pointer;
    }
  `
  ]
})
export class PorPaisComponent{
  termino: string = '';
  valError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSug: boolean = false;

  /* Inyectamos nuestro servicio */
  constructor(private paisService: PaisService) { }

  buscar(termino: string) {
    this.mostrarSug = false
    this.valError = false;
    this.termino = termino;

    this.paisService.buscarPais(termino)
        .subscribe((paises) => {
          // console.log(paises);
          this.paises = paises;
        }, (err) => {
          this.valError = true;
          this.paises = [];
        });
  }

  sugerencias(termino: string) {
    this.valError = false;
    this.termino = termino;
    this.mostrarSug = true;

    this.paisService.buscarPais(termino)
        .subscribe(
          paises => this.paisesSugeridos = paises.splice(0,5),
          err => this.paisesSugeridos = []
        );
  }

  buscarSugerido(termino: string) {
    this.buscar(termino);
  }
}
