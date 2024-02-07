import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {UserModel} from '../models';
import {UserModelRepository} from '../repositories';

export class AdminController {
  constructor(
    @repository(UserModelRepository)
    public userModelRepository : UserModelRepository,
  ) {}

  @post('/user-models')
  @response(200, {
    description: 'UserModel model instance',
    content: {'application/json': {schema: getModelSchemaRef(UserModel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserModel, {
            title: 'NewUserModel',
            exclude: ['password'],
          }),
        },
      },
    })
    userModel: Omit<UserModel, 'password'>,
  ): Promise<UserModel> {
    return this.userModelRepository.create(userModel);
  }

  @get('/user-models/count')
  @response(200, {
    description: 'UserModel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UserModel) where?: Where<UserModel>,
  ): Promise<Count> {
    return this.userModelRepository.count(where);
  }

  @get('/user-models')
  @response(200, {
    description: 'Array of UserModel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UserModel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UserModel) filter?: Filter<UserModel>,
  ): Promise<UserModel[]> {
    return this.userModelRepository.find(filter);
  }

  @patch('/user-models')
  @response(200, {
    description: 'UserModel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserModel, {partial: true}),
        },
      },
    })
    userModel: UserModel,
    @param.where(UserModel) where?: Where<UserModel>,
  ): Promise<Count> {
    return this.userModelRepository.updateAll(userModel, where);
  }

  @get('/user-models/{id}')
  @response(200, {
    description: 'UserModel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UserModel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(UserModel, {exclude: 'where'}) filter?: FilterExcludingWhere<UserModel>
  ): Promise<UserModel> {
    return this.userModelRepository.findById(id, filter);
  }

  @patch('/user-models/{id}')
  @response(204, {
    description: 'UserModel PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserModel, {partial: true}),
        },
      },
    })
    userModel: UserModel,
  ): Promise<void> {
    await this.userModelRepository.updateById(id, userModel);
  }

  @put('/user-models/{id}')
  @response(204, {
    description: 'UserModel PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() userModel: UserModel,
  ): Promise<void> {
    await this.userModelRepository.replaceById(id, userModel);
  }

  @del('/user-models/{id}')
  @response(204, {
    description: 'UserModel DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userModelRepository.deleteById(id);
  }
}
