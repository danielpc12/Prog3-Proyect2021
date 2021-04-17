import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Bloque, BloqueRelations, Proyecto, Inmueble} from '../models';
import {ProyectoRepository} from './proyecto.repository';
import {InmuebleRepository} from './inmueble.repository';

export class BloqueRepository extends DefaultCrudRepository<
  Bloque,
  typeof Bloque.prototype.Codigo,
  BloqueRelations
> {

  public readonly Proyecto: BelongsToAccessor<Proyecto, typeof Bloque.prototype.Codigo>;

  public readonly inmuebles: HasManyRepositoryFactory<Inmueble, typeof Bloque.prototype.Codigo>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('ProyectoRepository') protected proyectoRepositoryGetter: Getter<ProyectoRepository>, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>,
  ) {
    super(Bloque, dataSource);
    this.inmuebles = this.createHasManyRepositoryFactoryFor('inmuebles', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmuebles', this.inmuebles.inclusionResolver);
    this.Proyecto = this.createBelongsToAccessorFor('Proyecto', proyectoRepositoryGetter,);
    this.registerInclusionResolver('Proyecto', this.Proyecto.inclusionResolver);
  }
}
