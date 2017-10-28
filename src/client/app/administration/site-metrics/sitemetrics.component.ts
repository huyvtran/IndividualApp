import { Component, OnInit, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Calendar } from 'primeng/primeng';
import * as moment from 'moment';

@Component({
    moduleId: module.id,
    selector: 'sitemetrics-tab',
    templateUrl: 'sitemetrics.component.html',
    styleUrls: ['sitemetrics.component.css'],
})
export class SiteMetricsComponent implements OnInit {

    constructor() { // tslint:disable-line
    }

    /**
     * By System Form initialization
     */
    ngOnInit() { // tslint:disable-line
    }

}
