import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TabViewModule, SelectItem, DataTable } from 'primeng/primeng';
import { IndividualService } from '../individual.service';
import { ModalDirective, ModalModule } from 'ngx-bootstrap';
import { PaymentHistoryModalComponent } from '../../shared/modal-template/paymenthistory.modal';
import { HelpIndividualModalComponent } from '../../shared/modal-template/helpindividual.modal';
import { PopupModalComponent } from '../../shared/modal-template/popup.modal';
import { DownloadCSVService } from '../../shared/services/downloadcsv/downloadcsv.service';
import { IndividualValidatorComponent } from '../individual-validator';
import { IndividualValidationService } from '../individual-validation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmModalComponent } from '../../shared/modal-template/confirm-modal';
import { Config } from '../../shared/config/env.config';
import * as moment from 'moment';
import * as lodash from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
//import { AlertService, AlertMessage } from './shared/service/alert.service';
declare var _: any;
_ = lodash;

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'individual-search',
    templateUrl: 'individual-search.component.html',
    styleUrls: ['individual-search.component.css'],
})
export class IndividualSearchComponent implements OnInit, AfterViewInit {
    public isSelectAll: boolean = false;
    public isReleaseToWem: any;
    public individualSearchList: any = [];
    public individualSearchListTemp: any = [];
    public currentIndividualSearchList: any = [];
    public userACNError: string = '';
    public trackingId: string = '';
    public trackingIdError: string = '';
    public hicn: string = '';
    public hicnError: string = '';
    public countMessage: string = '';
    public noSearchResult: string = '';
    public showSearchCriteria: boolean = false;
    public showResult: boolean = false;
    public showPopup: boolean = false;
    public paginateMessage: string = '';
    public userACN: string = '';
    public API_URL: string = Config.API;
    public downloadData: any = [];
    public userNameObj: any = {
        firstName: '',
        lastName: ''
    };
    public individualSearchByNameForm: any;
    public individualSearchByACNForm: any;
    public individualSearchByTrackingIdForm: any;
    public individualSearchByRTWForm: any;
    public timer: any;
    public responsePdf: any;
    public fromDate: Date;
    public toDate: Date;
    public maxFromDate: Date;
    public maxToDate: Date;
    public calendarTextBoxMarginBtm = { 'margin-bottom': '0px' };
    @ViewChild('helpindividualModal') helpindividualModal: HelpIndividualModalComponent;
    @ViewChild('popupModal') popupModal: PopupModalComponent;
    @ViewChild('dt') public dt: DataTable;
    @ViewChild('confirmModal') confirmModal: ConfirmModalComponent;
    public actualRecords: any = []; // To retain the records while update release to wem is getting failed
    public pdfacn: any;
    /**
     * Constructor function
     * @param individualService
     */
    constructor(public individualService: IndividualService,
        private formBuilder: FormBuilder,
        public downloadCSV: DownloadCSVService,
        private http: Http) {
        this.calendarTextBoxMarginBtm['margin-bottom'] = this.isIE() ? '-6px' : '0px';
    }
    ngOnInit() {
        this.resetAllFormBuilders();
    }
    ngAfterViewInit() {
        this.individualSearchByNameForm.controls['firstName'].markAsUntouched();
        this.individualSearchByNameForm.controls['firstName'].updateValueAndValidity();
    }
    public isIE() {
        let ua = window.navigator.userAgent;
        if (ua.indexOf('MSIE ') > 0 || ua.indexOf('Trident/') > 0 || ua.indexOf('Edge/') > 0) {
            return true;
        } else { return false; }
    }

