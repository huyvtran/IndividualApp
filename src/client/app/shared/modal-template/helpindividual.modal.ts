import { Component, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'sd-help',
    templateUrl: 'helpindividual.modal.html',
    styleUrls: ['modal-custom.css']
})

export class HelpIndividualModalComponent {

    @ViewChild('helpindividualModal') public helpindividualModal: ModalDirective;
    @Input() title?: string;

    /**
     *
     */
    show() {
        this.helpindividualModal.show();
    }
    /**
     *
     */
    hide() {
        this.helpindividualModal.hide();
    }
}
