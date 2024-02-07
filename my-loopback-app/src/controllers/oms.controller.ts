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
import {Sharfas} from '../models';
import {SharfasRepository} from '../repositories';

export class OmsController {
  constructor(
    @repository(SharfasRepository)
    public sharfasRepository: SharfasRepository,
  ) {}

  private async checkDatabaseConnection(): Promise<void> {
    // Check if the dataSource is connected
    const isConnected = await this.sharfasRepository.dataSource.connecting;

    if (!isConnected) {
      // Throw an error if the dataSource is not connected
      throw new Error('Database connection is not established.');
    }
  }

  @post('/sharfas')
  @response(200, {
    description: 'Sharfas model instance',
    content: {'application/json': {schema: getModelSchemaRef(Sharfas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sharfas, {
            title: 'NewSharfas',
            exclude: ['id'],
          }),
        },
      },
    })
    sharfas: Omit<Sharfas, 'id'>,
  ): Promise<Sharfas> {
    await this.checkDatabaseConnection(); // Check database connection

    return this.sharfasRepository.create(sharfas);
  }

  @get('/sharfas/count')
  @response(200, {
    description: 'Sharfas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Sharfas) where?: Where<Sharfas>,
  ): Promise<Count> {
    return this.sharfasRepository.count(where);
  }

  @get('/sharfas')
  @response(200, {
    description: 'Array of Sharfas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Sharfas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Sharfas) filter?: Filter<Sharfas>,
  ): Promise<Sharfas[]> {
    return this.sharfasRepository.find(filter);
  }

  @patch('/sharfas')
  @response(200, {
    description: 'Sharfas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sharfas, {partial: true}),
        },
      },
    })
    sharfas: Sharfas,
    @param.where(Sharfas) where?: Where<Sharfas>,
  ): Promise<Count> {
    return this.sharfasRepository.updateAll(sharfas, where);
  }

  @get('/sharfas/{id}')
  @response(200, {
    description: 'Sharfas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Sharfas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Sharfas, {exclude: 'where'}) filter?: FilterExcludingWhere<Sharfas>
  ): Promise<Sharfas> {
    return this.sharfasRepository.findById(id, filter);
  }

  @patch('/sharfas/{id}')
  @response(204, {
    description: 'Sharfas PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sharfas, {partial: true}),
        },
      },
    })
    sharfas: Sharfas,
  ): Promise<void> {
    await this.sharfasRepository.updateById(id, sharfas);
  }

  @put('/sharfas/{id}')
  @response(204, {
    description: 'Sharfas PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() sharfas: Sharfas,
  ): Promise<void> {
    await this.sharfasRepository.replaceById(id, sharfas);
  }

  @del('/sharfas/{id}')
  @response(204, {
    description: 'Sharfas DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.sharfasRepository.deleteById(id);
  }
}
