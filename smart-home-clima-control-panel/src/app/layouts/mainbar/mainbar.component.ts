import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/state/app.state';

import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as controlPanelSelector from 'src/app/store/monitor.selectors';

import { ControlPanelStartMonitoringAction, ControlPanelStopMonitoringAction } from 'src/app/store/monitor.actions';
import { ControlPanel } from 'src/app/models/monitor.model';

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
    const selectControlPanel = controlPanelSelector.selectEntitiesById(1);
    this.subscription.add(
      this.store
      .select(selectControlPanel)
      .pipe(takeUntil(this.destroy))
      .subscribe((result: ControlPanel | undefined) => {
        console.log('[Mainbar]::[ControlPanel]', result);
        if (result) this.isStarting = result ? result.isStarted : false;
      })
    );
  }

  startSmartHomeMonitoring(): void {
    this.store.dispatch(ControlPanelStartMonitoringAction());
    this.isStarting = true;
  }

  stopSmartHomeMonitoring(): void {
    this.store.dispatch(ControlPanelStopMonitoringAction());
  }
}