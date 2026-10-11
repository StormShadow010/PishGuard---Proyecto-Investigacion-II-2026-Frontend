import { Estimulo } from '../../../core/models/estimulo';

export const ESTIMULOS_MOCK: Estimulo[] = [
  {
    id: 'E01',
    canal: 'correo',
    fase: 'pre',
    remitente: 'Banco Andino <seguridad@banco-andino-verificacion.co>',
    asunto: 'Tu cuenta será suspendida en 24 horas',
    cuerpo:
      'Detectamos un acceso inusual. Para evitar el bloqueo de tu cuenta, confirma tus datos de inmediato.',
    enlace: 'https://banco-andino-verificacion.co/confirmar',
  },
  {
    id: 'E02',
    canal: 'sms',
    fase: 'pre',
    remitente: '891234',
    cuerpo:
      'Banco Andino: tu extracto de septiembre ya está disponible en la app. No respondas este mensaje.',
  },
  {
    id: 'E03',
    canal: 'correo',
    fase: 'pre',
    remitente: 'Banco Andino <notificaciones@bancoandino.com.co>',
    asunto: 'Comprobante de transferencia',
    cuerpo:
      'Tu transferencia por $85.000 fue exitosa. Si no la reconoces, comunícate con la línea que aparece al respaldo de tu tarjeta.',
  },
  {
    id: 'E04',
    canal: 'sms',
    fase: 'pre',
    remitente: '+57 310 5550142',
    cuerpo: 'BANCO ANDINO: ganaste un bono de $200.000. Reclámalo hoy antes de que expire:',
    enlace: 'http://bit.ly/bono-andino',
  },
];
