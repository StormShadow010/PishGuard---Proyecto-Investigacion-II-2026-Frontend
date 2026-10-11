import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consentimiento',
  imports: [],
  templateUrl: './consentimiento.html',
  styleUrl: './consentimiento.css',
})
export class Consentimiento {
  private router = inject(Router);
  acepta = signal(false);

  marcar(evento: Event) {
    this.acepta.set((evento.target as HTMLInputElement).checked);
  }

  continuar() {
    sessionStorage.setItem('consentimiento', '1');
    this.router.navigateByUrl('/estudio/datos');
  }
}
