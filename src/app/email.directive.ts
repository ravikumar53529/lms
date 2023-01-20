import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn } from '@angular/forms';


export function emailValidator(): ValidatorFn {
const EMAIL_REGEXP = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

return (control: AbstractControl): ValidationErrors | null => {
  const isValid = EMAIL_REGEXP.test(control.value);

  if (isValid) {
    return null;
  } else {
    return {
      emailValidator: {
        valid: false,
      },
    };
  }
};

}

@Directive({
  selector: '[appEmail]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EmailDirective,
    multi: true,
  }],
})
export class EmailDirective {

  constructor() { }

  public validate(control: AbstractControl): ValidationErrors | null {
    return emailValidator()(control);
  }
}
