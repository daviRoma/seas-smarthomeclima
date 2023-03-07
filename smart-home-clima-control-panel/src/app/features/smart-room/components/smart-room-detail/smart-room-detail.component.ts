import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { MatDialog } from '@angular/material/dialog';
import { SmartRoom } from 'src/app/models/smart-room.model';

import { PolicyGroup } from 'src/app/models/policy-group.model';
import { Policy } from 'src/app/models/policy.model';

import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";

import { EditPolicyGroupDialogComponent } from 'src/app/features/policy-group/components/dialogs/edit-policy-group-dialog/edit-policy-group-dialog.component';
import { EditPolicyDialogComponent } from 'src/app/features/policy/components/dialogs/edit-policy-dialog/edit-policy-dialog.component';
import { EditSensorDialogComponent } from 'src/app/features/sensor/components/dialogs/edit-sensor-dialog/edit-sensor-dialog.component';
import { EditActuatorDialogComponent } from 'src/app/features/actuator/components/dialogs/edit-actuator-dialog/edit-actuator-dialog.component';

import { EditDialogConf } from 'src/app/config/dialog.config';

import {
  chartDatasetsTemperature,
  chartDatasetsMotion,
  chartDatasetsPower
} from 'src/app/config/chart.config';

import { SmartRoomLoadAction } from 'src/app/features/smart-room/store/actions/smart-room.actions';
import { AppState } from 'src/app/state/app.state';


@Component({
  selector: 'app-smart-room-detail',
  templateUrl: './smart-room-detail.component.html',
  styleUrls: ['./smart-room-detail.component.css']
})
export class SmartRoomDetailComponent implements OnInit, OnDestroy {
  @Input() smartRoom!: SmartRoom;
  @Input() 
  public set temperatureValues(values: number[]) {
    console.log("[Set]::[temperatureValues]", values);
    this._temperatureValues = [...values];
    this.lineChartData.datasets[0].data = [...values];
    this.lineChartData = {...this.lineChartData};
  }
  public get temperatureValues(): number[] {
    return this._temperatureValues;
  }

  @Input() 
  public set motionValues(values: number[]) {
    console.log("[Set]::[motionValues]", values);
    this._motionValues = [...values];
    this.lineChartData.datasets[1].data = [...values];
    this.lineChartData = {...this.lineChartData};
  }
  public get motionValues(): number[] {
    return this._motionValues;
  }

  @Input() 
  public set actuatorValues(values: number[]) {
    console.log("[Set]::[actuatorValues]", values);
    this._motionValues = [...values];
    this.powerLineChartData.datasets[0].data = [...values];
    this.powerLineChartData = {...this.powerLineChartData};
  }

  private _temperatureValues: number[];
  private _motionValues: number[];

  private subscription: Subscription = new Subscription();

  public policyGroup!: PolicyGroup
  public policy!: Policy

  public editDialogRef: any;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    datasets: [chartDatasetsTemperature, chartDatasetsMotion]
  };
  public powerLineChartData: ChartConfiguration<'line'>['data'] = {
    datasets: [chartDatasetsPower]
  };

  public powerLineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        position: 'left',
        min: 0,
        max: 5
      },
      x: {
        title: {
          display: true,
          text: 'Hours'
        }
      }
    }
  };
  public SensorLineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        position: 'left',
        min: 0,
        suggestedMax: 30
      },
      x: {
        title: {
          display: true,
          text: 'Hours'
        }
      }
    }
  };
  public lineChartLegend = true;

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>
  ) {
    this.editDialogRef = { ...EditDialogConf };

    this._temperatureValues = [];
    this._motionValues = [];
  }

  ngOnInit(): void {
    this.policyGroup = this.smartRoom.policyGroups ? this.smartRoom.policyGroups.filter(pg => pg.active)[0] : new PolicyGroup();
    this.policy = this.policyGroup && this.policyGroup.policies ? this.policyGroup.policies.filter(p => p.active)[0] : new Policy();

    this.lineChartData.labels = this.getChartLabels();
    this.powerLineChartData.labels = this.getChartLabels();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.complete();
  }

  public openEditPolicyGroup(): void {
    this.editDialogRef.data.smartRoom = { ...this.smartRoom };
    this.editDialogRef.data.operation = 'edit';
    this.editDialogRef.data.title = 'Edit Policy Group';

    const updateDialogRef = this.dialog.open(
      EditPolicyGroupDialogComponent,
      this.editDialogRef
    );

    this.subscription.add(
      updateDialogRef.afterClosed().subscribe((response) => {
        if (response.result === 'close_after_update') {
          this.store.dispatch(SmartRoomLoadAction());
        }
      })
    );
  }

  public openEditPolicy(): void {
    this.editDialogRef.data.smartRoom = { ...this.smartRoom };
    this.editDialogRef.data.operation = 'edit';
    this.editDialogRef.data.title = 'Edit Policies';

    const updateDialogRef = this.dialog.open(
      EditPolicyDialogComponent,
      this.editDialogRef
    );

    this.subscription.add(
      updateDialogRef.afterClosed().subscribe((response) => {
        if (response.result === 'close_after_update') {
          this.store.dispatch(SmartRoomLoadAction());
        }
      })
    );
  }

  public openEditSensors(): void {
    this.editDialogRef.data.smartRoom = { ...this.smartRoom };
    this.editDialogRef.data.operation = 'edit';
    this.editDialogRef.data.title = 'Edit Sensors';

    const updateDialogRef = this.dialog.open(
      EditSensorDialogComponent,
      this.editDialogRef
    );

    this.subscription.add(
      updateDialogRef.afterClosed().subscribe((response) => {
        if (response.result === 'close_after_update') {
          this.store.dispatch(SmartRoomLoadAction());
        }
      })
    );
  }

  public openEditActuators(): void {
    this.editDialogRef.data.smartRoom = { ...this.smartRoom };
    this.editDialogRef.data.operation = 'edit';
    this.editDialogRef.data.title = 'Edit Actuators';

    const updateDialogRef = this.dialog.open(
      EditActuatorDialogComponent,
      this.editDialogRef
    );

    this.subscription.add(
      updateDialogRef.afterClosed().subscribe((response) => {
        if (response.result === 'close_after_update') {
          this.store.dispatch(SmartRoomLoadAction());
        }
      })
    );
  }

  private getChartLabels(): String[] {
    let labels: String[] = [];
    let hour = new Date(this.policy.startHour).getHours();
    
    if (hour + 5 > 23) {
      let diff = (hour+5) - 24;
      for (let h = hour; h < (hour + 5 - diff); h++) {
        labels = [ ...labels, h + ":00", h + ":15", h + ":30", h + ":45"];
      }
      for (let h = 0; h < diff; h++) {
        if (h < 10) labels = [ ...labels, "0" + h +":00", "0" + h +":15", "0" + h +":30", "0" + h +":45"];
        else labels = [ ...labels, h + ":00", h + ":15", h + ":30", h + ":45"];
      }
    } else {
      for (let h = hour; h < (hour+5); h++) {
        if (h < 10) labels = [ ...labels, "0" + h +":00", "0" + h +":15", "0" + h +":30", "0" + h +":45"];
        else labels = [ ...labels, h + ":00", h + ":15", h + ":30", h + ":45"];
      }
    }
    return labels;
  }
  
}
