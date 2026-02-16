export interface IRecentCustomer {
  userId: string;
  name: string;
  doj: string;
  status: 'Pending' | 'Completed';
}
