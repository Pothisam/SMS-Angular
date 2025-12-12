export interface IDocumentLibraryAdd {
  fileName: string;
  contentType: string;
  data: string;
  fileType: string;
}
export interface IDocumentLibraryAddByfkid extends IDocumentLibraryAdd {
  fkid: number;
}
export interface IDocumentLibraryUpdate extends IDocumentLibraryAdd {
  sysId: number;
}
export interface IDocumentLibraryList {
  sysid: number;
  fileName: string;
  fileType: string;
  fileSize: number;
}
export interface IProfileRequest {
  guid: number;
}
