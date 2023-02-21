import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IMqttServiceOptions, MqttModule } from "ngx-mqtt";
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { environment as env } from 'src/environments/environment.prod';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutsModule } from './layouts/layouts.module';

import { SmartRoomEffects } from './features/smart-room/store/effects/smart-room.effects';
import { PolicyGroupEffects } from './features/policy-group/store/effects/policy-group.effects';
import { PolicyEffects } from './features/policy/store/effects/policy.effects';
import { SensorEffects } from './features/sensor/store/effects/sensor.effects';
import { ActuatorEffects } from './features/actuator/store/effects/actuator.effects';
import { MonitorEffects } from './store/monitor.effects';

import { reducers } from 'src/app/state/app.state';

/* MATERIAL */
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgChartsModule } from 'ng2-charts';


const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
    hostname: env.mqtt.server,
    port: env.mqtt.port,
    protocol: (env.mqtt.protocol === "wss") ? "wss" : "ws",
    path: '',
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    BrowserAnimationsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    NgChartsModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.TRACE,
      serverLogLevel: NgxLoggerLevel.ERROR,
    }),
    EffectsModule.forRoot([
      SmartRoomEffects,
      PolicyGroupEffects,
      PolicyEffects,
      SensorEffects,
      ActuatorEffects,
      MonitorEffects
    ]),
    StoreModule.forRoot(reducers)
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
