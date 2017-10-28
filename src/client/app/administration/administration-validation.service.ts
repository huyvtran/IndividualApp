import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';

export class AdministrationValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config: any = {
            'noToDate': `To Date is required`,
            'noFromDate': `From Date is required`,
            'lessToDate': `To Date is less than From Date`,
            'validDate': `Please enter a valid Date`,
            'invalidHCID' : `Please enter a valid HCID`,
            'hcidNoSpace'  : `Please enter a HCID`,
        };
        return config[validatorName];
    }

    static hcidValidator(control:any) {
        try {
           if (control.value.length === 0) {
               return { 'hcidNoSpace' : true};
            }
            if (!control.value.match(/^[0-9a-zA-Z]+$/)) {
                 return { 'invalidHCID' : true };
            }
        }catch(e) {};// tslint:disable-line
            return null;
    }

    static DateValidator(actrl: AbstractControl) {
        try {
            let fromDate = actrl.get('fromDate').value;
            let toDate = actrl.get('toDate').value;
            if (!fromDate && !toDate && !actrl.get('fromDate').hasError('noFromDate')) {
                actrl.get('fromDate').setErrors({ 'noFromDate': true });
                return { 'noFromDate': true };
            } else if (fromDate && !toDate && !actrl.get('toDate').hasError('noToDate')) {
                console.log(1);
                actrl.get('toDate').setErrors({ 'noToDate': true });
                return { 'noToDate': true };
            } else if (!toDate && !actrl.get('toDate').hasError('noToDate')) {
                console.log(1);
                actrl.get('toDate').setErrors({ 'noToDate': true });
                return { 'noToDate': true };
            } else if (!fromDate && toDate && !actrl.get('fromDate').hasError('noFromDate')) {
                console.log(2);
                actrl.get('fromDate').setErrors({ 'noFromDate': true });
                return { 'noFromDate': true };
            } else if (fromDate && !moment(fromDate).isValid() && !actrl.get('fromDate').hasError('validDate')) {
                actrl.get('fromDate').setErrors({ 'validDate': true });
                // console.log('a');
                return { 'validDate': true };
            } else if (toDate && !moment(toDate).isValid() && !actrl.get('toDate').hasError('validDate')) {
                actrl.get('toDate').setErrors({ 'validDate': true });
                return { 'validDate': true };
            } else if (toDate && moment(toDate).isAfter(moment(), 'day') && !actrl.get('toDate').hasError('validDate')) {
                // console.log(5);
                actrl.get('toDate').setErrors({ 'validDate': true });
                return { 'validDate': true };
            } else if (fromDate && moment(fromDate).isAfter(moment(), 'day') && !actrl.get('fromDate').hasError('validDate')) {
                // console.log('a1');
                actrl.get('fromDate').setErrors({ 'validDate': true });
                return { 'validDate': true };
            } else if (fromDate && toDate && moment(fromDate).isAfter(toDate, 'day') &&
                !actrl.get('fromDate').hasError('lessToDate') && !actrl.get('fromDate').hasError('validDate')) {
                console.log(3);
                actrl.get('fromDate').setErrors({ 'lessToDate': true });
                return { 'lessToDate': true };
            } else {
                return null;
            }
        } catch (e) { return null; }
    }
}
