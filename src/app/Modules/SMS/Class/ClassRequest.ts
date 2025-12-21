export class AddClassRequest {
  className: string;

  constructor(init?: Partial<AddClassRequest>) {
    this.className = init?.className ?? '';
  }
}
