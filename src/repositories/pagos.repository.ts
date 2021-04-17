import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Pagos, PagosRelations, Solicitud} from '../models';
import {SolicitudRepository} from './solicitud.repository';

export class PagosRepository extends DefaultCrudRepository<
  Pagos,
  typeof Pagos.prototype.Comprobante,
  PagosRelations
> {

  public readonly Solicitud: BelongsToAccessor<Solicitud, typeof Pagos.prototype.Comprobante>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Pagos, dataSource);
    this.Solicitud = this.createBelongsToAccessorFor('Solicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('Solicitud', this.Solicitud.inclusionResolver);
  }
}
