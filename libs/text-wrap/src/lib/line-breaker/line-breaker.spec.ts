import { LineBreaker } from './line-breaker';
import { WordSplitter } from '../word-splitter/word-splitter';

describe('@flow-design/line-breaker', () => {
  describe('When no text is passed', () => {
    it.each`
      noText
      ${undefined}
      ${null}
      ${''}
    `('yields no value', ({ noText }) => {
      const breaker = new LineBreaker();
      const brokenText = breaker.process(noText);

      expect(brokenText.hasValue).toBe(false);
    });
  });

  describe('When words are passed', () => {
    it('breaks lines by the given length', () => {
      const word = 'hallo';
      const text = Array(10).fill(word).join(' ');
      const words = new WordSplitter().process(text);
      const lineBreaker = new LineBreaker();
      const result = lineBreaker.configure({ lineLength: 50 }).process(words);

      expect(result.value.length).toBe(2);
    });
  });
});
