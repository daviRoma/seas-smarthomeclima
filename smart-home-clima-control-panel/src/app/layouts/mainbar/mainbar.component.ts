import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';

import { AppState } from 'src/app/state/app.state';

import * as monitorSelector from 'src/app/store/monitor.selectors';

import { SmartRoomLoadAction } from 'src/app/features/smart-room/store/actions/smart-room.actions';

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
    private store: Store<AppState>,
    private logger: NGXLogger,
  ) {
    this.isStarting = false;
  }

  ngOnInit(): void {
    this.subscription.add(
      this.store
      .select(monitorSelector.selectEntitiesById(1))
      .pipe(takeUntil(this.destroy))
      .subscribe((result: Monitor | undefined) => {
        this.logger.info('[Mainbar]', '[ngOnInit]', 'selecting...', result);
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

  refreshdata(): void {
    this.store.dispatch(SmartRoomLoadAction());
  }
}