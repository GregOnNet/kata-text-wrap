describe('WordSplitter', () => {
  describe('When text is passed', () => {
    it.each`
      text       | expected
      ${'Hallo'} | ${[{ value: 'Hallo', start: 0, end: 5 }]}
      ${'Hallo, du'} | ${[
  { value: 'Hallo,', start: 0, end: 6 },
  { value: ' ', start: 7, end: 8 },
  { value: 'du', start: 9, end: 11 },
]}
    `('split by word spaces', ({ text, expected }) => {
      const wordSplitter = new WordSplitter();
      const words = wordSplitter.process(text);
      expect(words).toEqual(expected);
    });
  });
});

export interface Word {
  value: string;
  start: number;
  end: number;
}

interface WordCollector {
  pointer: number;
  words: Word[];
}

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
