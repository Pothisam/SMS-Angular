export interface IMenuItem {
  name: string;
  link?: string;
  subMenu?: IMenuItem[];
  type?: 'link' | 'header' | 'divider';
  cssClass?: string;
}
