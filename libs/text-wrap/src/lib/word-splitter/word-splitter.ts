import { Word } from '../shared/word';
import { WordCollector } from './word-collector';

export class WordSplitter {
  process(text: string): Word[] {
    return text
      .split(/\s/)
      .map((textFragment, index, textFragments) =>
        index === textFragments.length - 1 ? textFragment : [textFragment, ' ']
      )
      .flat()
      .reduce(
        (collector: WordCollector, textFragment: string) => {
          const word = {
            value: textFragment,
            start: collector.pointer,
            end: collector.pointer + textFragment.length,
          };

          collector.pointer = word.end + 1;
          collector.words = [...collector.words, word];
          return collector;
        },
        { pointer: 0, words: [] }
      ).words;
  }
}
