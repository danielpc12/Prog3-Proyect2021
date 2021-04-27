import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys as llaves} from '../config/keys';
import {Usuario} from '../models';
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class JwtService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Creacion del token
   */
  CrearTokenJWT(usuario: Usuario) {
    let claveSecreta = llaves.jwtKey;
    let tk = jwt.sign({
      exp: llaves.expTimeJWT,
      data: {
        documento: usuario.Documento,
        nombre: usuario.Nombre,
        correo: usuario.Correo,
        role: usuario.codRol
      }
    }, claveSecreta);
    return tk;
  }

  /**
 * Verificar un token
 */
  VerificarTokenJWT(token: string) {
    try {
      let decoded = jwt.verify(token, llaves.jwtKey);
      return decoded
    } catch {
      return null;
    }
  }
}
