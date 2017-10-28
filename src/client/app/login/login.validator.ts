import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginValidationService } from './login.validation.service';

@Component({
  selector: 'control-messages',
  template: `<div *ngIf="errorMessage !== null" class="fontFamily form-control-feedback" style="">
  {{ errorMessage }} </div>`
})
export class LoginValidatorComponent {
  @Input() control: FormControl;
  @Input() htmlElem: any;
  constructor() {} // tslint:disable-line

  get errorMessage():any {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        let errorMsg = LoginValidationService.getValidatorErrorMessage(propertyName,this.control.errors[propertyName]);
        // console.log(this.htmlElem);
       // this.htmlElem.placeholder= errorMsg;
       // this.htmlElem['placeholder'] = errorMsg;
      //  console.log(this.htmlElem.nativeElement);
        // this.htmlElem.setAttribute('value','');
        // this.htmlElem.setAttribute('placeholder',errorMsg);
        // this.htmlElem.setAttribute('value','');
        // console.log(this.htmlElem.placeholder);
        // console.log('################################################');
        // console.log(this.htmlElem.value);
        this.htmlElem.style.borderBottomColor= '#fff';
        this.htmlElem.style.borderBottomColor = '#FF0000';
        //console.log('ssssss',errorMsg);
        return errorMsg;
      }
    }
    return null;
  }
}
