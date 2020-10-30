export { default as Direction } from './Direction';
export { default as RelatiRoute } from './RelatiRoute';

export const enum RelatiSymbol {
  None,
  O,
  X,
}

export const enum RelatiStatus {
  Launcher,
  Repeater,
  Receiver,
  Deceased,
}
