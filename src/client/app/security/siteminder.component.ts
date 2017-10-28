import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'siteminder-page',
    template: '<div>Login success</div>'
})
export class SiteminderComponent {


    constructor() {
        console.log('Logged siteminder login');
    }
}
