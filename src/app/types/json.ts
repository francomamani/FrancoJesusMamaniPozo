export type JSON =
  | string
  | number
  | boolean
  | Date
  | { [key: string]: JSON }
  | Array<JSON>;
