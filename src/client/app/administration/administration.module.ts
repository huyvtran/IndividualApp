import { NgModule } from '@angular/core';
import { AdministrationComponent } from './administration.component';
import { SharedModule } from '../shared/shared.module';
import { Ng2BootstrapModule, DatepickerModule, ModalModule, TabsModule } from 'ngx-bootstrap';
import {
  DataTableModule, DialogModule, TabViewModule,
  CalendarModule, MultiSelectModule, DropdownModule, TabMenuModule
} from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministrationService } from './administration.service';
import { EntitlementsComponent } from './entitlements/entitlements.component';
import { SiteMetricsComponent } from './site-metrics/sitemetrics.component';
import { CMCComponent } from './cmc/cmc.component';
import { CacheMonitorComponent } from './cache-monitor/cachemonitor.component';
import { RiskAdjustmentComponent } from './risk-adjustment/riskadjustment.component';
import { AdministrationCalendarValidatorComponent } from './administration-calendar-validator';
import { AdministrationValidatorComponent } from './administration.validator';
import { AdministrationValidationService } from './administration-validation.service';
import { HelpAdminModalComponent } from '../shared/modal-template/helpadmin.modal';
import { NopdfModalComponent } from '../shared/modal-template/nopdf.modal';
import { DownloadCSVService } from '../shared/services/downloadcsv/downloadcsv.service';

@NgModule({
  imports: [
    Ng2BootstrapModule.forRoot(),
    ModalModule.forRoot(),
    // AdministrationRoutingModule,
    SharedModule,
    DatepickerModule.forRoot(),
    TabsModule.forRoot(),
    DataTableModule,
    DialogModule,
    TabViewModule,
    CalendarModule,
    MultiSelectModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    TabMenuModule,
  ],
  declarations: [
    AdministrationComponent,
    EntitlementsComponent,
    SiteMetricsComponent,
    CMCComponent,
    CacheMonitorComponent,
    RiskAdjustmentComponent,
    AdministrationValidatorComponent,
    AdministrationCalendarValidatorComponent,
    HelpAdminModalComponent,
    NopdfModalComponent
  ],
  exports: [
    AdministrationComponent,
    EntitlementsComponent,
    SiteMetricsComponent,
    CMCComponent,
    CacheMonitorComponent,
    RiskAdjustmentComponent,
    HelpAdminModalComponent,
    NopdfModalComponent
  ],
  providers: [AdministrationService, AdministrationValidationService, DownloadCSVService]
})
export class AdministrationModule {
}
