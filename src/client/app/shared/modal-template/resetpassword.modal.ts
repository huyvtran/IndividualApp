import { Component, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { SecurityService } from '../../security/security.service';

@Component({
    moduleId: module.id,
    selector: 'sd-reset-password',
    templateUrl: 'resetpassword.modal.html',
    styleUrls: ['modal-custom.css']
})

export class RestPasswordModalComponent {

    @ViewChild('resetPasswordModal') public resetPasswordModal: ModalDirective;
    @Input() title?: string;
    @Input() user?: any;
    public userName: string ='';
    public userNameError: string ='';
    public tempPassword: string ='';
    public tempPasswordError: string ='';
    public noUsermessage: string = '';

    constructor(private userService: SecurityService) {}

    /**
     * Password reset Service call here
     */
    public resetPassword() {
        this.userService.resetPasswordService(this.user).subscribe((data:any)=> {
            console.log(data.user);
            this.title = 'Reset Information';

            if(data.status === 'Success') {
                this.tempPassword = data.user.password;
            } else {
                this.tempPasswordError = data.status;
            }

            // this.tempPassword = (data.status === 'INVALID REQUEST') ? 'Not Set' : data.user.password;
        },
        (error:any)=> { console.log('error '+error);});
    }

    /**
     * Clearing the form and exiting
     */
    public saveAndOk() {
        this.tempPassword ='';
        this.title = 'Reset Password Confirmation';
        this.resetPasswordModal.hide();
    }

    /**
     * To Open/Show the modal pop
     */
    show() {
        this.userService.getUserName(this.user).subscribe((data:any)=> {
            console.log('here');
            console.log(data);
            if(data.status === 'Success') {
                this.userName = data.user.userName;
            } else {
                this.userNameError = data.status;
            }
            // this.userName = ( data.status === 'INVALID REQUEST' || !data.user ) ? '' : data.user.userName;
        },
        (error:any) => {console.log('error : ' + error); this.noUsermessage ='error'; });
        this.resetPasswordModal.show();
    }

    /**
     * to Hide/close the modal popup
     */
    hide() {
        this.resetPasswordModal.hide();
        this.tempPassword ='';
        this.userName = '';
        this.userNameError = '';
        this.tempPasswordError ='';
    }
}
