import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {generate} from 'generate-password';
import {Keys as llaves} from '../config/keys';
const CryptoJS = require("crypto-js");

@injectable({scope: BindingScope.TRANSIENT})
export class GeneralFnService {
  constructor(/* Add @inject to inject parameters */) { }

  /**
   * Funcion para generar contraseña aleatoria
   */
  GenerarContraseñaAleatoria(): string {

    let pass = generate({
      length: 10,
      numbers: true,
      uppercase: true,
      lowercase: true
    });
    return pass;
  }

  /**
   * Cifrar string
   */
  CifrarTexto(texto: string): string {
    let ciphertext = CryptoJS.AES.encrypt(texto, llaves.AESKey).toString();
    return ciphertext
  }
}
