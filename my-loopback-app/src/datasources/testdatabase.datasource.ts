import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'testdatabase',
  connector: 'mysql',
  url: 'mysql://root:@127.0.0.1:3306/testdb',
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  database: 'testdb'
};

@lifeCycleObserver('datasource')
export class TestdatabaseDataSource extends juggler.DataSource implements LifeCycleObserver {
  static dataSourceName = 'testdatabase';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.testdatabase', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }

  async start() {
    try {
      await this.connect();
      console.log('Connected to the database.');
    } catch (error) {
      console.error('Failed to connect to the database:', error);
    }
  }

  async stop() {
    try {
      await this.disconnect();
      console.log('Disconnected from the database.');
    } catch (error) {
      console.error('Failed to disconnect from the database:', error);
    }
  }
}
