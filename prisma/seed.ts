import { createEvents } from "../src/db/createEvents";
import { prisma } from "../src/lib/prisma";
import { createParticipants } from "../src/db/createParticipants";

const seedData = async () => {
  await prisma.participant.deleteMany();
  await prisma.event.deleteMany();
  await prisma.organizer.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();
  await createEvents();
  await createParticipants();
};

seedData()
  .then(() => {
    console.log("Seeding completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding data:", error);
    process.exit(1);
  });
