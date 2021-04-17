import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Pagos, Solicitud
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudPagosController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicitudes/{id}/pagos', {
    responses: {
      '200': {
        description: 'Array of Solicitud has many Pagos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pagos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Pagos>,
  ): Promise<Pagos[]> {
    return this.solicitudRepository.pagos(id).find(filter);
  }

  @post('/solicitudes/{id}/pagos', {
    responses: {
      '200': {
        description: 'Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pagos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Solicitud.prototype.Codigo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pagos, {
            title: 'NewPagosInSolicitud',
            exclude: ['Comprobante'],
            optional: ['codSolicitud']
          }),
        },
      },
    }) pagos: Omit<Pagos, 'Comprobante'>,
  ): Promise<Pagos> {
    return this.solicitudRepository.pagos(id).create(pagos);
  }

  @patch('/solicitudes/{id}/pagos', {
    responses: {
      '200': {
        description: 'Solicitud.Pagos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pagos, {partial: true}),
        },
      },
    })
    pagos: Partial<Pagos>,
    @param.query.object('where', getWhereSchemaFor(Pagos)) where?: Where<Pagos>,
  ): Promise<Count> {
    return this.solicitudRepository.pagos(id).patch(pagos, where);
  }

  @del('/solicitudes/{id}/pagos', {
    responses: {
      '200': {
        description: 'Solicitud.Pagos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pagos)) where?: Where<Pagos>,
  ): Promise<Count> {
    return this.solicitudRepository.pagos(id).delete(where);
  }
}
