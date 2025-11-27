// Import based on your custom output path
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const gameMaps = [
  "City Port",
  "Rainforest",
  "Floating Island",
  "Medieval Floating Village"
];

// Some fake user profiles with base times
const players = [
    { username: "SpeedDemon", baseTime: 25 },
    { username: "EagleEye", baseTime: 40 },
    { username: "Guest player", baseTime: 120 }, // Default name test
    { username: "PixelHunter", baseTime: 55 },
    { username: "CasualGamer", baseTime: 80 },
    { username: "TheSniper", baseTime: 30 },
    { username: "WaldoWizard", baseTime: 45 },
    { username: "SlowButSteady", baseTime: 200 },
];

async function main() {
  console.log('Start seeding leaderboard...');

  // Optional: Clear existing leaderboard data
  // await prisma.leaderboard.deleteMany({});

  const leaderboardEntries = [];

  // Generate entries for each map
  for (const mapName of gameMaps) {
    for (const player of players) {
      
      // Add randomness to the time so every map looks different
      // Random variance between -10 and +20 seconds
      const variance = Math.floor(Math.random() * 30) - 10;
      const finalSeconds = Math.max(10, player.baseTime + variance);

      leaderboardEntries.push({
        gamename: mapName,
        username: player.username,
        seconds: finalSeconds,
      });
    }
  }

  // Bulk insert all entries
  const result = await prisma.leaderboard.createMany({
    data: leaderboardEntries,
  });

  console.log(`Seeding finished. Added ${result.count} scores.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });