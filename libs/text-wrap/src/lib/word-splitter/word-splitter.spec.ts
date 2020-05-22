import { WordSplitter } from './word-splitter';

describe('@flow-design/word-splitter', () => {
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
