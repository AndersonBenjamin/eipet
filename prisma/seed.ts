const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    const images = [
      "/images/petshops/PetShop1.png",
      "/images/petshops/PetShop2.png",
      "/images/petshops/PetShop3.png",
      "/images/petshops/PetShop4.png",
      "/images/petshops/PetShop5.png",
      "/images/petshops/PetShop6.png",
      "/images/petshops/PetShop7.png",
      "/images/petshops/PetShop8.png",
      "/images/petshops/PetShop9.png",
      "/images/petshops/PetShop10.png",

    ];
    const creativeNames = [
      "PetMania",
      "AuMiau Store",
      "Bicho Chic",
      "Patas & Pelos",
      "Mundo Pet",
      "Vida Animal",
      "CuidadoVet",
      "Amigo Fiel Vet",
      "Pet Saúde",
      "VetCare Plus",
    ];

    const addresses = [
      "Av. Felicidade Animal, 123",
      "Rua Ronronar, 456",
      "Alameda Pelos Macios, 789",
      "Travessa Lambidinha, 321",
      "Estrada dos Bigodes, 654",
      "Rua Saúde Pet, 987",
      "Av. Bem-Estar, 741",
      "Praça do Aconchego, 369",
      "Av. Doutor Pet, 852",
      "Estrada dos Remédios, 159",
    ];

    const services = [
      {
        name: "Banho e Tosa",
        description: "Higiene e estética para seu pet, com cortes personalizados.",
        price: 80.0,
        imageUrl: "/images/services/BanhoETosa.png",
      },
      {
        name: "Consulta Veterinária",
        description: "Atendimento completo para avaliar a saúde do seu pet.",
        price: 120.0,
        imageUrl: "/images/services/ConsultaVeterinaria.png",
      },
      {
        name: "Vacinação",
        description: "Proteja seu pet contra doenças com vacinas essenciais.",
        price: 90.0,
        imageUrl: "/images/services/Vacinacao.png",
      },
      {
        name: "Tosa Higiênica",
        description: "Remoção dos pelos em áreas sensíveis para higiene do pet.",
        price: 50.0,
        imageUrl: "/images/services/TosaHigienica.png",
      },
      {
        name: "Microchipagem",
        description: "Identificação eletrônica para maior segurança do seu pet.",
        price: 150.0,
        imageUrl: "/images/services/MichoChipagem.png",
      },
      {
        name: "Exames Laboratoriais",
        description: "Check-up completo para detectar possíveis doenças.",
        price: 200.0,
        imageUrl: "/images/services/Exames.png",
      },
    ];

    // Criar 10 petshops com endereços ficticios
    const petshops = [];
    for (let i = 0; i < 10; i++) {
      const name = creativeNames[i];
      const address = addresses[i];
      const imageUrl = images[i];

      const petshop = await prisma.petshop.create({
        data: {
          name,
          address,
          imageUrl: imageUrl,
        },
      });

      for (const service of services) {
        await prisma.service.create({
          data: {
            name: service.name,
            description: service.description,
            price: service.price,
            imageUrl: service.imageUrl,
            petshop: {
              connect: {
                id: petshop.id,
              },
            },
          },
        });
      }

      petshops.push(petshop);
    }

    // Fechar a conexão com o banco de dados
    await prisma.$disconnect();
  } catch (error) {
    console.error("Erro ao criar os petshops:", error);
  }
}

seedDatabase();