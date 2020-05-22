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
    it.skip('breaks lines by the given length', () => {
      const word = 'hallo';
      const words = Array(10).fill(word);
      const lineBreaker = new LineBreaker();
      const result = lineBreaker.process(words);

      expect(result.value);
    });
  });
});

interface Result<T> {
  hasValue: boolean;
  value: T | null;
}

function result<T>(value: T): Result<T> {
  return {
    hasValue: true,
    value,
  };
}

function emptyResult(): Result<null> {
  return {
    hasValue: false,
    value: null,
  };
}

type Line = string;

export class LineBreaker {
  process(words: string[] | null | undefined): Result<Line[]> {
    if (!Array.isArray(words)) {
      return emptyResult();
    }

    //@ts-ignore
    return words.reduce((lines, word) => {}, { linesTotal: 0, lines: [] });
  }
}
