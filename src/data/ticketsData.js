// src/data/ticketsData.js

export const allTickets = [
  {
    id: "ticket-1",
    title: "Dhaka → Cox's Bazar",
    operator: "Green Line Express",
    from: "Dhaka",
    to: "Cox's Bazar",
    type: "AC Bus",
    price: 1450,
    quantity: 18,
    departure: "08:30 AM",
    date: "18 Sep 2026",
    departureDateTime: "2026-09-18T08:30:00",
    image:
      "https://images.pexels.com/photos/37102472/pexels-photo-37102472.jpeg?auto=compress&cs=tinysrgb&w=1600",
    perks: ["AC", "WiFi", "Charging"],
    approved: true,
    description:
      "Travel comfortably from Dhaka to Cox's Bazar with a premium AC coach, comfortable seating and convenient onboard facilities.",
  },

  {
    id: "ticket-2",
    title: "Dhaka → Chattogram",
    operator: "Hanif Enterprise",
    from: "Dhaka",
    to: "Chattogram",
    type: "AC Bus",
    price: 1100,
    quantity: 24,
    departure: "10:00 PM",
    date: "19 Sep 2026",
    departureDateTime: "2026-09-19T22:00:00",
    image:
      "https://images.pexels.com/photos/5790052/pexels-photo-5790052.jpeg?auto=compress&cs=tinysrgb&w=1600",
    perks: ["AC", "Sleeper", "Charging"],
    approved: true,
    description:
      "Enjoy a comfortable overnight journey between Dhaka and Chattogram with AC seating and convenient travel facilities.",
  },

  {
    id: "ticket-3",
    title: "Dhaka → Sylhet",
    operator: "Bangladesh Railway",
    from: "Dhaka",
    to: "Sylhet",
    type: "Train",
    price: 650,
    quantity: 42,
    departure: "06:40 AM",
    date: "20 Sep 2026",
    departureDateTime: "2026-09-20T06:40:00",
    image:
      "https://images.pexels.com/photos/35808456/pexels-photo-35808456.jpeg?auto=compress&cs=tinysrgb&w=1600",
    perks: ["AC Seat", "Food", "Charging"],
    approved: true,
    description:
      "Experience a smooth train journey from Dhaka to Sylhet with comfortable seating and essential onboard facilities.",
  },

  {
    id: "ticket-4",
    title: "Dhaka → Rajshahi",
    operator: "Silk City Express",
    from: "Dhaka",
    to: "Rajshahi",
    type: "Train",
    price: 780,
    quantity: 35,
    departure: "07:15 AM",
    date: "21 Sep 2026",
    departureDateTime: "2026-09-21T07:15:00",
    image:
      "https://images.pexels.com/photos/26654264/pexels-photo-26654264.jpeg?auto=compress&cs=tinysrgb&w=1600",
    perks: ["AC", "Comfort Seat", "Food"],
    approved: true,
    description:
      "Travel from Dhaka to Rajshahi aboard a comfortable train service designed for a relaxed and enjoyable journey.",
  },

  {
    id: "ticket-5",
    title: "Dhaka → Rangpur",
    operator: "Nabil Paribahan",
    from: "Dhaka",
    to: "Rangpur",
    type: "AC Bus",
    price: 1250,
    quantity: 16,
    departure: "09:30 PM",
    date: "22 Sep 2026",
    departureDateTime: "2026-09-22T21:30:00",
    image:
      "https://images.pexels.com/photos/37102472/pexels-photo-37102472.jpeg?auto=compress&cs=tinysrgb&w=1600",
    perks: ["AC", "WiFi", "Water"],
    approved: true,
    description:
      "Make your Rangpur journey comfortable with premium AC transportation and convenient passenger facilities.",
  },

  {
    id: "ticket-6",
    title: "Dhaka → Khulna",
    operator: "Shohagh Paribahan",
    from: "Dhaka",
    to: "Khulna",
    type: "AC Bus",
    price: 950,
    quantity: 21,
    departure: "08:00 PM",
    date: "23 Sep 2026",
    departureDateTime: "2026-09-23T20:00:00",
    image:
      "https://images.pexels.com/photos/5790052/pexels-photo-5790052.jpeg?auto=compress&cs=tinysrgb&w=1600",
    perks: ["AC", "Charging", "Water"],
    approved: true,
    description:
      "Enjoy a reliable and comfortable journey from Dhaka to Khulna with modern AC bus facilities.",
  },

  {
    id: "ticket-7",
    title: "Dhaka → Mymensingh",
    operator: "Ena Transport",
    from: "Dhaka",
    to: "Mymensingh",
    type: "AC Bus",
    price: 620,
    quantity: 28,
    departure: "05:30 PM",
    date: "24 Sep 2026",
    departureDateTime: "2026-09-24T17:30:00",
    image:
      "https://images.pexels.com/photos/37102472/pexels-photo-37102472.jpeg?auto=compress&cs=tinysrgb&w=1600",
    perks: ["AC", "WiFi", "Charging"],
    approved: true,
    description:
      "Reach Mymensingh comfortably with a convenient AC bus service and modern passenger amenities.",
  },

  {
    id: "ticket-8",
    title: "Dhaka → Barishal",
    operator: "Sakura Paribahan",
    from: "Dhaka",
    to: "Barishal",
    type: "AC Bus",
    price: 900,
    quantity: 19,
    departure: "09:00 PM",
    date: "25 Sep 2026",
    departureDateTime: "2026-09-25T21:00:00",
    image:
      "https://images.pexels.com/photos/5790052/pexels-photo-5790052.jpeg?auto=compress&cs=tinysrgb&w=1600",
    perks: ["AC", "Water", "Charging"],
    approved: true,
    description:
      "Travel comfortably from Dhaka to Barishal with AC transportation and essential travel facilities.",
  },

  {
    id: "ticket-9",
    title: "Dhaka → Cumilla",
    operator: "Unique Paribahan",
    from: "Dhaka",
    to: "Cumilla",
    type: "AC Bus",
    price: 750,
    quantity: 31,
    departure: "07:45 PM",
    date: "26 Sep 2026",
    departureDateTime: "2026-09-26T19:45:00",
    image:
      "https://images.pexels.com/photos/37102472/pexels-photo-37102472.jpeg?auto=compress&cs=tinysrgb&w=1600",
    perks: ["AC", "WiFi"],
    approved: true,
    description:
      "A comfortable AC bus option for travellers looking for a convenient Dhaka to Cumilla journey.",
  },
];