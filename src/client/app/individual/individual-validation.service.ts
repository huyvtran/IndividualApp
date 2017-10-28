import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';
export class IndividualValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config :any = {
            'minlength': `Please enter at least ${validatorValue.requiredLength} characters`,
            'invalidFname' : `Please enter First Name`,
            'invalidLname' : `Please enter Last Name`,
            'acn15Char' : `ACN must be 15 characters`,
            'invalidACN'   : `Please enter a valid ACN`,
            'acnSpace'  : `Please enter an ACN`,
            'invalidTrackingId' : `Please enter a valid Tracking ID`,
            'TrackingIdNoSpace'  : `Please enter a Tracking ID`,
             'noToDate' : `To Date is required`,
             'noFromDate': `From Date is required`,
             'lessToDate' : `To Date is less than From Date`,
             'dateRangeMore90Days': `Date range is more than 90 days`,
             'validDate': `Please enter a valid Date`,
        };
        return config[validatorName];
    }
    static fNameValidator(control:any) {
        try {
            if( !control.value.match(/^$|\s+/) ) {
                return null;
            }else {
                return {'invalidFname':true};
            }
        }catch(e) { return null; }
    }
    static lNameValidator(control:any) {
        try {
            if( !control.value.match(/^$|\s+/) ) {
                return null;
            }else {
                return {'invalidLname':true};
            }
        }catch(e) { return null; }
    }
    static acnValidator(control:any) {
        try {
           if (control.value.trim().length === 0) {
               return { 'acnSpace' : true};
            }
           if (!control.value.match(/^[0-9a-zA-Z]+$/)) {
                 return { 'invalidACN' : true };
            }
           if (control.value.length < 15  || control.value.length > 15) {
               return { 'acn15Char' : true};
            }
        }catch(e) {};// tslint:disable-line
            return null;
    }
    static trackingIdValidator(control:any) {
        try {
           if (control.value.length === 0) {
               return { 'TrackingIdNoSpace' : true};
            }
            if (!control.value.match(/^[0-9a-zA-Z]+$/)) {
                 return { 'invalidTrackingId' : true };
            }
        }catch(e) {};// tslint:disable-line
            return null;
    }
    static DateValidator(actrl: AbstractControl) {
        try {
            let fromDate = actrl.get('fromDate').value;
            let toDate = actrl.get('toDate').value;
                if (!fromDate && !toDate && !actrl.get('fromDate').hasError('noFromDate')) {
                    actrl.get('fromDate').setErrors( {'noFromDate': true} );
                    return { 'noFromDate': true };
                }else if (fromDate && !toDate &&  !actrl.get('toDate').hasError('noToDate')) {
                    console.log(1);
                    actrl.get('toDate').setErrors( {'noToDate': true} );
                    return { 'noToDate': true };
                } else if (!toDate &&  !actrl.get('toDate').hasError('noToDate')) {
                    console.log(1);
                    actrl.get('toDate').setErrors( {'noToDate': true} );
                    return { 'noToDate': true };
                }else if (!fromDate && toDate && !actrl.get('fromDate').hasError('noFromDate')) {
                    console.log(2);
                    actrl.get('fromDate').setErrors( {'noFromDate': true} );
                    return { 'noFromDate': true };
                }else if (fromDate && ! moment(fromDate).isValid() &&  !actrl.get('fromDate').hasError('validDate')) {
                    actrl.get('fromDate').setErrors( {'validDate': true} );
                    // console.log('a');
                    return { 'validDate': true };
                }else if (toDate && ! moment(toDate).isValid() &&  !actrl.get('toDate').hasError('validDate')) {
                    actrl.get('toDate').setErrors( {'validDate': true} );
                    return { 'validDate': true };
                }else if (toDate  && moment(toDate).isAfter(moment(), 'day') &&  !actrl.get('toDate').hasError('validDate')) {
                    // console.log(5);
                    actrl.get('toDate').setErrors( {'validDate': true} );
                    return { 'validDate': true };
                }else if (fromDate  && moment(fromDate).isAfter(moment(), 'day') &&  !actrl.get('fromDate').hasError('validDate')) {
                    // console.log('a1');
                    actrl.get('fromDate').setErrors( {'validDate': true} );
                    return { 'validDate': true };
                } else if (fromDate && toDate && moment(fromDate).isAfter(toDate, 'day') &&
                !actrl.get('fromDate').hasError('lessToDate') &&  !actrl.get('fromDate').hasError('validDate')) {
                    console.log(3);
                    actrl.get('fromDate').setErrors( {'lessToDate': true} );
                    return { 'lessToDate': true };
                }else {
                    // if (fromDate && toDate && !moment(fromDate).isAfter(toDate, 'day') ) {
                    //     actrl.get('fromDate').setErrors( null );
                    //     if ( moment(toDate).diff(moment(fromDate), 'days') > 90) {
                    //         // actrl.get('fromDate').setErrors( {'dateRangeMore90Days': true} );
                    //         // return { 'dateRangeMore90Days': true };
                    //     } else {
                    //       //actrl.get('fromDate').setErrors( null );
                    //     }
                    // }
                    return null;
                }
        }catch(e) { return null;}
    }
}
