// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const usersData = [
    {
      name: "John Doe",
      email: "john@example.com",
      password: "hashedpw1",
      invoices: {
        create: [
          { vendor_name: "Vendor A", amount: 1200.5, due_date: new Date("2025-10-01"), description: "Website development", paid: false },
          { vendor_name: "Vendor B", amount: 450.0, due_date: new Date("2025-10-10"), description: "Logo design", paid: true },
          { vendor_name: "Vendor C", amount: 800.75, due_date: new Date("2025-10-15"), description: "Marketing campaign", paid: false },
          { vendor_name: "Vendor A", amount: 1200.5, due_date: new Date("2025-10-01"), description: "Website development", paid: false },
          { vendor_name: "Vendor B", amount: 450.0, due_date: new Date("2025-10-10"), description: "Logo design", paid: true },
          { vendor_name: "Vendor C", amount: 800.75, due_date: new Date("2025-10-15"), description: "Marketing campaign", paid: false },
          { vendor_name: "Vendor A", amount: 1200.5, due_date: new Date("2025-10-01"), description: "Website development", paid: false },
          { vendor_name: "Vendor B", amount: 450.0, due_date: new Date("2025-10-10"), description: "Logo design", paid: true },
          { vendor_name: "Vendor C", amount: 800.75, due_date: new Date("2025-10-15"), description: "Marketing campaign", paid: false },
          { vendor_name: "Vendor A", amount: 1200.5, due_date: new Date("2025-10-01"), description: "Website development", paid: false },
          { vendor_name: "Vendor B", amount: 450.0, due_date: new Date("2025-10-10"), description: "Logo design", paid: true },
          { vendor_name: "Vendor C", amount: 800.75, due_date: new Date("2025-10-15"), description: "Marketing campaign", paid: false },
          { vendor_name: "Vendor A", amount: 1200.5, due_date: new Date("2025-10-01"), description: "Website development", paid: false },
          { vendor_name: "Vendor B", amount: 450.0, due_date: new Date("2025-10-10"), description: "Logo design", paid: true },
          { vendor_name: "Vendor C", amount: 800.75, due_date: new Date("2025-10-15"), description: "Marketing campaign", paid: false },
          { vendor_name: "Vendor A", amount: 1200.5, due_date: new Date("2025-10-01"), description: "Website development", paid: false },
          { vendor_name: "Vendor B", amount: 450.0, due_date: new Date("2025-10-10"), description: "Logo design", paid: true },
          { vendor_name: "Vendor C", amount: 800.75, due_date: new Date("2025-10-15"), description: "Marketing campaign", paid: false },
          { vendor_name: "Vendor A", amount: 1200.5, due_date: new Date("2025-10-01"), description: "Website development", paid: false },
          { vendor_name: "Vendor B", amount: 450.0, due_date: new Date("2025-10-10"), description: "Logo design", paid: true },
          { vendor_name: "Vendor C", amount: 800.75, due_date: new Date("2025-10-15"), description: "Marketing campaign", paid: false },
          { vendor_name: "Vendor A", amount: 1200.5, due_date: new Date("2025-10-01"), description: "Website development", paid: false },
          { vendor_name: "Vendor B", amount: 450.0, due_date: new Date("2025-10-10"), description: "Logo design", paid: true },
          { vendor_name: "Vendor C", amount: 800.75, due_date: new Date("2025-10-15"), description: "Marketing campaign", paid: false },
          { vendor_name: "Vendor A", amount: 1200.5, due_date: new Date("2025-10-01"), description: "Website development", paid: false },
          { vendor_name: "Vendor B", amount: 450.0, due_date: new Date("2025-10-10"), description: "Logo design", paid: true },
          { vendor_name: "Vendor C", amount: 800.75, due_date: new Date("2025-10-15"), description: "Marketing campaign", paid: false },
          { vendor_name: "Vendor A", amount: 1200.5, due_date: new Date("2025-10-01"), description: "Website development", paid: false },
          { vendor_name: "Vendor B", amount: 450.0, due_date: new Date("2025-10-10"), description: "Logo design", paid: true },
          { vendor_name: "Vendor C", amount: 800.75, due_date: new Date("2025-10-15"), description: "Marketing campaign", paid: false },
        ],
      },
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      password: "hashedpw2",
      invoices: {
        create: [
          { vendor_name: "Vendor D", amount: 2300, due_date: new Date("2025-11-01"), description: "App development", paid: true },
          { vendor_name: "Vendor E", amount: 150.5, due_date: new Date("2025-11-05"), description: "Consulting", paid: false },
          { vendor_name: "Vendor F", amount: 600, due_date: new Date("2025-11-10"), description: "Advertising", paid: true },
        ],
      },
    },
    {
      name: "Bob Johnson",
      email: "bob@example.com",
      password: "hashedpw3",
      invoices: {
        create: [
          { vendor_name: "Vendor G", amount: 900, due_date: new Date("2025-12-01"), description: "SEO optimization", paid: false },
          { vendor_name: "Vendor H", amount: 1200, due_date: new Date("2025-12-07"), description: "Content writing", paid: true },
          { vendor_name: "Vendor I", amount: 450, due_date: new Date("2025-12-15"), description: "Social media management", paid: false },
        ],
      },
    },
  ];

  for (const userData of usersData) {
    await prisma.user.create({
      data: userData,
    });
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
