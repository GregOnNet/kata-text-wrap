describe('WordSplitter', () => {
  describe('When text is passed', () => {
    it.each`
      text                 | expected
      ${'Hallo'}           | ${['Hallo']}
      ${'Hallo, du'}       | ${['Hallo,', 'du']}
      ${'Hallo Nr. 1, du'} | ${['Hallo', 'Nr.', '1,', 'du']}
      ${'Hallo Nr.1'}      | ${['Hallo', 'Nr.1']}
    `('split by word spaces', ({ text, expected }) => {
      const wordSplitter = new WordSplitter();
      const splittedWords = wordSplitter.process(text);
      expect(splittedWords).toEqual(expected);
    });
  });
});

export class WordSplitter {
  process(text: string): string[] {
    return text.split(/\s/);
  }
}
