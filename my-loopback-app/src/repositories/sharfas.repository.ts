import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {TestdatabaseDataSource} from '../datasources';
import {Sharfas, SharfasRelations} from '../models';

export class SharfasRepository extends DefaultCrudRepository<
  Sharfas,
  typeof Sharfas.prototype.id, // This specifies the identifier type
  SharfasRelations
> {
  constructor(
    @inject('datasources.testdatabase') dataSource: TestdatabaseDataSource,
  ) {
    super(Sharfas, dataSource);
  }
}
