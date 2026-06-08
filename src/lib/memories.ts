export interface MemoryCard {
  id: number;
  image: string;
  date: string;
  caption: string;
}

export const MEMORIES: MemoryCard[] = [
  {
    id: 1,
    image: "https://placehold.co/300x420/2C1F18/C4913A",
    date: "February 2019",
    caption: "It began with a conversation",
  },
  {
    id: 2,
    image: "https://placehold.co/300x420/1A2418/F0D898",
    date: "April 2019",
    caption: "Our first real date",
  },
  {
    id: 3,
    image: "https://placehold.co/300x420/181F2C/E8D5B0",
    date: "2020",
    caption: "Late nights, deeper talks",
  },
  {
    id: 4,
    image: "https://placehold.co/300x420/2C2818/C4913A",
    date: "June 2022",
    caption: "He finally said the words",
  },
  {
    id: 5,
    image: "https://placehold.co/300x420/2C1824/F0D898",
    date: "December 2023",
    caption: "She said yes — twice",
  },
  {
    id: 6,
    image: "https://placehold.co/300x420/18282C/E8D5B0",
    date: "August 2026",
    caption: "And now, forever begins",
  },
];
