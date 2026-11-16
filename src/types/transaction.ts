export default interface Transaction {
  verified: boolean;
  details: {
    referenceNumber: string;
    bank: string;
    senderAccountNumber: string;
    senderName: string;
    receiverAccountNumber: string;
    receiverName: string;
    amount: number;
    date: string;
    kefayID: string;
  };
}
