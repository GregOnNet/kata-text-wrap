import { TextWrapOptions } from './text-wrap.options';
import { LineBreaker } from './line-breaker/line-breaker';
import { WordSplitter } from './word-splitter/word-splitter';

const lineBreakerOptionsDefault: TextWrapOptions = {
  lineLength: 50,
};

export class TextWrap {
  // poor man's dependency injection
  private wordSplitter = new WordSplitter();
  private lineBreaker = new LineBreaker();

  private options: TextWrapOptions = lineBreakerOptionsDefault;

  configure(options: TextWrapOptions): TextWrap {
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
