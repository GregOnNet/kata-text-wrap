import { TextProcessorOptions } from './text-processor.options';
import { LineBreaker } from './line-breaker/line-breaker';
import { WordSplitter } from './word-splitter/word-splitter';

const lineBreakerOptionsDefault: TextProcessorOptions = {
  lineLength: 50,
};

export class TextProcessor {
  // poor man's dependency injection
  private wordSplitter = new WordSplitter();
  private lineBreaker = new LineBreaker();

  private options: TextProcessorOptions = lineBreakerOptionsDefault;

  configure(options: TextProcessorOptions): TextProcessor {
    this.options = { ...this.options, ...options };
    return this;
  }

  process(text: string): string[] {
    const words = this.wordSplitter.process(text);
    const lines = this.lineBreaker.configure(this.options).process(words);

    return lines.hasValue
      ? lines.value.map((line) => line.map((word) => word.value).join(''))
      : [];
  }
}
