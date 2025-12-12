export class IResetPasswordParameter {
  sysid: number;
  bodyMessage: string;
  api: string;
  parameterkey: string;
  constructor(
    sysid: number = 0,
    bodyMessage: string = '',
    api: string = '',
    parameterkey: string = '',
  ) {
    this.sysid = sysid;
    this.bodyMessage = bodyMessage;
    this.api = api;
    this.parameterkey = parameterkey;
  }
}
