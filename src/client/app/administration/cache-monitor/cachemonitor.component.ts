import { Component, OnInit, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Calendar } from 'primeng/primeng';
import * as moment from 'moment';

@Component({
    moduleId: module.id,
    selector: 'cachemonitor-tab',
    templateUrl: 'cachemonitor.component.html',
    styleUrls: ['cachemonitor.component.css'],
})
export class CacheMonitorComponent implements OnInit {

    constructor() { // tslint:disable-line
    }

    /**
     * By System Form initialization
     */
    ngOnInit() { // tslint:disable-line
    }

}
