import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Cliente, Inmueble, Pagos} from '../models';
import {ClienteRepository} from './cliente.repository';
import {InmuebleRepository} from './inmueble.repository';
import {PagosRepository} from './pagos.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.Codigo,
  SolicitudRelations
> {

  public readonly Cliente: BelongsToAccessor<Cliente, typeof Solicitud.prototype.Codigo>;

  public readonly Inmueble: BelongsToAccessor<Inmueble, typeof Solicitud.prototype.Codigo>;

  public readonly pagos: HasManyRepositoryFactory<Pagos, typeof Solicitud.prototype.Codigo>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>, @repository.getter('PagosRepository') protected pagosRepositoryGetter: Getter<PagosRepository>,
  ) {
    super(Solicitud, dataSource);
    this.pagos = this.createHasManyRepositoryFactoryFor('pagos', pagosRepositoryGetter,);
    this.registerInclusionResolver('pagos', this.pagos.inclusionResolver);
    this.Inmueble = this.createBelongsToAccessorFor('Inmueble', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('Inmueble', this.Inmueble.inclusionResolver);
    this.Cliente = this.createBelongsToAccessorFor('Cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('Cliente', this.Cliente.inclusionResolver);
  }
}
