import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/state/app.state';

import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as monitorSelector from 'src/app/store/monitor.selectors';

import { MonitorStartMonitoringAction, MonitorStopMonitoringAction } from 'src/app/store/monitor.actions';
import { Monitor } from 'src/app/models/monitor.model';

@Component({
  selector: 'app-mainbar',
  templateUrl: './mainbar.component.html',
  styleUrls: ['./mainbar.component.css']
})
export class MainbarComponent implements OnInit {
  public isStarting: boolean;
  
  private subscription: Subscription = new Subscription();
  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private store: Store<AppState>
  ) {
    this.isStarting = false;
  }

  ngOnInit(): void {
    const selectControlPanel = monitorSelector.selectEntitiesById(1);
    this.subscription.add(
      this.store
      .select(selectControlPanel)
      .pipe(takeUntil(this.destroy))
      .subscribe((result: Monitor | undefined) => {
        console.log('[Mainbar]::[Monitor]', result);
        if (result) this.isStarting = result ? result.isStarted : false;
      })
    );
  }

  startSmartHomeMonitoring(): void {
    this.store.dispatch(MonitorStartMonitoringAction());
    this.isStarting = true;
  }

  stopSmartHomeMonitoring(): void {
    this.store.dispatch(MonitorStopMonitoringAction());
  }
}