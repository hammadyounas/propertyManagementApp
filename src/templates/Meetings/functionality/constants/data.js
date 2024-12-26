import moment from "moment";

export const statuses = [
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Scheduled",
    label: "Scheduled",
  },
  {
    value: "Completed",
    label: "Completed",
  },
  {
    value: "Cancelled",
    label: "Cancelled",
  },
  {
    value: "Rescheduled",
    label: "Rescheduled",
  },
];

export const salespersons = [
  {
    value: "salesperson-001",
    label: "John Smith",
    email: "john.smith@example.com",
    phone: "+123456789",
  },
  {
    value: "salesperson-002",
    label: "Eve Brown",
    email: "eve.brown@example.com",
    phone: "+6677889900",
  },
  {
    value: "salesperson-003",
    label: "Tom Hanks",
    email: "tom.hanks@example.com",
    phone: "+567890123",
  },
];

export const clients = [
  {
    value: "client-001",
    label: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+987654321",
  },
  {
    value: "client-002",
    label: "Bob Green",
    email: "bob.green@example.com",
    phone: "+5544332211",
  },
  {
    value: "client-003",
    label: "Lucy Red",
    email: "lucy.red@example.com",
    phone: "+321456987",
  },
];

export const dummyMeetings = [
  // Scheduled Meeting
  {
    meeting_id: "uuid-12345",
    title: "Team Strategy Meeting",
    description: "Discussion on property sales strategy.",
    start_time: moment().add(0, "days").toISOString(),
    end_time: moment().add(0, "days").add(1, "hours").toISOString(),
    location: "Office Conference Room",
    created_by: salespersons[0].value, // Salesperson 1
    created_by_role: "salesperson",
    salespersons: [
      {
        value: salespersons[0].value,
        label: salespersons[0].label,
        email: salespersons[0].email,
        phone: salespersons[0].phone,
      },
      {
        value: salespersons[1].value,
        label: salespersons[1].label,
        email: salespersons[1].email,
        phone: salespersons[1].phone,
      },
    ],
    clients: [
      {
        value: clients[0].value,
        label: clients[0].label,
        email: clients[0].email,
        phone: clients[0].phone,
      },
    ],
    status: "Scheduled",
    created_at: "2024-10-10T12:00:00",
    updated_at: "2024-10-15T09:00:00",
  },

  // Completed Meeting
  {
    meeting_id: "uuid-67890",
    title: "Client Follow-up",
    description: "Discuss property investment options.",
    start_time: moment().add(1, "days").toISOString(),
    end_time: moment().add(1, "days").add(1, "hours").toISOString(),
    location: "Zoom",
    created_by: salespersons[1].value, // Salesperson 2
    created_by_role: "salesperson",
    salespersons: [
      {
        value: salespersons[1].value,
        label: salespersons[1].label,
        email: salespersons[1].email,
        phone: salespersons[1].phone,
      },
    ],
    clients: [
      {
        value: clients[1].value,
        label: clients[1].label,
        email: clients[1].email,
        phone: clients[1].phone,
      },
    ],
    status: "Completed",
    created_at: "2024-09-05T12:00:00",
    updated_at: "2024-09-16T10:00:00",
  },

  // Canceled Meeting
  {
    meeting_id: "uuid-11223",
    title: "Project Kick-off",
    description: "Initial meeting to discuss the project requirements.",
    start_time: moment().add(2, "days").toISOString(),
    end_time: moment().add(2, "days").add(1, "hours").toISOString(),
    location: "Client's Office",
    created_by: salespersons[0].value, // Salesperson 1
    created_by_role: "salesperson",
    salespersons: [
      {
        value: salespersons[0].value,
        label: salespersons[0].label,
        email: salespersons[0].email,
        phone: salespersons[0].phone,
      },
    ],
    clients: [
      {
        value: clients[1].value,
        label: clients[1].label,
        email: clients[1].email,
        phone: clients[1].phone,
      },
    ],
    status: "Canceled",
    created_at: "2024-08-01T11:00:00",
    updated_at: "2024-08-05T10:00:00",
  },

  // Pending Meeting
  {
    meeting_id: "uuid-22445",
    title: "Budget Review",
    description: "Review the budget for upcoming projects.",
    start_time: moment().add(3, "days").toISOString(),
    end_time: moment().add(3, "days").add(1, "hours").toISOString(),
    location: "Office Meeting Room 3",
    created_by: salespersons[2].value, // Salesperson 3
    created_by_role: "salesperson",
    salespersons: [
      {
        value: salespersons[2].value,
        label: salespersons[2].label,
        email: salespersons[2].email,
        phone: salespersons[2].phone,
      },
    ],
    clients: [
      {
        value: clients[0].value,
        label: clients[0].label,
        email: clients[0].email,
        phone: clients[0].phone,
      },
    ],
    status: "Pending",
    created_at: "2024-10-25T12:00:00",
    updated_at: "2024-10-26T13:00:00",
  },

  // Rescheduled Meeting
  {
    meeting_id: "uuid-54321",
    title: "Sales Demo",
    description: "Demo for the new property management tool.",
    start_time: moment().add(4, "days").toISOString(),
    end_time: moment().add(4, "days").add(1, "hours").toISOString(),
    location: "Client's Office",
    created_by: salespersons[2].value, // Salesperson 3
    created_by_role: "salesperson",
    salespersons: [
      {
        value: salespersons[2].value,
        label: salespersons[2].label,
        email: salespersons[2].email,
        phone: salespersons[2].phone,
      },
    ],
    clients: [
      {
        value: clients[2].value,
        label: clients[2].label,
        email: clients[2].email,
        phone: clients[2].phone,
      },
    ],
    status: "Rescheduled",
    created_at: "2024-07-25T14:00:00",
    updated_at: "2024-07-31T13:00:00",
  },
];
