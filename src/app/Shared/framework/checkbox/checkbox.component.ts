import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'fw-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  standalone: false,
})
export class CheckboxComponent implements OnInit {
  @Input() label: string = '';

  public _modelValue: boolean = false;
  @Input()
  get modelValue() {
    return this._modelValue;
  }
  set modelValue(value: boolean) {
    if (this._modelValue === value) {
      return;
    }
    this._modelValue = value;
    this.modelValueChange.emit(this._modelValue);
  }
  @Output()
  modelValueChange = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}
  onCheckboxChange(event: any) {
    this._modelValue = event.checked;
    this.modelValueChange.emit(this._modelValue);
  }
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this._modelValue = !this._modelValue;
      this.modelValueChange.emit(this._modelValue);
      event.preventDefault(); // Optional: Prevents default action for Enter key
    }
  }
}
