import { TextProcessor } from './text-processor';

describe('@flow-design/text-processor', () => {
  describe('When a text is passed', () => {
    it('yields multiple lines', () => {
      const word = 'hallo';
      const text = Array(10).fill(word).join(' ');

      const textProcessor = new TextProcessor();
      const lines = textProcessor.configure({ lineLength: 50 }).process(text);

      expect(lines.length).toBe(2);
    });
  });
});
