import { PrismaClient, PriorityName } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const priorities = [
    { name: PriorityName.Low, icon: "🟢", color: "#22c55e" }, // green
    { name: PriorityName.Medium, icon: "🟡", color: "#eab308" }, // yellow
    { name: PriorityName.High, icon: "🟠", color: "#f97316" }, // orange
    { name: PriorityName.Critical, icon: "🔴", color: "#ef4444" }, // red
  ];

  for (const priority of priorities) {
    await prisma.priority.upsert({
      where: { name: priority.name },
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
