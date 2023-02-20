import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { SmartRoomService } from 'src/app/features/smart-room/services/smart-room.service';

import { SmartRoomActionTypes } from 'src/app/features/smart-room/store/actions/smart-room.actions';
import { SmartRoom } from 'src/app/models/smart-room.model';

@Injectable()
export class SmartRoomEffects {
    constructor(
        private actions: Actions,
        private router: Router,
        private smartRoomService: SmartRoomService
    ) {}

    public loadSmartRooms = createEffect(() =>
        this.actions.pipe(
            ofType(SmartRoomActionTypes.LOADING),
            switchMap(() =>
                this.smartRoomService.getAllSmartRooms().pipe(
                    map(
                        (response: SmartRoom[]) => ({ type: SmartRoomActionTypes.LOAD_SUCCESS, payload: response})
                    ),
                    catchError((error) => of({type: SmartRoomActionTypes.LOAD_FAILURE, payload: error}))
                )
            )
        )
    );

    public loadOne = createEffect(() => 
        this.actions.pipe(
            ofType(SmartRoomActionTypes.LOADONE),
            switchMap((params: any) =>
                this.smartRoomService.getSmartRoom(params.id).pipe(
                    map((response: SmartRoom) => {
                        if (!params.dispatch) return { type: SmartRoomActionTypes.LOADONE_REDIRECT, payload: response}
                        else return { type: SmartRoomActionTypes.LOADONE_SUCCESS, payload: response}
                    }),
                    catchError((error) => of({type: SmartRoomActionTypes.LOADONE_FAILURE, payload: error}))
                )
            )
        )
    );

    public loadOneRedirect = createEffect(() => 
        this.actions.pipe(
            ofType(SmartRoomActionTypes.LOADONE_REDIRECT),
            tap((action) => this.router.navigate(['/smartroom/detail', action]))
        ), 
        { dispatch: false }
    );
    

    public createSmartRoom = createEffect(() => 
        this.actions.pipe(
            ofType(SmartRoomActionTypes.NEW),
            switchMap((params: SmartRoom) =>
                this.smartRoomService.createSmartRoom(params).pipe(
                    map((response: SmartRoom) =>
                        ({ type: SmartRoomActionTypes.NEW_SUCCESS, payload: response})
                    ),
                    catchError((error) => of({type: SmartRoomActionTypes.NEW_FAILURE, payload: error}))
                )
            )
        )
    );

    public updateSmartRoom = createEffect(() => 
        this.actions.pipe(
            ofType(SmartRoomActionTypes.UPDATE),
            switchMap((request: SmartRoom) =>
                this.smartRoomService.updateSmartRoom(request).pipe(
                    map((response: any) => 
                        ({ type: SmartRoomActionTypes.UPDATE_SUCCESS, payload: response})
                    ),
                    catchError((error) => of({type: SmartRoomActionTypes.UPDATE_FAILURE, payload: error}))
                )
            )
        )
    );

    public updateSuccess = createEffect(() => 
        this.actions.pipe(
            ofType(SmartRoomActionTypes.UPDATE_SUCCESS),
            switchMap((request: number) => 
                this.smartRoomService.getSmartRoom(request).pipe(
                    map((response: SmartRoom) => ({ type: SmartRoomActionTypes.LOADONE_SUCCESS, payload: response})),
                    catchError((error) => of({type: SmartRoomActionTypes.UPDATE_FAILURE, payload: error}))
                )
            )
        )
    );

    public deleteSmartRoom = createEffect(() => 
        this.actions.pipe(
            ofType(SmartRoomActionTypes.DELETE),
            switchMap((param: number) =>
                this.smartRoomService.deleteSmartRoom(param).pipe(
                    map((response: any) => ({ type: SmartRoomActionTypes.DELETE_SUCCESS, payload: response})),
                    catchError((error) => of({type: SmartRoomActionTypes.DELETE_FAILURE, payload: error}))
                )
            )
        )
    );

}
