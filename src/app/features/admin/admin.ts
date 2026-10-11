import { HttpClient } from '@angular/common/http';
import { Component, afterNextRender, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

interface Fila {
  sesion_id: string;
  programa: string;
  estimulo_id: string;
  fase: string;
  tipo: string;
  opcion: string;
  correcta: boolean;
  latencia_ms: number;
  servidor_ms: number;
  respondido_en: string;
}

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  private http = inject(HttpClient);
  private clave = '';

  dentro = signal(false);
  error = signal('');
  resumen = signal({ sesiones: 0, completas: 0 });
  filas = signal<Fila[]>([]);

  constructor() {
    afterNextRender(() => {
      const guardada = sessionStorage.getItem('adminKey');
      if (guardada) this.entrar(guardada);
    });
  }

  private cabeceras() {
    return { headers: { 'x-admin-key': this.clave } };
  }

  async entrar(clave: string) {
    this.clave = clave.trim();
    this.error.set('');
    try {
      await this.cargar();
      sessionStorage.setItem('adminKey', this.clave);
      this.dentro.set(true);
    } catch {
      sessionStorage.removeItem('adminKey');
      this.dentro.set(false);
      this.error.set('Clave incorrecta o servidor no disponible.');
    }
  }

  async cargar() {
    const res = await firstValueFrom(
      this.http.get<{ resumen: { sesiones: number; completas: number }; filas: Fila[] }>(
        `${environment.apiUrl}/admin/respuestas`,
        this.cabeceras(),
      ),
    );
    this.resumen.set(res.resumen);
    this.filas.set(res.filas);
  }

  async exportar() {
    const blob = await firstValueFrom(
      this.http.get(`${environment.apiUrl}/admin/export.csv`, {
        ...this.cabeceras(),
        responseType: 'blob',
      }),
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'phishguard-respuestas.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
}
