import { Component, OnInit, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdministrationCalendarValidatorComponent } from '../administration-calendar-validator';
import { AdministrationValidationService } from '../administration-validation.service';
import { AdministrationService } from '../administration.service';
import { Calendar } from 'primeng/primeng';
import * as moment from 'moment';
import { DownloadCSVService } from '../../shared/services/downloadcsv/downloadcsv.service';

@Component({
    moduleId: module.id,
    selector: 'riskadjustment-tab',
    templateUrl: 'riskadjustment.component.html',
    styleUrls: ['riskadjustment.component.css'],
})
export class RiskAdjustmentComponent implements OnInit {
    public riskAdjustmentReportForm: any;
    public riskaAdjustmentReportList: any;
    public fromDate: Date;
    public toDate: Date;
    public downloadData: any = [];
    public maxFromDate: Date;
    public maxToDate: Date;
    public noSearchResult: string = '';
    public showForm: boolean = false;
    public calendarTextBoxMarginBtm: any;

    constructor(private formBuilder: FormBuilder,
        private adminService: AdministrationService,
        public downloadCSV: DownloadCSVService) { // tslint:disable-line
    }

    /**
     * By System Form initialization
     */
    ngOnInit() { // tslint:disable-line
        this.buildRiskAdjustmentReportForm();
    }

    /**
    * By System Form initialization
    */
    public initDateFields() {
        this.maxToDate = new Date();
        this.maxFromDate = new Date();
    }

    /**
    * By System Form initialization
    */
    public buildRiskAdjustmentReportForm() {
        this.riskAdjustmentReportForm = this.formBuilder.group({
            'fromDate': [null, []],
            'toDate': [null, []]
        }, {
                validator: AdministrationValidationService.DateValidator
            });

        this.initDateFields();
    }

    /**
     * Toggle search accrodance
     */
    public toggleSearchAccordance() {
        this.showForm = !this.showForm;
    }

    /**
     * Toggle search accrodance
     */
    applyMarkAsTouched(selectedForm: any) {
        for (let inner in selectedForm.controls) {
            selectedForm.get(inner).markAsTouched();
            selectedForm.get(inner).updateValueAndValidity();
        }
    }

    /**
     * Toggle search accrodance
     */
    public searchReport() {
        this.applyMarkAsTouched(this.riskAdjustmentReportForm);
        if (this.riskAdjustmentReportForm.dirty && this.riskAdjustmentReportForm.valid) {
            let data = {
                'fromDateStr': (this.fromDate) ? moment(this.fromDate).format('MM/DD/YYYY') : '',
                'toDateStr': (this.toDate) ? moment(this.toDate).format('MM/DD/YYYY') : ''
            };
            this.serviceInvoke(data);
        } else {
            this.riskaAdjustmentReportList = null;
        }
        return false;
    }

    /**
     * By System Form initialization
     */
    public serviceInvoke(postData: any) {
        console.log(postData);
        // this.adminService.enrollmentRiskAdjustmentReportService(postData).subscribe((data: any) => {
        this.adminService.getReportFromJson().subscribe((data: any) => {
            this.resetResult();
            this.showForm = !this.showForm;
            this.riskaAdjustmentReportList = data;
            console.log(data);
            if (!this.riskaAdjustmentReportList || !this.riskaAdjustmentReportList.length) {
                this.noSearchResult = 'No Records found. Please refine your search criteria';
            }
        }, (error: any) => { console.log('error : ' + error); this.noSearchResult = 'error'; });
    }

    /**
     * Reset functionality
     */
    public resetResult() {
        this.noSearchResult = '';
        this.riskaAdjustmentReportList = null;
        this.buildRiskAdjustmentReportForm();
    }
    public saveAllDownloadData() {
        this.downloadData = [];
        this.riskaAdjustmentReportList.map((items: any) => {
            return {
                ACN: items.acn,
                CONFORMATION_NUMBER: items.confirmationNo
                // APP_STATUS: item.applicationStatus,
                // APP_SUB_STATUS: item.appSubStatus,
                // VERSION: item.applicationVersion,
                // STATE: item.state,
                // FIRST_NAME: item.firstName,
                // LAST_NAME: item.lastName,
                // DOB: item.dob,
                // GENDER: item.sex,
                // REQ_EFF: item.requestEffectiveDate,
                // EB: item.ebReply,
                // ACS: item.acsSentTimeStamp,
                // MEDYSIS: item.medisysSentTimeStamp,
                // IMAGING: item.imagingSentTimeStamp,
                // HOV: item.hovSentTimeStamp,
                // COSMO: item.cosmoSentTimeStamp,
                // HICN: item.medicareClaimNo,
                // PRODUCT_ID: item.productId,
                // PRODUCT_NAME: item.productDisplayName,
                // DOCUMENT_TYPE: item.documentType

            }// tslint:disable-line
        }).forEach((item: any) => this.downloadData.push(item));
        //console.log(JSON.stringify(this.downloadData));
        this.downloadPage();
    }

    public downloadPage() {
        console.log(this.downloadData);
        this.downloadCSV.downloadCurrentData(this.downloadData, 'RiskAdjustment');
    }
}
