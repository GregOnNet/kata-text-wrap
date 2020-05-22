import { Word, WordSplitter } from './word-splitter.spec';

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

type Line = Word[];

export interface LineBreakerOptions {
  lineLength: number;
}

export const lineBreakerOptionsDefault: LineBreakerOptions = {
  lineLength: 50,
};

interface LineCollector {
  nextLineEnding: number;
  currentLine: Line;
  lines: Line[];
}

export class LineBreaker {
  private options: LineBreakerOptions = lineBreakerOptionsDefault;

  configure(options: LineBreakerOptions): LineBreaker {
    this.options = { ...this.options, ...options };
    return this;
  }

  process(words: Word[] | null | undefined): Result<Line[]> {
    if (!Array.isArray(words)) {
      return emptyResult();
    }

    const collector = words.reduce(
      (lineCollector: LineCollector, word: Word) => {
        if (word.end <= lineCollector.nextLineEnding) {
          lineCollector.currentLine = [...lineCollector.currentLine, word];
        } else {
          lineCollector.lines = [
            ...lineCollector.lines,
            [...lineCollector.currentLine],
          ];
          lineCollector.currentLine = [word];
          lineCollector.nextLineEnding =
            lineCollector.nextLineEnding * lineCollector.lines.length;
        }
        return lineCollector;
      },
      {
        nextLineEnding: this.options.lineLength,
        currentLine: [],
        lines: [],
      }
    );

    return result(collector.lines);
  }
}
