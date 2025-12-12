import { Injectable, ViewChild } from '@angular/core';
import { BadgeService } from './framework/errortag/BadgeService.service';
import { GlobalService } from '../Global/Service/global.service';
@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  constructor(
    private badgeService: BadgeService,
    private globalService: GlobalService,
  ) {}
  formValidation(id: string, validationgroup: string) {
    this.badgeService.errorIconShowHide(false);
    let response: any = {};
    let errors: any = [];
    const formId = (document.getElementById(id) as HTMLElement).closest('form')?.id;
    let i = 0;
    let isValid = true;
    let errormessage: { id: string; msg: string }[] = [];
    const formElement = document.getElementById(formId!);
    const formInputs: NodeListOf<HTMLInputElement> | null = formElement
      ? formElement.querySelectorAll<HTMLInputElement>(
          'mat-select, input,input:not([type="button"])',
        )
      : null;
    formInputs!.forEach((input) => {
      const inputElement = input.closest('mat-select, select, input') as
        | HTMLInputElement
        | HTMLSelectElement
        | null;

      const inputGroup = inputElement?.getAttribute('aria-validationgroup');
      if (validationgroup && inputGroup !== validationgroup) {
        return; // Skip validation if not part of the specified group
      }
      if (inputElement) {
        if (inputElement.tagName === 'MAT-SELECT') {
          const nameAttribute = inputElement.getAttribute('name');
          if (nameAttribute !== null) {
            response[nameAttribute] = inputElement.getAttribute('aria-selectedvalue');
          }
        } else {
          response[inputElement.name] = inputElement.value;
        }
      }

      if (inputElement) {
        const isSelect = inputElement.tagName === 'SELECT';
        const isMatSelect = inputElement.tagName === 'MAT-SELECT';
        const isInput = inputElement.tagName === 'INPUT';

        if (
          isSelect &&
          inputElement.getAttribute('aria-required') === 'true' &&
          (!(inputElement as HTMLInputElement).value ||
            (inputElement as HTMLInputElement).value === null)
        ) {
          errormessage.push({
            id: inputElement.getAttribute('id') as string,
            msg: inputElement.getAttribute('ErrorMessage') as string,
          });
          i++;
        }
        if (
          isMatSelect &&
          inputElement.getAttribute('aria-required') === 'true' &&
          (!inputElement.getAttribute('aria-selectedvalue') ||
            inputElement.getAttribute('aria-selectedvalue') === null ||
            !inputElement.getAttribute('aria-selectedText') ||
            inputElement.getAttribute('aria-selectedText') === null ||
            inputElement.getAttribute('aria-selectedText') === '')
        ) {
          errormessage.push({
            id: inputElement.getAttribute('id') as string,
            msg: inputElement.getAttribute('ErrorMessage') as string,
          });
          i++;
        }
        if (isInput) {
          const inputValue = (input as HTMLInputElement).value;
          if (inputElement.getAttribute('aria-required') === 'true' && !inputValue) {
            errormessage.push({
              id: inputElement.getAttribute('id') as string,
              msg: inputElement.getAttribute('ErrorMessage') as string,
            });
            i++;
          }

          const minLengthAttr = inputElement.getAttribute('min');
          const minLength = minLengthAttr !== null ? +minLengthAttr : 0;
          if (minLength > 0 && minLength > inputValue.length && inputValue.length > 0) {
            const msg = `Invalid ${inputElement.getAttribute(
              'aria-label',
            )} Minimum ${minLength} characters required`;
            errormessage.push({
              id: inputElement.getAttribute('id') as string,
              msg: msg,
            });
            i++;
          }

          const maxLengthAttr = inputElement.getAttribute('maxlength');
          const maxLength = maxLengthAttr !== null ? +maxLengthAttr : 0;
          if (maxLength > 0 && maxLength < inputValue.length) {
            const msg = `Invalid ${inputElement.getAttribute(
              'aria-label',
            )} Maximum ${maxLength} characters Allowed`;
            errormessage.push({
              id: inputElement.getAttribute('id') as string,
              msg: msg,
            });
            i++;
          }

          if (inputElement.getAttribute('type') === 'email' && inputValue) {
            if (!this.isEmail(inputValue)) {
              const msg = `Invalid ${inputElement.getAttribute('aria-label')}`;
              errormessage.push({
                id: inputElement.getAttribute('id') as string,
                msg: msg,
              });
              i++;
            }
          }

          if (inputElement.getAttribute('type') === 'file' && inputValue) {
            const size = Math.round(((input as HTMLInputElement).files?.[0]?.size || 0) / 1024);
            const fileSizeAttr = inputElement.getAttribute('data-filesize');
            if (fileSizeAttr !== null && +fileSizeAttr <= size) {
              const msg = `File Must be less than ${fileSizeAttr} kb`;
              errormessage.push({
                id: inputElement.getAttribute('id') as string,
                msg: msg,
              });
              i++;
            }
          }
        }
      }
    });
    errors = errors.concat(errormessage);
    if (i != 0) {
      this.badgeService.updateBadgeValue(i);
      this.badgeService.updateErrorMsg(errors);
      this.badgeService.errorIconShowHide(true);
      isValid = false;
      this.globalService.playAudio('D');
      //this.globalService.enableButton(id);
    }
    return isValid;
  }
  isEmail(email: string): boolean {
    const regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  getValue<T>(instance: T, event: MouseEvent): T {
    const clickedElement = event.currentTarget as HTMLElement;
    let id = clickedElement.children[0].id;
    const formId = (document.getElementById(id) as HTMLElement).closest('form')?.id;
    const formElement = document.getElementById(formId!);
    const formInputs: NodeListOf<HTMLInputElement> | null = formElement
      ? formElement.querySelectorAll<HTMLInputElement>('input:not([type="button"])')
      : null;

    formInputs!.forEach((input) => {
      const inputElement = input.closest('input') as HTMLInputElement | HTMLSelectElement | null;
      if (typeof instance === 'object' && instance !== null && inputElement) {
        for (const key in instance) {
          if (Object.prototype.hasOwnProperty.call(instance, key)) {
            if (key.toLowerCase() === inputElement.name.toLowerCase()) {
              (instance as any)[key] = inputElement.value;
            }
          }
        }
      }
    });
    return instance;
  }

  setClassValue<T>(clazz: { new (): T }): T {
    return new clazz();
  }
}
