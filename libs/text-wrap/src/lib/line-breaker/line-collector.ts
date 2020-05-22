import { Line } from '../shared';

export interface LineCollector {
  nextLineEnding: number;
  currentLine: Line;
  lines: Line[];
}
