import {
  ElementRef,
  Inject,
  Injectable,
  Renderer2,
  RendererFactory2,
  inject,
  isDevMode,
  DOCUMENT,
} from '@angular/core';
import { Location } from '@angular/common';
import { LayoutService } from './layout.service';

import { BehaviorSubject } from 'rxjs';
import 'reflect-metadata';
import { IModalSettings } from 'src/app/Shared/framework/model/model';
import { IHistoryRecordSettings } from 'src/app/Shared/framework/historyrecord/historyrecord';
interface SafeModel {
  [key: string]: any;
}
@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private renderer: Renderer2;
  router: any;
  private drawerState = new BehaviorSubject<boolean>(false);
  // #region Model Popup
  private modelDeleteConfirmation = new BehaviorSubject<IModalSettings>(new IModalSettings());
  modelDeleteConfirmation$ = this.modelDeleteConfirmation.asObservable();
  updateModelDeleteConfirmation(settings: IModalSettings) {
    this.modelDeleteConfirmation.next(settings);
  }
  // #endregion Model Popup
  // #region Model history record Popup
  private modelhistoryPopup = new BehaviorSubject<IHistoryRecordSettings>(
    new IHistoryRecordSettings(),
  );
  modelhistoryPopup$ = this.modelhistoryPopup.asObservable();
  updateModelHistoryPopup(settings: IHistoryRecordSettings) {
    this.modelhistoryPopup.next(settings);
  }
  // #endregion Model history record Popup
  constructor(
    private location: Location,
    private layout: LayoutService,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  menutoggle(): void {
    this.drawerState.next(!this.drawerState.value);
  }

  get menustate() {
    return this.drawerState.asObservable();
  }
  switchTheme(theme: string) {
    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = theme + '.css';
    }
  }
  GLSS(name: string, value: string) {
    localStorage.setItem(name, value);
  }
  GLSG(name: string) {
    return localStorage.getItem(name);
  }
  // Session Storage Get Value
  GSSG(name: string) {
    const Path = window.location.href; // Use window.location.href instead of jQuery
    return sessionStorage.getItem(`${Path}:${name}`); // Template string for concatenation
  }
  GSSS(name: string, value: string) {
    const Path = window.location.href; // Use window.location.href instead of jQuery
    sessionStorage.setItem(`${Path}:${name}`, value); // Template string for concatenation
  }
  // Get Local Storage Key value
  GLSKV(storagename: string, key: string = 'token'): string | null {
    const area = this.getArea();
    if (area === 'CMS') {
      const Storage = localStorage.getItem(storagename);
      if (Storage !== null) {
        // Parse the JSON string to an object
        const parsedStorage = JSON.parse(Storage);

        // Return the dynamic key's value if it exists
        return parsedStorage[key] ?? null;
      }
    }
    return null;
  }
  HandleArea(area: string) {
    this.layout.IsCMSNavVisible = false;
    this.layout.IsStaffNavVisible = false;
    if (area == 'CMS') {
      if (this.GLSG('CMSToken')) this.layout.IsCMSNavVisible = true;
    } else if (area == 'Staff') {
      if (this.GLSG('StaffToken')) this.layout.IsStaffNavVisible = true;
    } else if (area == 'SMS') {
      if (this.GLSG('SMSToken')) this.layout.IsSMSNavVisible = true;
    }
  }
  getArea(): string {
    return this.location.path().split('/').filter(Boolean).reverse()[1];
  }

  loadLogo(area: string) {
    if (area == 'CMS') {
      if (this.GLSG('CMSToken')) {
      }
    }
  }
  ValidateForm(inputProperties: any): void {
    for (const property of inputProperties) {
      if (property.startsWith('entity')) {
        // Do something with each input property
        console.log(`${property}`);
      }
    }
  }
  findParentByClassName(target: Element | null, className: string): Element | null {
    // Ensure target and className are provided
    if (!target || !className) return null;

    // Traverse up the DOM tree to find the parent with the specified class name
    let parent: Element | null = target.parentElement;
    while (parent) {
      if (parent.classList && parent.classList.contains(className)) {
        return parent;
      }
      parent = parent.parentNode instanceof Element ? parent.parentNode : null;
    }

    // If no parent with the specified class name is found, return null
    return null;
  }
  getAPIBaseUrl() {
    return isDevMode() ? 'https://localhost:7083' : 'http://www.saras.ind.in/API';
  }
  playAudio(type: string): void {
    const audio = new Audio(this.getAudioUrl(type));
    audio.play();
  }
  private getAudioUrl(type: string): string {
    return (
      window.location.origin + `/assets/Audio/${type === 'D' ? 'Error-Notification' : 'Popup'}.mp3`
    );
  }
  showHideIcon(status: boolean) {
    const errorBar = this.document.querySelector('.Error-Bar');
    const message = this.document.querySelector('.Error-Notification-Card');
    if (errorBar && message) {
      if (status) {
        this.renderer.removeClass(errorBar, 'd-none');
        this.renderer.removeClass(message, 'd-none');
      } else {
        this.renderer.addClass(errorBar, 'd-none');
        this.renderer.addClass(message, 'd-none');
      }
    }
  }
  disableButton(id: string): void {
    const buttonElement = document.getElementById(id) as HTMLButtonElement;
    if (buttonElement) {
      buttonElement.disabled = true;
      const spans = buttonElement.querySelectorAll('span');
      if (spans.length >= 2) {
        spans[0].classList.remove('visually-hidden');
        spans[1].innerHTML = ' Please wait...';
      }
    }
  }

  enableButton(id: string): void {
    setTimeout(() => {
      const buttonElement = document.getElementById(id) as HTMLButtonElement;
      if (buttonElement) {
        buttonElement.disabled = false;
        const spans = buttonElement.querySelectorAll('span');
        if (spans.length >= 2) {
          spans[0].classList.add('visually-hidden');
          spans[1].innerHTML = (spans[1]?.getAttribute('data-label') ?? '')!;
        }
      }
    }, 250);
  }
  getButtonID(event: MouseEvent) {
    const clickedElement = event.currentTarget as HTMLElement;
    return clickedElement.children[0].id;
  }

  CreateOptions(name: string, value: string, text: string, datastring: string, json: any) {
    const selectElement = document.querySelector(`select[name="${name}"]`);
    if (!selectElement) {
      return;
    }
    const count = Object.keys(json).length;
    if (count > 0) {
      if (text.includes('|')) {
        const arr = text.split('|');
        const optionValue = arr[1] !== '' ? arr[1] : '';
        selectElement.innerHTML = `<option value="${optionValue}">${optionValue}</option>`;
      } else {
        selectElement.innerHTML = '<option value=""></option>';
      }

      Object.keys(json).forEach((index) => {
        const Value = json[index];
        let html = '';
        if (text.includes('|')) {
          const arr = text.split('|');
          const arrText = arr[0];
          html = `<option value="${Value[value]}">${Value[arrText]}</option>`;
        } else {
          html = `<option value="${Value[value]}">${Value[text]}</option>`;
        }
        selectElement.innerHTML += html;
        if (datastring !== '') {
          const arr = datastring.split(',');
          arr.forEach((val) => {
            const option = selectElement.querySelector(
              `option[value="${Value[value]}"]:last-child`,
            );
            if (option) {
              option.setAttribute('data-' + val, Value[val]);
            }
          });
        }
      });
    } else {
      selectElement.innerHTML = '<option value=""></option>';
    }
  }

  bindDataToModel<T extends object>(model: T, data: any): T {
    Object.keys(model).forEach((key) => {
      const value = data[key];
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        (model as any)[key] = value || '';
      }
    });
    return model;
  }

  private isundefinedProperty<T extends SafeModel>(model: T, property: string): boolean {
    return (
      model[property] instanceof Date ||
      Reflect.getMetadata('design:type', model, property) === undefined
    );
  }
  formatDateTime(date: string | Date): string {
    if (!date) {
      return ''; // Or handle `undefined` differently, perhaps with a default value or by throwing an error.
    }
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date'); // Handle invalid date case
    }

    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const seconds = dateObj.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  formatDate(date: string | Date): string {
    if (!date) {
      return ''; // Or handle `undefined` differently, perhaps with a default value or by throwing an error.
    }
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date'); // Handle invalid date case
    }

    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  ConverToDecimal(value: any): string {
    const num = parseFloat(value);
    if (isNaN(num)) return '0.00';
    return num.toFixed(2);
  }
}
