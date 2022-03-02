import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Country } from '../../interfaces/pais.interface';

import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {
  pais!: Country;

  constructor(
    private activateRoute: ActivatedRoute, 
    private paisService: PaisService
  ) { }

  /* Nos vamos a suscribir a cualquier cambio del URL */
  ngOnInit(): void {
    /* Primera Forma */
    /* this.activateRoute.params
        .subscribe(({ id }) => {
          console.log(`El ID del país es: ${id}`);

          // /* Aqui hacemos otro observable para traer la información del país
          this.paisService.getPaisPorCode(id)
              .subscribe(pais => {
                console.log(pais);
              })
        }) */

      /* Segunda Forma - Usando operadores RxJs */
      this.activateRoute.params
          /* switchMap - Devuelve un observable dentro de un observable */
          .pipe(
            switchMap((param) => this.paisService.getPaisPorCode(param.id)),
            // tap(console.log)
          )
          .subscribe(pais => this.pais = pais);  
  }

}
