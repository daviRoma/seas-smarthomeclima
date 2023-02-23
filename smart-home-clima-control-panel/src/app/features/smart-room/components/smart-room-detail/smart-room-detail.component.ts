import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

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
  baseLineChartLabels,
  chartDatasetsTemperature,
  chartDatasetsMotion,
  chartDatasetsPower
} from 'src/app/config/chart.config';

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
    this.powerLineChartData = {...this.lineChartData};
  }

  private _temperatureValues: number[];
  private _motionValues: number[];

  private subscription: Subscription = new Subscription();

  public policyGroup!: PolicyGroup
  public policy!: Policy

  public editPolicyGroupDialogRef: any;
  public editPolicyDialogRef: any;
  public editSensorDialogRef: any;
  public editActuatorDialogRef: any;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: baseLineChartLabels,
    datasets: [chartDatasetsTemperature, chartDatasetsMotion]
  };
  public powerLineChartData: ChartConfiguration<'line'>['data'] = {
    labels: baseLineChartLabels,
    datasets: [chartDatasetsPower]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };
  public lineChartLegend = true;

  constructor(
    public dialog: MatDialog
  ) {
    this.editPolicyGroupDialogRef = { ...EditDialogConf };
    this.editPolicyDialogRef = { ...EditDialogConf };
    this.editSensorDialogRef = { ...EditDialogConf };
    this.editActuatorDialogRef = { ...EditDialogConf };

    this._temperatureValues = [];
    this._motionValues = [];
  }

  ngOnInit(): void {
    this.policyGroup = this.smartRoom.policyGroups ? this.smartRoom.policyGroups.filter(pg => pg.active)[0] : new PolicyGroup();
    this.policy = this.policyGroup && this.policyGroup.policies ? this.policyGroup.policies.filter(p => p.active)[0] : new Policy();
  }

  public openEditPolicyGroup(): void {
    this.editPolicyGroupDialogRef.data.smartRoom = { ...this.smartRoom };
    this.editPolicyGroupDialogRef.data.operation = 'edit';
    this.editPolicyGroupDialogRef.data.title = 'Edit Policy Group';

    const updateDialogRef = this.dialog.open(
      EditPolicyGroupDialogComponent,
      this.editPolicyGroupDialogRef
    );

    this.subscription.add(
      updateDialogRef.afterClosed().subscribe((response) => {
        if (response.result === 'close_after_update') {
        }
      })
    );
  }

  public openEditPolicy(): void {
    this.editPolicyDialogRef.data.smartRoom = { ...this.smartRoom };
    this.editPolicyDialogRef.data.operation = 'edit';
    this.editPolicyDialogRef.data.title = 'Edit Policies';

    const updateDialogRef = this.dialog.open(
      EditPolicyDialogComponent,
      this.editPolicyDialogRef
    );

    this.subscription.add(
      updateDialogRef.afterClosed().subscribe((response) => {
        if (response.result === 'close_after_update') {
        }
      })
    );
  }

  public openEditSensors(): void {
    this.editSensorDialogRef.data.smartRoom = { ...this.smartRoom };
    this.editSensorDialogRef.data.operation = 'edit';
    this.editSensorDialogRef.data.title = 'Edit Sensors';

    const updateDialogRef = this.dialog.open(
      EditSensorDialogComponent,
      this.editSensorDialogRef
    );

    this.subscription.add(
      updateDialogRef.afterClosed().subscribe((response) => {
        if (response.result === 'close_after_update') {
        }
      })
    );
  }

  public openEditActuators(): void {
    this.editActuatorDialogRef.data.smartRoom = { ...this.smartRoom };
    this.editActuatorDialogRef.data.operation = 'edit';
    this.editActuatorDialogRef.data.title = 'Edit Actuators';

    const updateDialogRef = this.dialog.open(
      EditActuatorDialogComponent,
      this.editActuatorDialogRef
    );

    this.subscription.add(
      updateDialogRef.afterClosed().subscribe((response) => {
        if (response.result === 'close_after_update') {
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}
