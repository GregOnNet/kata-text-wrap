import { Word } from '../shared/word';

export interface WordCollector {
  pointer: number;
  words: Word[];
}
