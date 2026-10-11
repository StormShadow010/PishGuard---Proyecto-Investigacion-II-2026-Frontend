import { Component, afterNextRender, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instrucciones',
  imports: [],
  templateUrl: './instrucciones.html',
  styleUrl: './instrucciones.css',
})
export class Instrucciones {
  private router = inject(Router);
  practicado = signal(false);

  constructor() {
    afterNextRender(() => {
      if (!sessionStorage.getItem('sesionId')) this.router.navigateByUrl('/estudio');
    });
  }

  comenzar() {
    this.router.navigateByUrl('/estudio/ensayo');
  }
}
