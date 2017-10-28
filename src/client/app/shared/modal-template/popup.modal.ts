import { Component, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'sd-popup',
    templateUrl: 'popup.modal.html',
    styleUrls: ['modal-custom.css']
})

export class PopupModalComponent {

    @ViewChild('popupModal') public popupModal: ModalDirective;
    @Input() title?: string;
    @Input() acn?: string;

    /**
     *
     */
    show() {
        this.popupModal.show();
    }
    /**
     *
     */
    hide() {
        this.popupModal.hide();
    }
}
