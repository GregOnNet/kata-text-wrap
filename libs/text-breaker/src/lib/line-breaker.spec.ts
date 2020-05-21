describe('@flow-design/text-breaker', () => {
  describe('When no text is passed', () => {
    it.each`
      noText
      ${undefined}
      ${null}
      ${''}
    `('yields no value', ({ noText }) => {
      const breaker = new LineBreaker();
      const brokenText = breaker.break(noText);

      expect(brokenText.hasValue).toBe(false);
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

class LineBreaker {
  break(text: string | null | undefined): Result<Line[]> {
    if (!text) {
      return emptyResult();
    }
  }
}
