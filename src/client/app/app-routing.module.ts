import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, HasAccess } from './auth-guard';
import { HomeComponent } from './home/home.component';
import { SecurityComponent } from './security/security.component';
import { SiteminderComponent } from './security/siteminder.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AdministrationComponent } from './administration/administration.component';
import { EntitlementsComponent } from './administration/entitlements/entitlements.component';
import { SiteMetricsComponent } from './administration/site-metrics/sitemetrics.component';
import { CMCComponent } from './administration/cmc/cmc.component';
import { CacheMonitorComponent } from './administration/cache-monitor/cachemonitor.component';
import { RiskAdjustmentComponent } from './administration/risk-adjustment/riskadjustment.component';
import { IndividualSearchComponent } from './individual/search/individual-search.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                component: LoginComponent
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'home',
                component: HomeComponent,
                children: [
                    { path: '', pathMatch: 'prefix', redirectTo: 'dashboard' },
                    { path: 'dashboard', component: DashboardComponent },
                    { path: 'security', component: SecurityComponent },
                    { path: 'individual', component: IndividualSearchComponent },
                    {
                        path: 'administration', component: AdministrationComponent, children: [
                            {
                                path: '',
                                component: EntitlementsComponent,
                            },
                            {
                                path: 'entitlement',
                                component: EntitlementsComponent,
                            },
                            {
                                path: 'sitemetrics',
                                component: SiteMetricsComponent,
                            },
                            {
                                path: 'cmc',
                                component: CMCComponent,
                            },
                            {
                                path: 'cachemonitor',
                                component: CacheMonitorComponent,
                            },
                            {
                                path: 'riskadjustment',
                                component: RiskAdjustmentComponent,
                            }
                        ]
                    }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }
