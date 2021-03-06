import * as moment from 'moment';
import { ICronMetadataArgs } from './args/ICronMetadataArgs';
import { ControllerMetadata } from './ControllerMetadata';
import { ICronOptions } from '../decorators/options/ICronOptions';

/**
 * Action metadata.
 *
 * @export
 * @class CronMetadata
 */
export class CronMetadata {
  /**
   * Parent handler metadata.
   *
   * @type {Job}
   * @memberof CronMetadata
   */
  jobMetadata: ControllerMetadata;

  /**
   * Target: Method on the handler class.
   *
   * @type {Function}
   * @memberof CronMetadata
   */
  target: Function;

  /**
   * Method name of the target.
   *
   * @type {string}
   * @memberof CronMetadata
   */
  method: string;

  /**
   * Name of the cron.
   *
   * @type {string}
   * @memberof CronMetadata
   */
  name: string;

  /**
   * Cron time, when to execute.
   *
   * @type {(string | Date)}
   * @memberof CronMetadata
   */
  cronTime: string | Date | moment.Moment;

  /**
   * Additional options for the cron job.
   *
   * @type {ICronOptions}
   * @memberof CronMetadata
   */
  options: ICronOptions;

  /**
   * Default constructor.
   * @param {Job} jobMetadata Handler metadata.
   * @param {ICronMetadataArgs} args Action metadata arguments.
   * @memberof CronMetadata
   */
  constructor(jobMetadata: ControllerMetadata, args: ICronMetadataArgs) {
    this.jobMetadata = jobMetadata;
    this.target = args.target;
    this.method = args.method;
    this.name = args.name;
    this.cronTime = args.cronTime;
    this.options = args.options;
  }

  /**
   * Calls the action.
   *
   * @param {*} srv CDS service.
   * @param {*} req Incoming request.
   * @param {*} next Next handler.
   * @returns
   * @memberof CronMetadata
   */
  public async exec(): Promise<void> {
    const handlerInstance = this.jobMetadata.instance;
    return await handlerInstance[this.method].apply(handlerInstance);
  }

  /**
   * Returns the cron jobs context.
   *
   * @returns {*}
   * @memberof CronMetadata
   */
  public getContext(): any {
    return this.jobMetadata.instance;
  }
}
