// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const fixedTimes = ['09:30', '13:00', '16:30'];

const populateAppointments = async () => {
  const today = new Date();
  const monthFromToday = new Date(today);
  monthFromToday.setDate(today.getDate() + 30);

  for (
    let date = new Date(today);
    date <= monthFromToday;
    date.setDate(date.getDate() + 1)
  ) {
    // Skip weekends (Saturday and Sunday)
    if (date.getDay() === 0 || date.getDay() === 6) continue;

    // Process each time slot
    for (const time of fixedTimes) {
      const finnishTime = createUtcTime(date, time);

      await prisma.appointment.create({
        data: {
          dateTime: finnishTime,
          status: 'AVAILABLE',
        },
      });
    }
  }

  await prisma.$disconnect();
};

const createUtcTime = (date, time) => {
  const [hours, minutes] = time.split(':');
  const dateTime = new Date(date);
  dateTime.setHours(Number(hours), Number(minutes), 0, 0);

  return dateTime.toISOString();
};

populateAppointments();
