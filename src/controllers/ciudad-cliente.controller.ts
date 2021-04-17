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
  Ciudad,
  Cliente
} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadClienteController {
  constructor(
    @repository(CiudadRepository) protected ciudadRepository: CiudadRepository,
  ) { }

  @get('/ciudades/{id}/clientes', {
    responses: {
      '200': {
        description: 'Array of Ciudad has many Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.ciudadRepository.clientes(id).find(filter);
  }

  @post('/ciudades/{id}/clientes', {
    responses: {
      '200': {
        description: 'Ciudad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Ciudad.prototype.Codigo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewClienteInCiudad',
            exclude: ['Documento'],
            optional: ['codCiudad']
          }),
        },
      },
    }) cliente: Omit<Cliente, 'Documento'>,
  ): Promise<Cliente> {
    return this.ciudadRepository.clientes(id).create(cliente);
  }

  @patch('/ciudades/{id}/clientes', {
    responses: {
      '200': {
        description: 'Ciudad.Cliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Partial<Cliente>,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.ciudadRepository.clientes(id).patch(cliente, where);
  }

  @del('/ciudades/{id}/clientes', {
    responses: {
      '200': {
        description: 'Ciudad.Cliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.ciudadRepository.clientes(id).delete(where);
  }
}
