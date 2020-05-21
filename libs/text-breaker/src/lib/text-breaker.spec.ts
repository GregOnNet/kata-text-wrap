import { textBreaker } from './text-breaker';

describe('@flow-design/text-breaker', () => {
  describe('When no text is passed', () => {
    it.each`
      noText
      ${undefined}
      ${null}
      ${''}
    `('yields empty', ({noText}) => {
const breaker = new LineBreaker();
const brokenText = breaker.break(noText);
expect(brokenText).toBe('')
    });
  });
});

class LineBreaker {
  break(text: string|null|undefined): string {
if (text) { return  ''}
  }
}
