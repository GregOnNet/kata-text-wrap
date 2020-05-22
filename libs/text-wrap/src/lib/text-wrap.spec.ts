import { TextWrap } from './text-wrap';

describe('@flow-design/text-wrap', () => {
  describe('When a text is passed', () => {
    it('yields multiple lines', () => {
      const word = 'hallo';
      const text = Array(10).fill(word).join(' ');

      const textProcessor = new TextWrap();
      const lines = textProcessor.configure({ lineLength: 50 }).process(text);

      expect(lines.length).toBe(2);
    });
  });
});
