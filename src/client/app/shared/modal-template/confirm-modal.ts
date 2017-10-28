import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'sd-confirm',
    templateUrl: 'confirm-modal.html',
    styleUrls: ['modal-custom.css']
})

export class ConfirmModalComponent {

    @ViewChild('confirmModal') public confirmModal: ModalDirective;
    @Input() title?: string;
    @Input() dialogMsgToUser?: string;
    @Input() confirmBtnLabel?: string;
    @Input() cancelBtnLabel?: string;
    @Output() childEvent = new EventEmitter();
    inputObjectFromParent: any;

    constructor(private router:Router) {
        // console.log('view details popup');
    }

    /**
     *
     */
    public show(inputFromParent: any) {
        this.inputObjectFromParent = inputFromParent;
        console.log('inputFromParent====',this.inputObjectFromParent);
        this.confirmModal.show();
    }
    /**
     *
     */
    public cancel() {
        this.confirmModal.hide();
    }

    /**
     *
     */
    public ok() {
        console.log('ok');
        this.childEvent.emit(this.inputObjectFromParent);
        this.confirmModal.hide();
    }
}
