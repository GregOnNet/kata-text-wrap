import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TextWrap } from '@flow-design/text-wrap';
import { map, tap } from 'rxjs/operators';
import { merge } from 'rxjs';

@Component({
  selector: 'flow-design-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  textWrap = new TextWrap();
  textInput = new FormControl('Some example text');
  maxLineLengthInput = new FormControl(50);

  changes = merge(
    this.textInput.valueChanges,
    this.maxLineLengthInput.valueChanges
  );

  lines: string[] = [];

  ngOnInit(): void {
    this.changes
      .pipe(
        map(() =>
          this.textWrap
            .configure({ lineLength: this.maxLineLengthInput.value })
            .process(this.textInput.value)
        ),
        tap((lines) => (this.lines = lines))
      )
      .subscribe();
  }
}
