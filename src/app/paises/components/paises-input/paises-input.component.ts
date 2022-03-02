import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'

@Component({
  selector: 'app-paises-input',
  templateUrl: './paises-input.component.html'
})
export class PaisesInputComponent implements OnInit {
  /* Emite el evento enter cuando escribe en el input */
  @Output() onEnter: EventEmitter<string> = new EventEmitter();

  /* Emite el evento cuando el usuario deja de escribir en el input */
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  
  @Input() placeholder: string = '';

  /* Es un observable */
  debouncer: Subject<string> = new Subject();

  termino: string = '';

  /* Se dispara una sola vez cuando el componente es creado */
  ngOnInit() {
    /* El suscribe no se emite hasta el el debounce deje de emitir valor por 300ms */
    this.debouncer
        .pipe(debounceTime(300))
        .subscribe(valor => {
          this.onDebounce.emit(valor);
        });
  }

  buscar() {
    this.onEnter.emit(this.termino);
    this.debouncer.subscribe
  }

  teclaPresionada() {
    this.debouncer.next(this.termino);
  }
}
