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
  Proyecto
} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadProyectoController {
  constructor(
    @repository(CiudadRepository) protected ciudadRepository: CiudadRepository,
  ) { }

  @get('/ciudades/{id}/proyectos', {
    responses: {
      '200': {
        description: 'Array of Ciudad has many Proyecto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proyecto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Proyecto>,
  ): Promise<Proyecto[]> {
    return this.ciudadRepository.proyectos(id).find(filter);
  }

  @post('/ciudades/{id}/proyectos', {
    responses: {
      '200': {
        description: 'Ciudad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Proyecto)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Ciudad.prototype.Codigo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proyecto, {
            title: 'NewProyectoInCiudad',
            exclude: ['Codigo'],
            optional: ['codCiudad']
          }),
        },
      },
    }) proyecto: Omit<Proyecto, 'Codigo'>,
  ): Promise<Proyecto> {
    return this.ciudadRepository.proyectos(id).create(proyecto);
  }

  @patch('/ciudades/{id}/proyectos', {
    responses: {
      '200': {
        description: 'Ciudad.Proyecto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proyecto, {partial: true}),
        },
      },
    })
    proyecto: Partial<Proyecto>,
    @param.query.object('where', getWhereSchemaFor(Proyecto)) where?: Where<Proyecto>,
  ): Promise<Count> {
    return this.ciudadRepository.proyectos(id).patch(proyecto, where);
  }

  @del('/ciudades/{id}/proyectos', {
    responses: {
      '200': {
        description: 'Ciudad.Proyecto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Proyecto)) where?: Where<Proyecto>,
  ): Promise<Count> {
    return this.ciudadRepository.proyectos(id).delete(where);
  }
}
