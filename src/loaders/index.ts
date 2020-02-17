import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import  Logger  from './logger';
import postgresLoader from './postgres'

export default async ({ expressApp }) => {

  const postgresDb = postgresLoader();
  Logger.info('✌️ DB loaded and connected! and');

  /**
   * WTF is going on here?
   *
   * We are injecting the mongoose models into the DI container.
   * I know this is controversial but will provide a lot of flexibility at the time
   * of writing unit tests, just go and check how beautiful they are!
   */

  const { status } = await dependencyInjectorLoader(postgresDb);

  if (status) {
    Logger.info('✌️ Dependency Injector loaded');
  }

  expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
