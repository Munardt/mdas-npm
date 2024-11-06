/**
 * Interface for options in auto create component using Angular CLI
 */
export interface ComponentOptions {
  /** Name -> Specify name of your component */
  name: string;

  /** Path -> Specify on your component has created */
  path: string;

  /** Main Component -> Specify on needs auto created component and your module and route. */
  main: boolean;

  /** Need Service -> Specify on needs auto created service */
  ns: boolean;
}
