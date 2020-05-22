import { LineCollector } from './line-collector';
import { LineBreakerOptions } from './line-breaker.options';
import { emptyResult } from '../result/empty-result';
import { Result } from '../result/valueResult';
import { Line } from '../shared/line';
import { valueResult } from '../result/value-result';
import { Word } from '../shared/word';

export const lineBreakerOptionsDefault: LineBreakerOptions = {
  lineLength: 50,
};

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
            this.options.lineLength * (lineCollector.lines.length + 1);
        }
        return lineCollector;
      },
      {
        nextLineEnding: this.options.lineLength,
        currentLine: [],
        lines: [],
      }
    );
    return valueResult([...collector.lines, collector.currentLine]);
  }
}
