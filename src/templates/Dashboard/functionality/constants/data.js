export const invoiceStatus = [
  {
    value: "submitted",
    label: "Submitted",
  },
  {
    value: "paid",
    label: "Paid",
  },
  {
    value: "pending",
    label: "Pending",
  },
]

export const pmtReceivedStatus = [
  {
    value: "paid",
    label: "Paid",
  },
  {
    value: "non paid",   
    label: "Non Paid", 
  }
]

export const columns = [
  {
    label: "S.NO",
    field: "S.NO",
  },
  // {
  //   label: "Active",
  //   field: "Active",
  // },
  {
    label: "Signature date ",
    field: "Signature date ",
  },
  {
    label: "D.D",
    field: "D.D",
  },
  {
    label: "Financing Days",
    field: "Financing Days",
  },
  {
    label: "Closing Days",
    field: "Closing Days",
  },
  {
    label: "Invoice",
    field: "Invoice",
  },
  {
    label: "PMT received",
    field: "PMT received",
  },
  {
    label: "PMT Broker",
    field: "PMT Broker",
  },
  {
    label: "Comments",
    field: "comment",
  },
  {
    label: "Amount",
    field: "amount",
  },
  {
    label: "Commission %",
    field: "commission_percentage",
  },
  {
    label: "Commission Amount",
    field: "commission_amount",
  },
  {
    label: "Action",
    field: "action",
  }
];
  export const tableData = [
    {
      id: 1,
      active: "343",
      dd: "12",
      financing: "5 days",
      closing: "active",
      invoice: "Submitted",
      commission_collected: "Completed",
      signatureDate: "2025-01-01", // Sample signature date
      pmtReceived: "2025-01-02", // Sample payment received date
      pmtBroker: "John Doe",
      // amount: "2400",
    },
    {
      id: 2,
      active: "4730",
      dd: "7",
      financing: "5 days",
      closing: "active",
      invoice: "Submitted",
      commission_collected: "Completed",
      signatureDate: "2025-01-02",
      pmtReceived: "2025-01-03",
      pmtBroker: "Jane Smith",
      // amount: "1800",
    },
    {
      id: 3,
      active: "129",
      dd: "10",
      financing: "5 days",
      closing: "inactive",
      invoice: "Submitted",
      commission_collected: "Not Completed",
      signatureDate: "2025-01-03",
      pmtReceived: "2025-01-04",
      pmtBroker: "David Johnson",
      // amount: "12"
    },
    {
      id: 4,
      active: "283",
      dd: "15",
      financing: "10 days",
      closing: "inactive",
      invoice: "Pending",
      commission_collected: "Not Completed",
      signatureDate: "2025-01-04",
      pmtReceived: "2025-01-05",
      pmtBroker: "Emily Davis",
      // amount: "150"
    },
    {
      id: 5,
      active: "637",
      dd: "8",
      financing: "3 days",
      closing: "active",
      invoice: "Paid",
      commission_collected: "Completed",
      signatureDate: "2025-01-05",
      pmtReceived: "2025-01-06",
      pmtBroker: "Michael Brown",
      // amount: "999"
    },
    {
      id: 6,
      active: "097",
      dd: "5",
      financing: "2 days",
      closing: "inactive",
      invoice: "Submitted",
      commission_collected: "Not Completed",
      signatureDate: "2025-01-06",
      pmtReceived: "2025-01-07",
      pmtBroker: "Sarah Wilson",
      // amount: "12"
    },
    {
      id: 7,
      active: "453",
      dd: "20",
      financing: "7 days",
      closing: "active",
      invoice: "Pending",
      commission_collected: "Completed",
      signatureDate: "2025-01-07",
      pmtReceived: "2025-01-08",
      pmtBroker: "Chris Lee",
      // amount: "1234"
    },
    {
      id: 8,
      active: "223",
      dd: "9",
      financing: "4 days",
      closing: "inactive",
      invoice: "Submitted",
      commission_collected: "Completed",
      signatureDate: "2025-01-08",
      pmtReceived: "2025-01-09",
      pmtBroker: "Jessica Taylor",
      // amount: "123"
    },
    {
      id: 9,
      active: "876",
      dd: "11",
      financing: "8 days",
      closing: "active",
      invoice: "Pending",
      commission_collected: "Not Completed",
      signatureDate: "2025-01-09",
      pmtReceived: "2025-01-10",
      pmtBroker: "Kevin Anderson",
      // amount: "100"
    },
    {
      id: 10,
      active: "456",
      dd: "14",
      financing: "6 days",
      closing: "active",
      invoice: "Submitted",
      commission_collected: "Completed",
      signatureDate: "2025-01-10",
      pmtReceived: "2025-01-11",
      pmtBroker: "Laura Thomas",
      // amount: "123"
    }
  ];
  

export const rows = tableData;

export const tableFooterData = [
    {
        label: "10",
        field: "10",
      },
      {
        label: "2400",
        field: "2400",
      },
      {
        label: "999",
        field: "999",
      },
      {
        label: "1234",
        field: "1234",
      },
      {
        label: "100",
        field: "100",
      },
      {
        label: "876",
        field: "876",
      },
      {
        label: "123",
        field: "123",
      },
      {
        label: "456",
        field: "456",
      },
      {
        label: "54300",
        field: "54300",
      },
]