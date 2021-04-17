import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Cliente, ClienteRelations, Ciudad, Solicitud} from '../models';
import {CiudadRepository} from './ciudad.repository';
import {SolicitudRepository} from './solicitud.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.Documento,
  ClienteRelations
> {

  public readonly Ciudad: BelongsToAccessor<Ciudad, typeof Cliente.prototype.Documento>;

  public readonly solicitudes: HasManyRepositoryFactory<Solicitud, typeof Cliente.prototype.Documento>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Cliente, dataSource);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
    this.Ciudad = this.createBelongsToAccessorFor('Ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('Ciudad', this.Ciudad.inclusionResolver);
  }
}
