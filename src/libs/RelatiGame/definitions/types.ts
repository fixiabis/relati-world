export const RELATI_N_SYMBOL = 0b00000000;
export const RELATI_SYMBOL_O = 0b00000001;
export const RELATI_SYMBOL_X = 0b00000010;
export const RELATI_LAUNCHER = 0b00000000;
export const RELATI_REPEATER = 0b00000010;
export const RELATI_RECEIVER = 0b00000100;
export const RELATI_DECEASED = 0b00000110;

export type RelatiSymbol =
  | typeof RELATI_N_SYMBOL
  | typeof RELATI_SYMBOL_O
  | typeof RELATI_SYMBOL_X;

export type RelatiStatus =
  | typeof RELATI_LAUNCHER
  | typeof RELATI_REPEATER
  | typeof RELATI_RECEIVER
  | typeof RELATI_DECEASED;
