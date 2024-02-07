import {Entity, model, property} from '@loopback/repository';

@model()
export class UserModel extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
  })
  userName?: string;

  @property({
    type: 'string',
  })
  password?: string;

  @property({
    type: 'string',
  })
  phone?: string;


  constructor(data?: Partial<UserModel>) {
    super(data);
  }
}

export interface UserModelRelations {
  // describe navigational properties here
}

export type UserModelWithRelations = UserModel & UserModelRelations;
