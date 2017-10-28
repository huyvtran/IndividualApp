import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy, CommonModule } from '@angular/common';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { RouterModule, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SecurityComponent } from './security/security.component';
import { SiteminderComponent } from './security/siteminder.component';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';

// External Module
import { Ng2BootstrapModule, DatepickerModule, ModalModule, TabsModule } from 'ngx-bootstrap';
import { DataTableModule, DialogModule, TabViewModule, CalendarModule, MultiSelectModule, DropdownModule } from 'primeng/primeng';
// API class
import { AuthGuard, HasAccess } from './auth-guard';
import { SecurityService } from './security/security.service';
import { HttpService } from './core/http.service';
import { GlobalErrorHandler } from './core/global-error-handler';
import { LoggingService } from './core/logging.service';

import { LoginValidatorComponent } from './login/login.validator';
import { LoginValidationService } from './login/login.validation.service';
import { ViewDetailsModalComponent } from './shared/modal-template/viewdetails.modal';
// import { IndividualModule } from './individual/individual.module';
import { AdministrationModule } from './administration/administration.module';

import { TimeoutModalComponent } from  './shared/modal-template/timeout.modal';

import { SecurityValidatorComponent } from './security/security.validator';
import { SecurityCalendarValidatorComponent } from './security/security-calendar-validator';

import { SecurityValidationService } from './security/security.validation.service';
import { IndividualSearchComponent } from './individual/search/individual-search.component';
import { IndividualService } from './individual/individual.service';
import { IndividualValidatorComponent } from './individual/individual-validator';
import { IndividualCalendarValidatorComponent } from './individual/individual-calendar-validator';
import { IndividualValidationService } from './individual/individual-validation.service';
import { PaymentHistoryModalComponent } from './shared/modal-template/paymenthistory.modal';
import { HelpIndividualModalComponent } from './shared/modal-template/helpindividual.modal';
import { PopupModalComponent } from './shared/modal-template/popup.modal';
import { DownloadCSVService } from './shared/services/downloadcsv/downloadcsv.service';
@NgModule({
  imports: [
    Ng2BootstrapModule.forRoot(),
    TabsModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    DatepickerModule,
    DataTableModule,
    DialogModule,
    CalendarModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    TabViewModule,
    MultiSelectModule,
    DropdownModule,
    // IndividualModule,
    AdministrationModule,
    CommonModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    SecurityComponent,
    SiteminderComponent,
    LoginValidatorComponent,
    ViewDetailsModalComponent,
    SecurityValidatorComponent,
    SecurityCalendarValidatorComponent,
    TimeoutModalComponent,
    IndividualSearchComponent,
    IndividualValidatorComponent,
    IndividualCalendarValidatorComponent,
    PaymentHistoryModalComponent,
    HelpIndividualModalComponent,
    PopupModalComponent,
  ],
  providers: [{provide: APP_BASE_HREF, useValue: document.location.pathname},
              {provide: LocationStrategy, useClass: HashLocationStrategy},
              {provide: ErrorHandler, useClass: GlobalErrorHandler},
              {provide: Http, useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions,
                router: Router) => new HttpService(xhrBackend, requestOptions, router),
                deps: [XHRBackend, RequestOptions, Router]},
              AuthGuard, HasAccess, SecurityService, SecurityValidationService, LoginValidationService,
              LoggingService, IndividualService, IndividualValidationService, DownloadCSVService],
  bootstrap: [AppComponent]

})
export class AppModule { }
