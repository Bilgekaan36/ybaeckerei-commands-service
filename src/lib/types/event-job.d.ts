export interface EventJob {
  streamId: 'Billboard' | 'Category';
  type: 'BillboardRegistered' | 'BillboardRemoved' | 'CategoryRegistered';
  data: any;
}
