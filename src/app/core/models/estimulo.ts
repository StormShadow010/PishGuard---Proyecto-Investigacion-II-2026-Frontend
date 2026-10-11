export type Canal = 'correo' | 'sms';
export type Fase = 'pre' | 'intervencion' | 'post';
export type Opcion = 'phishing' | 'legitimo' | 'no_seguro';

export interface Estimulo {
  id: string;
  canal: Canal;
  fase: Fase;
  remitente: string;
  asunto?: string; // solo correo
  cuerpo: string;
  enlace?: string; // texto visible del enlace
}
