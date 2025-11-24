const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const gamesData = [
  {
    name: "City Port",
    imgPath: "cityport.png",
    baseWidth: 3030,
    baseHeight: 1952,
    characters: [
      { name: "Maria", imgPath: "maria.png", width: 37, height: 87, x: 1959, y: 724 },
      { name: "KFC", imgPath: "kfc.png", width: 33, height: 39, x: 1294, y: 1119 },
      { name: "Crabby", imgPath: "crabby.png", width: 44, height: 32, x: 1290, y: 1586 },
    ],
  },
  {
    name: "Rainforest",
    imgPath: "rainforest.png",
    baseWidth: 1200,
    baseHeight: 1645,
    characters: [
      { name: "Momo", imgPath: "momo.png", width: 60, height: 70, x: 230, y: 898 },
      { name: "Pip", imgPath: "pip.png", width: 86, height: 94, x: 24, y: 754 },
      { name: "Vinnie", imgPath: "vinnie.png", width: 100, height: 86, x: 980, y: 446 },
    ],
  },
  {
    name: "Floating Island",
    imgPath: "floating_island.png",
    baseWidth: 5000,
    baseHeight: 5000,
    characters: [
      { name: "Bessie", imgPath: "bessie.png", width: 313, height: 231, x: 545, y: 1370 },
      { name: "Gnorman", imgPath: "gnorman.png", width: 275, height: 242, x: 2162, y: 2371 },
      { name: "Spike", imgPath: "spike.png", width: 281, height: 160, x: 1089, y: 2640 },
    ],
  },
  {
    name: "Medieval Floating Village",
    imgPath: "medieval_floating_village.png",
    baseWidth: 4961,
    baseHeight: 3543,
    characters: [
      { name: "Gherkin", imgPath: "gherkin.png", width: 128, height: 180, x: 1388, y: 2548 },
      { name: "Pickles", imgPath: "pickles.png", width: 104, height: 168, x: 3360, y: 2048 },
      { name: "Wobbles", imgPath: "wobbles.png", width: 132, height: 188, x: 3200, y: 864 },
    ],
  },
];

async function main() {
  console.log('Start seeding...');

  // 1. Clean up existing data to avoid duplicates
  // Note: We delete Characters first because they depend on Games
  await prisma.character.deleteMany({});
  await prisma.game.deleteMany({});
  await prisma.leaderboard.deleteMany({}); 

  // 2. Insert new data
  // We use nested writes to create the Game and its Characters in one go
  for (const game of gamesData) {
    const createdGame = await prisma.game.create({
      data: {
        name: game.name,
        imgPath: game.imgPath,
        baseWidth: game.baseWidth,
        baseHeight: game.baseHeight,
        characters: {
          create: game.characters.map((char) => ({
            name: char.name,
            imgPath: char.imgPath,
            width: char.width,
            height: char.height,
            x: char.x,
            y: char.y,
          })),
        },
      },
    });
    console.log(`Created game with id: ${createdGame.id} (${createdGame.name})`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });