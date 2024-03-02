import { EventType, StreamId } from './utility-types';

export interface EventJob {
  streamId: StreamId;
  type: EventType;
  data: any;
}
