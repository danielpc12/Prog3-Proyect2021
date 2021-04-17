import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Rol} from '../models';
import {RolRepository} from './rol.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.Documento,
  UsuarioRelations
> {

  public readonly Rol: BelongsToAccessor<Rol, typeof Usuario.prototype.Documento>;

  constructor(
    @inject('datasources.mongodbds') dataSource: MongodbDataSource, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>,
  ) {
    super(Usuario, dataSource);
    this.Rol = this.createBelongsToAccessorFor('Rol', rolRepositoryGetter,);
    this.registerInclusionResolver('Rol', this.Rol.inclusionResolver);
  }
}
