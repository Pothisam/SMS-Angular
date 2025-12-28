export class IDocumentLibraryAdd {
  fileName: string;
  contentType: string;
  data: string;
  fileType: string;

  constructor(init?: Partial<IDocumentLibraryAdd>) {
    this.fileName = init?.fileName ?? '';
    this.contentType = init?.contentType ?? '';
    this.data = init?.data ?? '';
    this.fileType = init?.fileType ?? '';
  }
}
export class IDocumentLibraryAddByFkid extends IDocumentLibraryAdd {
  fkid: number;

  constructor(init?: Partial<IDocumentLibraryAddByFkid>) {
    super(init);
    this.fkid = init?.fkid ?? 0;
  }
}
export class IDocumentLibraryUpdate extends IDocumentLibraryAdd {
  sysId: number;

  constructor(init?: Partial<IDocumentLibraryUpdate>) {
    super(init);
    this.sysId = init?.sysId ?? 0;
  }
}
export class IDocumentLibraryList {
  sysid: number;
  fileName: string;
  fileType: string;
  fileSize: number;

  constructor(init?: Partial<IDocumentLibraryList>) {
    this.sysid = init?.sysid ?? 0;
    this.fileName = init?.fileName ?? '';
    this.fileType = init?.fileType ?? '';
    this.fileSize = init?.fileSize ?? 0;
  }
}

export class ProfileRequest {
  guid: number;

  constructor(init?: Partial<ProfileRequest>) {
    this.guid = init?.guid ?? 0;
  }
}
