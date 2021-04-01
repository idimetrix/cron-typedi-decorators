import { Service } from 'typedi';

import { CronController, Cron } from '../../lib';

import log from '../log';

/**
 * Cron job controller
 *
 * @export
 * @class JobController
 */
@CronController('second')
@Service()
export class SecondController {
  /**
   * Cron job that runs every five seconds.
   *
   * The cron job is named '5sec'.
   *
   * @returns {Promise<void>}
   * @memberof JobController
   */
  @Cron('5sec', '*/5 * * * * *')
  public fiveSecCronJob(): void {
    log.log("I am cron Job '5sec' and I just ran!");
  }
}
