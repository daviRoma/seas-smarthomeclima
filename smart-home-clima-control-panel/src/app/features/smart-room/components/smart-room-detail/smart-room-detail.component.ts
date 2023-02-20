import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
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

import {
  PolicyDialogConf,
  EditDialogConf
} from 'src/app/config/dialog.config';

import {
  baseLineChartLabels,
  chartDatasetsElem,
  chartDatasetsElem2
} from 'src/app/config/chart.config';
@Component({
  selector: 'app-smart-room-detail',
  templateUrl: './smart-room-detail.component.html',
  styleUrls: ['./smart-room-detail.component.css']
})
export class SmartRoomDetailComponent implements OnInit, OnDestroy {
  @Input() smartRoom!: SmartRoom;
  @Input() 
  public set temperatureValue(value: number) {
    console.log("[Set]::[temperatureValue]", value);
    this.lineChartData.datasets[0].data.push(value);
    this.lineChartData = {...this.lineChartData};
  }
  
  private _temperatureValues: any[] | undefined ;

  public policyGroup!: PolicyGroup
  public policy!: Policy

  public editPolicyGroupDialogRef: any;
  public editPolicyDialogRef: any;
  public editSensorDialogRef: any;
  public editActuatorDialogRef: any;

  private subscription: Subscription = new Subscription();

  public chartDatasetConfig: any;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
      labels: baseLineChartLabels,
      datasets: [chartDatasetsElem, chartDatasetsElem2]
      
    };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };
  public lineChartLegend = true;

  constructor(
    public dialog: MatDialog,
    private router: Router
  ) {
    
    this.editPolicyGroupDialogRef = { ...PolicyDialogConf };
    this.editPolicyDialogRef = { ...EditDialogConf };
    this.editSensorDialogRef = { ...EditDialogConf };
    this.editActuatorDialogRef = { ...EditDialogConf };

    // this.chartDatasetConfig = { ...chartDatasetsElem, data: this.temperatureValues};
  }

  ngOnInit(): void {
    this.policyGroup = this.smartRoom.policyGroups ? this.smartRoom.policyGroups.filter(pg => pg.active)[0] : new PolicyGroup();
    this.policy = this.policyGroup && this.policyGroup.policies ? this.policyGroup.policies.filter(p => p.active)[0] : new Policy();

    // if (this.temperatureValues) this.temperatureValues.forEach(elem => this.lineChartData.datasets[0].data.push(elem.value));
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
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
  
}
