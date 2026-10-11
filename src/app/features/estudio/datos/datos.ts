import { Component, afterNextRender, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-datos',
  imports: [FormsModule],
  templateUrl: './datos.html',
  styleUrl: './datos.css',
})
export class Datos {
  private router = inject(Router);
  private api = inject(ApiService);

  programas = [
    'Ingeniería de Sistemas',
    'Ingeniería Electromecánica',
    'Ingeniería Mecatrónica',
    'Otro',
  ];
  programa = '';
  semestre: number | null = null;
  area: boolean | null = null;

  enviando = signal(false);
  error = signal(false);

  constructor() {
    afterNextRender(() => {
      if (sessionStorage.getItem('sesionId')) this.router.navigateByUrl('/estudio/ensayo');
      else if (!sessionStorage.getItem('consentimiento')) this.router.navigateByUrl('/estudio');
    });
  }

  get valido() {
    return (
      this.programa !== '' &&
      this.semestre !== null &&
      this.semestre >= 1 &&
      this.semestre <= 12 &&
      this.area !== null
    );
  }

  async enviar() {
    if (!this.valido || this.enviando()) return;
    this.enviando.set(true);
    this.error.set(false);
    try {
      const { sesionId } = await this.api.crearSesion({
        programa: this.programa,
        semestre: this.semestre!,
        areaTecnologica: this.area!,
        consentimiento: true,
      });
      sessionStorage.setItem('sesionId', sesionId);
      this.router.navigateByUrl('/estudio/instrucciones');
    } catch {
      this.error.set(true);
      this.enviando.set(false);
    }
  }
}
