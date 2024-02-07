import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Sharfas extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  full_name: string;

  @property({
    type: 'number',
    required: true,
  })
  age: number;

  @property({
    type: 'number',
    id: true, // Designate this property as the identifier
    generated: true, // Let LoopBack generate the value for this property
  })
  id: number;

  constructor(data?: Partial<Sharfas>) {
    super(data);
  }
}

export interface SharfasRelations {
  // describe navigational properties here
}

export type SharfasWithRelations = Sharfas & SharfasRelations;
