import { Component, OnInit, OnDestroy } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';
import { TabMenuModule, MenuItem } from 'primeng/primeng';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'administration-tab',
    templateUrl: 'administration.component.html',
    styleUrls: ['administration.component.css'],
})
export class AdministrationComponent implements OnInit {
    public tabs: any = {
        'entitlementTabOvered': true,
        'siteMetricsTabOvered': false,
        'cmcTabOvered': false,
        'cacheMonitotTabOvered': false,
        'riskAdjustmentTabOvered': false
    };
    public selectedTab: string = 'entitlementTabOvered';

    constructor(private router: Router, private route: ActivatedRoute) {
        //   console.log(router.url);
    }

    ngOnInit() { //tslinit
    }

    toggleTabHighlight(tabIdentifier: string, value: boolean) {
        if (this.selectedTab !== tabIdentifier) {
            this.tabs[tabIdentifier] = value;
        }
    }
    triggerTabSelection(tabIdentifier: string) {
        this.tabs[this.selectedTab] = false;
        this.tabs[tabIdentifier] = true;
        this.selectedTab = tabIdentifier;
    }
}
