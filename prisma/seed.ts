import { PrismaClient, PriorityName } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const priorities = [
    { id: "low", name: PriorityName.Low, icon: "🟢", color: "#22c55e" },
    { id: "medium", name: PriorityName.Medium, icon: "🟡", color: "#eab308" },
    { id: "high", name: PriorityName.High, icon: "🟠", color: "#f97316" },
    {
      id: "critical",
      name: PriorityName.Critical,
      icon: "🔴",
      color: "#ef4444",
    },
  ];

  for (const priority of priorities) {
    await prisma.priority.upsert({
      where: { id: priority.id },
      update: {
        icon: priority.icon,
        color: priority.color,
      },
      create: priority,
    });
  }

  console.log("✅ Priorities created or updated with colors");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
