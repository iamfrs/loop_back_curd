import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'lb4Model',
  connector: 'memory',
  localStorage: '',
  file: ''
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class Lb4ModelDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'lb4Model';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.lb4Model', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
