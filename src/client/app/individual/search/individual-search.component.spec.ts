// import { Component, OnInit, ViewChild, AfterViewInit, DebugElement, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { TabViewModule, SelectItem } from 'primeng/primeng';
// import { ReportsService } from '../reports.service';
// import { ModalDirective, ModalModule } from 'ngx-bootstrap';
// import { PaymentHistoryModalComponent } from '../../shared/modal-template/paymenthistory.modal';
// import { HelpModalComponent } from '../../shared/modal-template/help.modal';
// import { DownloadCSVService } from '../../shared/services/downloadcsv/downloadcsv.service';
// import { ReportsValidatorComponent } from '../reports-validator';
// import { ReportsValidationService } from '../reports-validation.service';
// import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
// import { Config } from '../../shared/config/env.config';
// // karma test imports
// import { ReportsSearchComponent } from '../search/reportssearch.component';
// import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
// import { ActivatedRoute, RouterModule, Router, Route } from '@angular/router';
// import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
// import { RouterTestingModule } from '@angular/router/testing';
// import { CommonModule, DatePipe, Location } from '@angular/common';
// //import { UxModule } from "./../../../internal_packages/uxd/v2/ux/uxModule";
// //import { Store, StoreModule } from '@ngrx/store';
// //import { CacheService } from 'ng2-cache/ng2-cache';

// // Be descriptive with titles here. The describe and it titles combined read like a sentence.
// describe('ReportsSearchComponent', () => {
//     let reportSearchCompInstance: ReportsSearchComponent;
//     let fixture: ComponentFixture<ReportsSearchComponent>;
//     let de: DebugElement;
//     let el: HTMLElement;
//     let getApplication: any;
//     //let cacheService: CacheService;
//     let inputParam: any;

//     // beforeEach(() => {
//     //     TestBed.configureTestingModule({
//     //         declarations: [DynamicFormComponent],
//     //         imports: [ReactiveFormsModule]
//     //     });

//     //     const fixture = TestBed.createComponent(DynamicFormComponent);
//     //     component = fixture.componentInstance;
//     // });

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//            // imports: [FormsModule, RouterModule,
//             //   CommonModule],
//             //schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
//             declarations: [ReportsSearchComponent] // declare the test component
//         });

//         const fixture = TestBed.createComponent(ReportsSearchComponent);
//         reportSearchCompInstance = fixture.componentInstance;
//     }));
//     // beforeEach(async(() => {
//     //     TestBed.compileComponents().then(() => {
//     //         fixture = TestBed.createComponent(ReportsSearchComponent);
//     //         reportSearchCompInstance = fixture.debugElement.children[0].componentInstance;
//     //     });
//     // }));
//     it('has a dummy spec to test 2 + 2', function () {
//         // An intentionally failing test. No code within expect() will never equal 4.
//         expect(2 + 2).toEqual(4);
//     });
// });
