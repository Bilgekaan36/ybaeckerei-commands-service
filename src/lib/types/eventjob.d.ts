export interface EventJob {
  streamId: 'Billboard' | 'Category';
  type: 'BillboardRegistered' | 'BillboardRemoved';
  data: any;
}
