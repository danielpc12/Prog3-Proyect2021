import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Inmueble, Solicitud
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudInmuebleController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicitudes/{id}/inmueble', {
    responses: {
      '200': {
        description: 'Inmueble belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inmueble)},
          },
        },
      },
    },
  })
  async getInmueble(
    @param.path.number('id') id: typeof Solicitud.prototype.Codigo,
  ): Promise<Inmueble> {
    return this.solicitudRepository.Inmueble(id);
  }
}
