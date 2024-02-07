import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Lb4ModelDataSource} from '../datasources';
import {UserModel, UserModelRelations} from '../models';

export class UserModelRepository extends DefaultCrudRepository<
  UserModel,
  typeof UserModel.prototype.userName,
  UserModelRelations
> {
  constructor(
    @inject('datasources.testdatabase') dataSource: Lb4ModelDataSource,
  ) {
    super(UserModel, dataSource);
  }
}
