import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pagos,
  Solicitud,
} from '../models';
import {PagosRepository} from '../repositories';

export class PagosSolicitudController {
  constructor(
    @repository(PagosRepository)
    public pagosRepository: PagosRepository,
  ) { }

  @get('/pagos/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Solicitud belonging to Pagos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async getSolicitud(
    @param.path.number('id') id: typeof Pagos.prototype.Comprobante,
  ): Promise<Solicitud> {
    return this.pagosRepository.Solicitud(id);
  }
}
