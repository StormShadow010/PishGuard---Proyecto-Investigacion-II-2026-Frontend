import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { Estimulo, Opcion } from './models/estimulo';

export interface Siguiente {
  fin: boolean;
  ensayoId?: string;
  posicion?: number;
  total?: number;
  estimulo?: Estimulo;
}

export interface ResultadoRespuesta {
  correcta?: boolean;
  tipo?: 'phishing' | 'legitimo';
  feedback?: string;
  cambioFase?: 'intervencion' | 'post' | null;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private url = environment.apiUrl;

  crearSesion(datos: {
    programa: string;
    semestre: number;
    areaTecnologica: boolean;
    consentimiento: true;
  }) {
    return firstValueFrom(this.http.post<{ sesionId: string }>(`${this.url}/sesiones`, datos));
  }

  siguiente(sesionId: string) {
    return firstValueFrom(this.http.get<Siguiente>(`${this.url}/sesiones/${sesionId}/siguiente`));
  }

  responder(ensayoId: string, opcion: Opcion, latenciaMs: number) {
    return firstValueFrom(
      this.http.post<ResultadoRespuesta>(`${this.url}/respuestas`, {
        ensayoId,
        opcion,
        latenciaMs,
      }),
    );
  }
}
