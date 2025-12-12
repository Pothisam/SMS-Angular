export class SelectedColums {
  public columnValue: string = '';
  public columnText: string = '';
  public isSelected: boolean = false;
  public index: number = 0;

  constructor(columnValue: string, columnText: string, currentIndex: number) {
    this.columnValue = String(columnValue);
    this.columnText = String(columnText);
    this.index = Number(currentIndex);
  }
}
