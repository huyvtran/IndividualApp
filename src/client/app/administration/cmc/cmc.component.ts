import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TabViewModule, SelectItem } from 'primeng/primeng';
import { AdministrationService } from '../administration.service';
import { ModalDirective, ModalModule } from 'ngx-bootstrap';
import { AdministrationValidatorComponent } from '../administration.validator';
import { AdministrationValidationService } from '../administration-validation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Config } from '../../shared/config/env.config';
import { Http, Headers, Response, Jsonp, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'cmc-tab',
    templateUrl: 'cmc.component.html',
    styleUrls: ['cmc.component.css'],
})
export class CMCComponent implements OnInit, AfterViewInit {

    public searchList: any = [];
    public countMessage: string = '';
    public noSearchResult: string = '';
    public showSearchCriteria: boolean = false;
    public showSuccess: boolean = false;
    public showFailure: boolean = false;
    public searchByHCIDForm: any;
    public message: any;
    public hcid: string = '';
    public timer: any;
    public resultTab: boolean = true;
    /**
     * Constructor function
     * @param
     */
    constructor(public reportService: AdministrationService,
        private formBuilder: FormBuilder,
        private http: Http) {
    }
    ngOnInit() {
        this.resetAllFormBuilders();
    }
    ngAfterViewInit() {
        //dskfkjdsj
    }

    public resetAllFormBuilders() {
        this.buildSearchByHCIDForm();
    }

    public buildSearchByHCIDForm() {
        this.searchByHCIDForm = this.formBuilder.group({
            'hcid': ['', [AdministrationValidationService.hcidValidator]],
        });
    }

    public resetSearchByHCIDForm() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.buildSearchByHCIDForm();
        }, 500);
    }
    public resetResult(event: any) {
        this.hcid = '';
        this.showSuccess = false;
        this.showFailure = false;
        this.noSearchResult = '';
    }

    applyMarkAsTouched(selectedForm: any) {
        for (let inner in selectedForm.controls) {
            selectedForm.get(inner).markAsTouched();
            selectedForm.get(inner).updateValueAndValidity();
        }
    }

    public hcidCheck(event: any) {
        console.log(event.index);
        this.resultTab = (event.index === 2) ? false : true;
    }

    public searchByHCID() {
        console.log('HCID' + this.hcid);
        this.applyMarkAsTouched(this.searchByHCIDForm);
        if (this.searchByHCIDForm.dirty && this.searchByHCIDForm.valid) {
            let data: any = '';
            data = {
                'appSearchCriteriaBean': {
                    'medicareClaimNo': this.hcid,
                    'searchBy': 'HCID'
                }
            };
            this.serviceInvoke(data);
        }
    }
    public serviceInvoke(postData: object) {
        this.noSearchResult = '';
        this.countMessage = '';
        this.searchList = '';
        // if(postData.appSearchCriteriaBean.medicareClaimNo == '1143'){

        // }
        if (this.hcid === '1143') {
            console.log('1143');
            this.showSuccess = true;
            this.showFailure = false;
            this.message = 'HCID is available in the T&R file';
        } else if (this.hcid === '1234') {
            console.log('1234');
            this.showFailure = true;
            this.showSuccess = false;
            this.message = 'Sorry! We are unable to find the HCID in the T&R file';
        } else if (this.hcid === 'error') {
            console.log('error');
            this.showFailure = true;
            this.showSuccess = false;
            this.message = 'Sorry! Service is temporarily unavailable. Please try again later';
        }
        // this.reportService.searchReportService(postData).subscribe((data: any) => {
        //     this.showResult = true;
        //     this.reportSearchList = data.appReportLineItem;
        //     if(this.reportSearchList)
        //     this.checkReportsData(this.reportSearchList);
        //     if (!this.reportSearchList || !this.reportSearchList.length) {
        //         this.noSearchResult = 'No Records found. Please refine your search criteria';
        //     } else if (this.reportSearchList.length > 1) {
        //         this.countMessage = ': ' + this.reportSearchList.length + ' Results Found';
        //     } else {
        //         this.countMessage = ': ' + this.reportSearchList.length + ' Result Found';
        //     }
        //     this.paginateMessage = this.getPaginateMessage();
        // },
        //     (error: any) => { console.log('error : ' + error); this.userNameError = 'error'; });
    }
    // public searchReportByHICN() {
    //     this.hicnError = '';
    //     this.applyMarkAsTouched(this.reportSearchByHICNForm);
    //     if (this.reportSearchByHICNForm.dirty && this.reportSearchByHICNForm.valid) {
    //         let data = this.serviceData('hicn');
    //         this.showSearchCriteria = !this.showSearchCriteria;
    //         this.serviceInvoke(data);
    //     } else {
    //         this.reportSearchList = null;
    //     }
    //     return false;
    // }

}
