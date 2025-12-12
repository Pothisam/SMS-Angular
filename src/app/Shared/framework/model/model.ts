export class IModalSettings {
  isModalVisible: boolean;
  headerMessage: string;
  bodyMessage: string;
  note: string;
  parameter: number | string | object | null;
  api: string;
  targetHTML: HTMLElement | null;
  modalId: string;
  formId: string;
  validationGroup: string;
  responseOkAction?: (response: any) => void;
  getInputParameter?: () => any;
  isDeleteForm: boolean;
  buttonGroup: string[] | null;
  modalSize: string | null;
  onModalClose?: () => void;
  constructor(
    isModalVisible: boolean = false,
    headerMessage: string = 'Alert',
    bodyMessage: string = '',
    note: string = '',
    parameter: any = null,
    api: string = '',
    html: HTMLElement | null = null,
    modalId: string = '',
    formId: string = '',
    validationGroup: string = '',
    isDeleteForm: boolean = true,
    buttonGroup: string[] | null = null,
    modalSize: ModalSize | null = ModalSize.xl,
  ) {
    this.isModalVisible = isModalVisible;
    this.headerMessage = headerMessage;
    this.bodyMessage = bodyMessage;
    this.note = note;
    this.parameter = parameter;
    this.api = api;
    this.targetHTML = html;
    this.modalId = modalId;
    this.formId = formId;
    this.validationGroup = validationGroup;
    this.isDeleteForm = isDeleteForm;
    this.buttonGroup = buttonGroup;
    this.modalSize = modalSize;
  }
}

export enum ModalSize {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  xxl = 'xxl',
}
