import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Ciudad, CiudadRelations, Pais, Proyecto, Cliente} from '../models';
import {PaisRepository} from './pais.repository';
import {ProyectoRepository} from './proyecto.repository';
import {ClienteRepository} from './cliente.repository';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.Codigo,
  CiudadRelations
> {

  public readonly Pais: BelongsToAccessor<Pais, typeof Ciudad.prototype.Codigo>;

  public readonly proyectos: HasManyRepositoryFactory<Proyecto, typeof Ciudad.prototype.Codigo>;

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof Ciudad.prototype.Codigo>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('PaisRepository') protected paisRepositoryGetter: Getter<PaisRepository>, @repository.getter('ProyectoRepository') protected proyectoRepositoryGetter: Getter<ProyectoRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Ciudad, dataSource);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
    this.proyectos = this.createHasManyRepositoryFactoryFor('proyectos', proyectoRepositoryGetter,);
    this.registerInclusionResolver('proyectos', this.proyectos.inclusionResolver);
    this.Pais = this.createBelongsToAccessorFor('Pais', paisRepositoryGetter,);
    this.registerInclusionResolver('Pais', this.Pais.inclusionResolver);
  }
}
