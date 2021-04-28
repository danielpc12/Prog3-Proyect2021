import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys as llaves} from '../config/keys';
const sgMail = require('@sendgrid/mail')
var twilio = require('twilio');

@injectable({scope: BindingScope.TRANSIENT})
export class NotificationService {
  constructor(/* Add @inject to inject parameters */) { }


  /**
   * Envio de notificacion mediante correo electronico
   */
  EnviarEmail(destino: string, asunto: string, contenido: string) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: destino, // Change to your recipient
      from: llaves.EmailFrom, // Change to your verified sender
      subject: asunto,
      html: contenido,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error: any) => {
        console.error(error)
      })
  }

  /**
   * Enviar mensaje al celular del usuario
   */
  EnviarNotificacionPorSMS(telefon: string, contenido: string) {
    var accountSid = process.env.TWILLIO_SSID;
    var authToken = process.env.TWILLIO_TK;


    var client = new twilio(accountSid, authToken);

    client.messages.create({
      body: contenido,
      to: telefon,
      from: llaves.twilioPhone
    })
      .then((message: any) => console.log(message.sid));
  }
}
