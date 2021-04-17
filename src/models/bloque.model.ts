import {belongsTo, Entity, model, property, hasMany} from '@loopback/repository';
import {Proyecto} from './proyecto.model';
import {Inmueble} from './inmueble.model';

@model({
  settings: {
    foreignKeys: {
      fk_cod_proyecto: {
        name: 'fk_cod_proyecto',
        entity: 'Proyecto',
        entityKey: 'Codigo',
        foreignKey: 'codProyecto',
      },
    },
  },
})
export class Bloque extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Codigo?: number;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Descripcion: string;

  @belongsTo(() => Proyecto, {name: 'Proyecto'})
  codProyecto: number;

  @hasMany(() => Inmueble, {keyTo: 'codBloque'})
  inmuebles: Inmueble[];

  constructor(data?: Partial<Bloque>) {
    super(data);
  }
}

export interface BloqueRelations {
  // describe navigational properties here
}

export type BloqueWithRelations = Bloque & BloqueRelations;
