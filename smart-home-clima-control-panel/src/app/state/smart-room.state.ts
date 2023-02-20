/**
 * Smart Room State interface.
*/
import { EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import { SmartRoom } from 'src/app/models/smart-room.model';

export interface SmartRoomState extends EntityState<SmartRoom>{
  error: boolean;
  loading: boolean;
  total: number;
}

export const smartRoomAdapter: EntityAdapter<SmartRoom> = createEntityAdapter<SmartRoom>({
  selectId: (SmartRoom: SmartRoom) => SmartRoom.id
});

export const initialSmartRoomState: SmartRoomState = smartRoomAdapter.getInitialState({
  error: false,
  loading: true,
  total: 0
});