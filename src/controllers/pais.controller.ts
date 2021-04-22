import {authenticate} from '@loopback/authentication';
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
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {Pais} from '../models';
import {PaisRepository} from '../repositories';

@authenticate('admin')
export class PaisController {
  constructor(
    @repository(PaisRepository)
    public paisRepository: PaisRepository,
  ) { }

  @post('/pais')
  @response(200, {
    description: 'Pais model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pais)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pais, {
            title: 'NewPais',
            exclude: ['Codigo'],
          }),
        },
      },
    })
    pais: Omit<Pais, 'Codigo'>,
  ): Promise<Pais> {
    return this.paisRepository.create(pais);
  }

  @get('/pais/count')
  @response(200, {
    description: 'Pais model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pais) where?: Where<Pais>,
  ): Promise<Count> {
    return this.paisRepository.count(where);
  }

  @authenticate.skip()
  @get('/pais')
  @response(200, {
    description: 'Array of Pais model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pais, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pais) filter?: Filter<Pais>,
  ): Promise<Pais[]> {
    return this.paisRepository.find(filter);
  }

  @patch('/pais')
  @response(200, {
    description: 'Pais PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pais, {partial: true}),
        },
      },
    })
    pais: Pais,
    @param.where(Pais) where?: Where<Pais>,
  ): Promise<Count> {
    return this.paisRepository.updateAll(pais, where);
  }

  @authenticate.skip()
  @get('/pais/{id}')
  @response(200, {
    description: 'Pais model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pais, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Pais, {exclude: 'where'}) filter?: FilterExcludingWhere<Pais>
  ): Promise<Pais> {
    return this.paisRepository.findById(id, filter);
  }

  @patch('/pais/{id}')
  @response(204, {
    description: 'Pais PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pais, {partial: true}),
        },
      },
    })
    pais: Pais,
  ): Promise<void> {
    await this.paisRepository.updateById(id, pais);
  }

  @put('/pais/{id}')
  @response(204, {
    description: 'Pais PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pais: Pais,
  ): Promise<void> {
    await this.paisRepository.replaceById(id, pais);
  }

  @del('/pais/{id}')
  @response(204, {
    description: 'Pais DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.paisRepository.deleteById(id);
  }
}
