import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Ciudad,
  Pais
} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadPaisController {
  constructor(
    @repository(CiudadRepository)
    public ciudadRepository: CiudadRepository,
  ) { }

  @get('/ciudades/{id}/pais', {
    responses: {
      '200': {
        description: 'Pais belonging to Ciudad',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pais)},
          },
        },
      },
    },
  })
  async getPais(
    @param.path.number('id') id: typeof Ciudad.prototype.Codigo,
  ): Promise<Pais> {
    return this.ciudadRepository.Pais(id);
  }
}