    /**
     *CancelApplication
     * @param acn
     */
    public cancelApplication(acn: any) {
        this.individualService.cancelApplicationService(acn).subscribe((data: any) => {
            let appStatus: string = data.cancelApplicationResponse.applicationStatus.applicationStatus;
            if (appStatus === 'CANCELLED') {
                let requestData: any = { 'acn': acn, 'searchBy': 'ACN' };
                this.individualService.searchIndividualService(requestData).subscribe((data: any) => {
                    let responseData: any = data.appReportLineItem;
                    let rowObject: any = responseData[0];
                    // find matched item
                    let rowObjToModify = _.find(this.individualSearchList, ['acn', acn]);
                    _.forOwn(rowObjToModify, function (value: any, key: any) {
                        rowObjToModify[key] = rowObject[key];
                    });
                    this.actualRecords = _.map(this.individualSearchList, _.clone);

                }, (error: any) => { console.log('error : ' + error); });
            }
        }, (error: any) => { console.log('error : ' + error); });
    }
    /**
     *function  to select/de-select all displayed records to update release to wem
     */
    public doSelectAll() {
        let chck: any = this.isSelectAll;
        let displayedRows: any = this.dt.dataToRender; // dt primeNg table object
        _.forEach(this.dt.dataToRender, function (rowObj: any, index: any) {
            rowObj['releaseToWem'] = chck;
        });
    }
    /**
     * updateReleaseToWem Button (Save) action
     */
    public updateReleaseToWem() {
        let serviceInput: any = this.getUpdateReleaseToWemServiceInput();
        this.individualService.updateReleaseToWemService(serviceInput).subscribe((data: any) => {
            this.updateIndividualSearchList(data);
        }, (error: any) => {
            let data: any = { status: 'Error' };
            this.updateIndividualSearchList(data);
        });
    }
    public getUpdateReleaseToWemServiceInput() {
        let displayedRows: any = this.dt.dataToRender; // dt primeNg table object
        let serviceInput: any = [];
        _.forEach(displayedRows, function (rowObj: any, index: any) {
            let input: any = { 'acn': rowObj.acn, 'releaseToWem': rowObj.releaseToWem };
            serviceInput.push(input);
        });
        return serviceInput;
    }
    /**
     * Update IndividualSearchList after successful updateReleaseToWem
     */
    public updateIndividualSearchList(data: any) {
        //data.status = 'error';
        let displayedRows: any = this.dt.dataToRender; // dt primeNg table object
        let recordList: any = null;
        if (data.status === 'Success') {
            recordList = _.map(this.individualSearchList, _.clone);
            _.forEach(displayedRows, function (rowObj: any, index: any) {
                let rowObjToModify = _.find(recordList, ['acn', rowObj.acn]);
                rowObjToModify['releaseToWem'] = rowObj.releaseToWem;
            });
            this.individualSearchList = _.map(recordList, _.clone);
            this.actualRecords = _.map(this.individualSearchList, _.clone);
        } else {
            let localRecords = this.actualRecords;
            displayedRows = this.dt.dataToRender;
            _.forEach(this.dt.dataToRender, function (rowObj: any, index: any) {
                let rowObjToModify = _.find(localRecords, ['acn', rowObj.acn]);
                rowObj.releaseToWem = rowObjToModify['releaseToWem'];
            });
            this.individualSearchList = _.map(this.actualRecords, _.clone);
        }
    }
    /**
     * Initialize Date
     */
    initDateFields() {
        this.toDate = new Date();
        this.maxToDate = new Date();
        this.maxFromDate = new Date();
    }
    public getIndividualPDF(acn: string, appType: string) {
        this.pdfacn = acn;
        this.responsePdf = 'http://30.135.210.43:9080/olsadminconsole/individual/admin/individual/getHixIndividualPdfByAcn?acn='
            + acn + '&hixAppType=' + appType;
        //this.responsePdf = this.API_URL + 'individual/getHixIndividualPdfByAcn?acn=' + acn + '&hixAppType=' + appType;
        this.getPdfService().subscribe((response: any) => {
            if (response.status === 200) {
                console.log(this.showPopup);
                window.open(this.responsePdf, '_blank');
            }
        }, (error: any) => {
            console.log('error : ' + error);
            this.showPopup = true;
            this.popupModal.show();
        }
        );
    }
    public getPdfService(): Observable<Response> {
        return this.http.get(this.responsePdf)
            .map(res => res)
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
    public buildIndividualSearchByNameForm() {
        this.individualSearchByNameForm = this.formBuilder.group({
            'firstName': ['', [IndividualValidationService.fNameValidator, Validators.minLength(2)]],
            'lastName': ['', [IndividualValidationService.lNameValidator, Validators.minLength(2),]],
        });
    }
    public buildIndividualSearchByACNForm() {
        this.individualSearchByACNForm = this.formBuilder.group({
            'acn': ['', [IndividualValidationService.acnValidator]],
        });
    }
    public buildIndividualSearchByTrackingIdForm() {
        this.individualSearchByTrackingIdForm = this.formBuilder.group({
            'trackingNo': ['', [IndividualValidationService.trackingIdValidator]],
        });
    }
    public buildIndividualSearchByRTWForm() {
        this.individualSearchByRTWForm = this.formBuilder.group({
            'fromDate': [null, []],
            'toDate': [null, []],
            'isReleaseToWem': [false, []],
        }, {
                validator: IndividualValidationService.DateValidator
            });
        this.initDateFields();
    }
    public resetIndividualSearchByNameForm() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.buildIndividualSearchByNameForm();
        }, 500);
    }
    public resetIndividualSearchByACNForm() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.buildIndividualSearchByACNForm();
        }, 500);
    }

    public resetIndividualSearchByTrackingIdForm() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.buildIndividualSearchByTrackingIdForm();
        }, 500);
    }
    public resetIndividualSearchByRTWForm() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.buildIndividualSearchByRTWForm();
        }, 500);
    }
    public resetAllFormBuilders() {
        this.buildIndividualSearchByNameForm();
        this.buildIndividualSearchByACNForm();
        this.buildIndividualSearchByTrackingIdForm();
        this.buildIndividualSearchByRTWForm();
    }
    /**
     * Search By Name
     */
    public searchIndividualByName() {
        this.applyMarkAsTouched(this.individualSearchByNameForm);
        if (this.individualSearchByNameForm.dirty && this.individualSearchByNameForm.valid) {
            let data = this.serviceData('name');
            this.showSearchCriteria = !this.showSearchCriteria;
            this.serviceInvoke(data);
        } else {
            this.individualSearchList = null;
        }
        return false;
    }
    applyMarkAsTouched(selectedForm: any) {
        for (let inner in selectedForm.controls) {
            selectedForm.get(inner).markAsTouched();
            selectedForm.get(inner).updateValueAndValidity();
        }
    }
    /**
     * Search by ACN
     */
    public searchIndividualByACN() {
        this.userACNError = '';
        this.applyMarkAsTouched(this.individualSearchByACNForm);
        if (this.individualSearchByACNForm.dirty && this.individualSearchByACNForm.valid) {
            let data = this.serviceData('acn');
            this.showSearchCriteria = !this.showSearchCriteria;
            this.serviceInvoke(data);
        } else {
            this.individualSearchList = null;
        }
        return false;
    }


    /**
     * Search by Tracking ID
     */
    public searchIndividualByTrackingId() {
        this.trackingIdError = '';
        this.applyMarkAsTouched(this.individualSearchByTrackingIdForm);
        if (this.individualSearchByTrackingIdForm.dirty && this.individualSearchByTrackingIdForm.valid) {
            let data = this.serviceData('tid');
            this.showSearchCriteria = !this.showSearchCriteria;
            this.serviceInvoke(data);
        } else {
            this.individualSearchList = null;
        }
        return false;
    }

    /**
     * Search by HICN
     */
    public searchIndividualByRTW() {
        this.hicnError = '';
        this.applyMarkAsTouched(this.individualSearchByRTWForm);
        this.isReleaseToWem = this.individualSearchByRTWForm.controls['isReleaseToWem'].value;
        if (this.individualSearchByRTWForm.dirty && this.individualSearchByRTWForm.valid) {
            let data = this.serviceData('rtw');
            this.showSearchCriteria = !this.showSearchCriteria;
            this.serviceInvoke(data);
        } else {
            this.individualSearchList = null;
        }
        return false;
    }

    /**
     * Web service invoke
     */
    public serviceInvoke(postData: object) {
        this.noSearchResult = '';
        this.countMessage = '';
        this.individualSearchList = '';
        this.individualService.searchIndividualService(postData).subscribe((data: any) => {
            this.showResult = true;
            this.individualSearchList = data.appReportLineItem;
            this.actualRecords = _.map(this.individualSearchList, _.clone);
            console.log('---serviceInvoke--this.actualRecords---' + this.actualRecords);
            if (this.individualSearchList)
                this.checkIndividualsData(this.individualSearchList);
            if (!this.individualSearchList || !this.individualSearchList.length) {
                this.noSearchResult = 'No Records found. Please refine your search criteria';
            } else if (this.individualSearchList.length > 1) {
                this.countMessage = ': ' + this.individualSearchList.length + ' Results Found';
            } else {
                this.countMessage = ': ' + this.individualSearchList.length + ' Result Found';
            }
            this.paginateMessage = this.getPaginateMessage();
        },
            (error: any) => { console.log('error : ' + error); });
    }

    /**
     *service data creation
     */
    public serviceData(type: string) {
        let data: any = '';

        switch (type) {
            case 'name': data = {
                'firstName': this.userNameObj.firstName,
                'lastName': this.userNameObj.lastName,
                'searchBy': 'NAME'
            };
                break;
            case 'acn': data = {
                'acn': this.userACN,
                'searchBy': 'ACN'
            };
                break;
            case 'tid': data = {
                'trackingID': this.trackingId,
                'searchBy': 'TRACKINGID'
            };
                break;
            case 'rtw': data = {
                'fromDateStr': (this.fromDate) ? moment(this.fromDate).format('MM/DD/YYYY') : '',
                'toDateStr': (this.toDate) ? moment(this.toDate).format('MM/DD/YYYY') : '',
                'releaseToWem': this.isReleaseToWem,
                'searchBy': 'DATEANDRELTOWEM'

            };
                break;
        }

        return data;
    }

    /**
     * Pagination page click event & message
     */
    public paginationInfo(event: any) {
        this.isSelectAll = false;
        if (this.individualSearchListTemp.length !== 0) {
            let number1 = (event.first + event.rows + 1) - event.rows;
            let number2 = ((event.first + event.rows) > this.individualSearchListTemp.length)
                ? this.individualSearchListTemp.length : event.first + event.rows;
            this.paginateMessage = number1 + '-' + number2 + ' of ' + this.individualSearchListTemp.length + ' Results';
            this.currentPageInfo(number1, number2, this.individualSearchListTemp);
        } else {
            let number1 = (event.first + event.rows + 1) - event.rows;
            let number2 = ((event.first + event.rows) > this.individualSearchList.length)
                ? this.individualSearchList.length : event.first + event.rows;
            this.paginateMessage = number1 + '-' + number2 + ' of ' + this.individualSearchList.length + ' Results';
            this.currentPageInfo(number1, number2, this.individualSearchList);
        }
    }

    /**
     * Pagination message on click
     */
    public getPaginateMessage() {
        let message: string = '';

        if (!this.individualSearchList || !this.individualSearchList.length) {
            message = '';
        } else if (this.individualSearchList.length > 10) {
            message = '1-10' + ' of ' + this.individualSearchList.length + ' Results';
        } else if (this.individualSearchList.length === 1) {
            message = '1-' + this.individualSearchList.length + ' of ' + this.individualSearchList.length + ' Result';
        } else {
            message = '1-' + this.individualSearchList.length + ' of ' + this.individualSearchList.length + ' Results';
        }
        return message;
    }

    /**
     * Checking Individuals data length
     * @param data
     */
    public checkIndividualsData(data: any) {
        if (data) {
            if (data.length > 0 && data.length < 10) {
                this.currentPageInfo(1, data.length, data);
            } else if (data.length > 10) {
                this.currentPageInfo(1, 10, data);
            }
        }
        if (!data || !data.length) {
            this.downloadData = [];
        }
    }

    /**
     * Current page user details on datatable
     * @param number1
     * @param number2
     * @param data
     */
    public currentPageInfo(number1: number, number2: number, data: any) {
        let j: number = 0;
        this.currentIndividualSearchList = [];
        for (let i: number = number1 - 1; i < number2; i++) {
            this.currentIndividualSearchList[j] = data[i];
            j++;
        }
        this.saveDownloadData();
    }

    /**
     * Current data displayed on table stored to new object array
     */
    public saveDownloadData() {
        this.downloadData = [];
        this.currentIndividualSearchList.map((item: any) => {
            return {
                NO: item.rowNumber,
                ACN: item.acn,
                APP_STATUS: item.applicationStatus,
                APP_TYPE: item.appReportType,
                BRAND: item.brand,
                ST: item.state,
                FIRST: item.firstName,
                MI: item.middleInitial,
                LAST: item.lastName,
                REQ_EFF: item.requestEffectiveDate,
                FUT_REQ_EFF: item.futureReqEffDate,
                CREATE_PARTNER: item.createPartnerID,
                SUBMIT_PARTNER: item.submitPartnerID,
                PARENT_PRODUCER: item.parentProducerID,
                APP_SOURCE: item.appSource,
                APP_SUB_SOURCE: item.appSubSource,
                STATUS_REASON: item.statusReason,
                EXPIRATION: item.expirationDate,
                SUBMITTED: item.submittedTimeStamp,
                CANCELLED: item.cancelledTimeStamp,
                EMAIL_SENT: item.emailSentTimeStamp,
                IMAGING_SENT: item.imagingSentTimeStamp,
                AGENCY: item.agencyName,
                AGENT_TIN: item.agentTIN,
                AGENT_FIRST: item.agentFirstName,
                AGENT_MI: item.agentMiddleInitial,
                AGENT_LAST: item.agentLastName,
                AGENT_STATE_ID: item.agentStateID,
                PARENT_AGENCY: item.parentAgencyName,
                PARENT_AGENT_TIN: item.parentAgentTIN,
                PARENT_AGENT_FIRST: item.parentAgentFirstName,
                PARENT_AGENT_MI: item.parentAgentMI,
                PARENT_AGENT_LAST: item.parentAgentLastName,
                PARENT_AGENT_STATE_ID: item.parentAgentStateID,
                APPLYING_FOR_OTHERS: item.applyForOthers,
                AGENT_ASSISTED: item.agentAssisted,
                AGENT_SUBMITTED: item.agentSubmitted,
                WORKING_WITH_AGENT: item.workingWithAgent,
                PRODUCT_NAME: item.productDisplayName,
                UPDATED_ID: item.hixUpdatedId,
                CREATED_ID: item.createdBy,
                CREATED: item.paymentCreateDate
            }// tslint:disable-line
        }).forEach((item: any) => this.downloadData.push(item));
        //console.log(JSON.stringify(this.downloadData));
    }

    /**
     * Download current Page details
     */
    public downloadCurrentPage() {
        this.downloadCSV.downloadCurrentData(this.downloadData, 'Individuals');
    }

    /**
    * Sort result and save current
    * @param event
    */
    public sortResult(event: any) {
        this.isSelectAll = false;
        //console.log(event.sortResult);
        //console.log(event.sortResult.length);
    }

    /**
     * Filter result and change the pagination message
     * @param event
     */
    public filterResult(event: any) {
        if (event.filteredValue) {
            this.isSelectAll = false;
            this.checkIndividualsData(event.filteredValue);
            this.individualSearchListTemp = event.filteredValue;
            if (event.filteredValue.length > 1) {
                this.countMessage = ': ' + event.filteredValue.length + ' Results Found';
            } else {
                this.countMessage = ': ' + event.filteredValue.length + ' Result Found';
            }
        } else {
            this.individualSearchListTemp = [];
        }

        if (!event.filteredValue || !event.filteredValue.length) {
            this.paginateMessage = '';
        } else if (event.filteredValue.length > 10) {
            this.paginateMessage = '1-10' + ' of ' + event.filteredValue.length + ' Results';
        } else if (event.filteredValue.length === 1) {
            this.paginateMessage = '1-' + event.filteredValue.length + ' of ' + event.filteredValue.length + ' Result';
        } else {
            this.paginateMessage = '1-' + event.filteredValue.length + ' of ' + event.filteredValue.length + ' Results';
        }
    }

    /**
     * Reset functionality
     */
    public resetResult() {
        this.countMessage = '';
        this.individualSearchList = null;
        this.userACN = '';
        this.userACNError = '';
        this.trackingId = '';
        this.trackingIdError = '';
        this.hicnError = '';
        this.userNameObj.firstName = '';
        this.userNameObj.lastName = '';
        this.paginateMessage = '';
        this.showResult = true;
        this.noSearchResult = '';
        this.countMessage = '';
        this.individualSearchList = null;
        this.individualSearchListTemp = [];
    }
}
