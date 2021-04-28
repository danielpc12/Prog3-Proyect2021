import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {Keys as llaves} from '../config/keys';
import {ResetearClave, Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
import {GeneralFnService, NotificationService} from '../services';

export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
    @service(GeneralFnService)
    public fnService: GeneralFnService,
    @service(NotificationService)
    public servicioNotificacion: NotificationService,
  ) { }

  @post('/usuarios')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['Contraseña'],
          }),
        },
      },
    })
    usuario: Usuario,
  ): Promise<Usuario> {
    let claveAleatoria = this.fnService.GenerarContraseñaAleatoria();
    console.log(claveAleatoria);

    let claveCifrada = this.fnService.CifrarTexto(claveAleatoria);
    console.log(claveCifrada);

    usuario.Contraseña = claveCifrada;

    let usuarioAgregado = await this.usuarioRepository.create(usuario);

    // Notificar al usuario
    let contenido = `<strong>Cordial saludo ${usuarioAgregado.Nombre}, estos son sus datos de acceso para el sistema de la constructora UdeC S.A.S <br><br><br>Usuario: ${usuarioAgregado.Correo}<br>Contraseña: ${claveAleatoria}<br>Rol: ${usuarioAgregado.codRol}<br><br>Bienvenido<strong>`;
    this.servicioNotificacion.EnviarEmail(usuarioAgregado.Correo, llaves.AsuntoRegistroUsuario, contenido);

    return usuarioAgregado
  }

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuarioRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Usuario, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuario>
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, filter);
  }

  @post('/reset-password')
  @response(200, {
    content: {'aplication/json': {schema: getModelSchemaRef(ResetearClave)}},
  })
  async resetPassword(
    @requestBody({
      content: {
        'aplication/json': {
          schema: getModelSchemaRef(ResetearClave),
        },
      },
    })
    resetearClave: ResetearClave,
  ): Promise<Object> {

    let usuario = await this.usuarioRepository.findOne({where: {Correo: resetearClave.correo}})
    if (!usuario) {
      throw new HttpErrors[401]("usuario no existe");
    }

    let claveAleatoria = this.fnService.GenerarContraseñaAleatoria();
    console.log(claveAleatoria);
    let claveCifrada = this.fnService.CifrarTexto(claveAleatoria);
    console.log(claveCifrada);

    usuario.Contraseña = claveCifrada;
    await this.usuarioRepository.update(usuario);
    let contenido = `hola, buen dia. usted a solicitado una nueva contraseña para la plataforma sus datos son:
      Usuario: ${usuario.Nombre} y Contraseña: ${claveAleatoria}

      Gracias y bienbenido a nuestros servicios
      `;
    this.servicioNotificacion.EnviarNotificacionPorSMS(usuario.Celular, contenido);

    return {
      envio: "OK"
    };
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }
}
