import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class TestModel extends Entity {
  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  namee: string[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TestModel>) {
    super(data);
  }
}

export interface TestModelRelations {
  // describe navigational properties here
}

export type TestModelWithRelations = TestModel & TestModelRelations;
