import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [`
    button {
      margin-right: 5px;
      margin-top: 5px;
    }
  `
  ]
})
export class PorRegionComponent {
  regiones: string[] = ['EU', 'EFTA', 'CARICOM', 'PA', 'AU', 'USAN', 'EEU', 'AL', 'ASEAN', 'CAIS', 'CEFTA', 'NAFTA', 'SAARC'];
  regionActiva: string = '';
  paises: Country[] = [];

  constructor(private paisService: PaisService) { }

  getClaseCSS(region: string): string {
    return (region === this.regionActiva) ? 'btn btn-primary' : 'btn btn-outline-primary'
  }

  activarRegion(region: string) {
    /* La condicion evita que se refresque los datos al tocar el botón */
    if(region ==  this.regionActiva) { return; }
    this.regionActiva = region;
    this.paises = [];

    // Hacer el llamado al servicio
    this.paisService.buscarRegion(region)
        .subscribe(region => {
          console.log(region);
          this.paises = region;
        }, err => {
          this.paises = [];
        })
  }
}
