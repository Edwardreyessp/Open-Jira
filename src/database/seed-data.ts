interface SeedData {
  entries: seedEntry[];
}

interface seedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: "Descripción de las god",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description: "Descripción de las god 2",
      status: "in-progress",
      createdAt: Date.now() - 1000000,
    },
    {
      description: "Descripción de las god 3",
      status: "finished",
      createdAt: Date.now() - 100000,
    },
  ],
};
