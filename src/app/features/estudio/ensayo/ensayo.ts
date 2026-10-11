import { Component, afterNextRender, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, ResultadoRespuesta, Siguiente } from '../../../core/api.service';
import { Opcion } from '../../../core/models/estimulo';

@Component({
  selector: 'app-ensayo',
  imports: [],
  templateUrl: './ensayo.html',
  styleUrl: './ensayo.css',
})
export class Ensayo {
  private router = inject(Router);
  private api = inject(ApiService);
  private sesionId = '';
  private inicio = 0;
  feedback = signal<ResultadoRespuesta | null>(null);
  transicion = signal<'intervencion' | 'post' | null>(null);

  ensayo = signal<Siguiente | null>(null);
  listo = signal(false);
  error = signal(false);

  constructor() {
    afterNextRender(() => this.iniciar());
  }

  private async iniciar() {
    const id = sessionStorage.getItem('sesionId');
    if (!id) {
      this.router.navigateByUrl('/estudio');
      return;
    }
    this.sesionId = id;
    try {
      await this.cargarSiguiente();
    } catch {
      this.error.set(true);
    }
  }
  private async cargarSiguiente() {
    this.listo.set(false);
    const res = await this.api.siguiente(this.sesionId);
    if (res.fin) {
      this.router.navigateByUrl('/estudio/fin');
      return;
    }
    this.ensayo.set(res);
    // El cronómetro arranca cuando el estímulo ya está pintado
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        this.inicio = performance.now();
        this.listo.set(true);
      }),
    );
  }

  async responder(opcion: Opcion) {
    if (!this.listo()) return;
    const latenciaMs = Math.round(performance.now() - this.inicio);
    this.listo.set(false);

    try {
      const res = await this.api.responder(this.ensayo()!.ensayoId!, opcion, latenciaMs);
      if (res.feedback) this.feedback.set(res);
      else await this.avanzar(res);
    } catch {
      this.error.set(true);
    }
  }

  // Botón "Siguiente" de la retroalimentación
  async continuar() {
    const res = this.feedback()!;
    this.feedback.set(null);
    await this.avanzar(res);
  }

  // Botón "Continuar" del aviso de cambio de fase
  async seguir() {
    this.transicion.set(null);
    await this.cargar();
  }

  private async avanzar(res: ResultadoRespuesta) {
    if (res.cambioFase) this.transicion.set(res.cambioFase);
    else await this.cargar();
  }

  private async cargar() {
    try {
      await this.cargarSiguiente();
    } catch {
      this.error.set(true);
    }
  }
}
