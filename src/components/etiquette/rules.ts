interface Rule {
  number: string;
  title: string;
  description: string;
  accounts?: {
    bank: string;
    name: string;
    number: string;
    currency: string;
  }[];
}

export const RULES: Rule[] = [
  {
    number: "01",
    title: "RSVP Required",
    description:
      "Kindly confirm your attendance before the deadline. Walk-ins will not be accommodated — we are planning specifically for you.",
  },

  {
    number: "02",
    title: "Arrive On Time",
    description:
      "The ceremony begins at 10:00 AM, and we would like that you experience the whole thing, so we would appreciate your early arrival.",
  },

  {
    number: "03",
    title: "No Spraying",
    description:
      "There will be no spraying of money at this event. Bring your energy, your dance moves, and your best outfit instead.",
  },

  {
    number: "04",
    title: "No Extra Guests",
    description:
      "Our venue has a strict capacity. Please do not arrive with guests not included in your RSVP. We will not be able to make exceptions on the day.",
  },

  {
    number: "05",
    title: "Gifting",
    description:
      "Your presence is a great gift to us. But if you'd to support our next phase, your gifts are greatly appreciated.",

    accounts: [
      {
        bank: "United Bank for Africa (UBA)",
        name: "Adedamola Adewole",
        number: "2230075562",
        currency: "NGN",
      },
      {
        bank: "Guarantee Trust Bank (GTB)",
        name: "Oluwaseun Aiyenuro",
        number: "0749229673",
        currency: "USD",
      },
    ],
  },
];
