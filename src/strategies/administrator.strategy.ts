import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {JwtService} from '../services';

export class AdministratorStrategy implements AuthenticationStrategy {
  name: string = 'admin';

  constructor(
    @service(JwtService)
    public servicioJWT: JwtService) {

  }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = parseBearerToken(request);
    if (!token) {
      throw new HttpErrors[401]("No existe un token en la solicitud")
    }
    let info = this.servicioJWT.VerificarTokenJWT(token);
    if (info) {
      if (info.data.role == '607a93e43fe1ecffb6d7679c') {
        let perfil: UserProfile = Object.assign({
          documento: info.data.documento,
          nombre: info.data.nombre,
          correo: info.data.correo,
          rol: info.data.role
        });
        return perfil;
      }
      else {
        throw new HttpErrors[401]("El token es valido, pero no tiene los permisos suficientes para ejecutar esta accion")
      }
    }
    else {
      throw new HttpErrors[401]("El token enviado no es valido")
    }
  }
}
