import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Pais, PaisRelations, Ciudad} from '../models';
import {CiudadRepository} from './ciudad.repository';

export class PaisRepository extends DefaultCrudRepository<
  Pais,
  typeof Pais.prototype.Codigo,
  PaisRelations
> {

  public readonly ciudades: HasManyRepositoryFactory<Ciudad, typeof Pais.prototype.Codigo>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>,
  ) {
    super(Pais, dataSource);
    this.ciudades = this.createHasManyRepositoryFactoryFor('ciudades', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudades', this.ciudades.inclusionResolver);
  }
}
