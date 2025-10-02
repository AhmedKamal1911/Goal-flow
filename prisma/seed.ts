import { PrismaClient, SizeEnum } from "@prisma/client";
import slugify from "slugify";
const prisma = new PrismaClient();

async function main() {
  const categories = ["Burgers", "Pizzas", "Sandwiches"];

  const categoryData = await Promise.all(
    categories.map(async (name) => {
      const slug = slugify(name, { lower: true });
      return await prisma.productCategory.upsert({
        where: { slug },
        update: {},
        create: {
          name,
          slug,
          image: "/images/categories-section/burger.jpg",
        },
      });
    })
  );

  const products = [
    "Cheeseburger",
    "Double Burger",
    "BBQ Burger",
    "Margherita Pizza",
    "Pepperoni Pizza",
    "Veggie Pizza",
    "Chicken Sandwich",
    "Club Sandwich",
    "Grilled Cheese",
    "Philly Cheesesteak",
    "Philly Cheeseak",
    "Philly Cheeseseak",
    "Philly Cesteak",
    "Philly Ceeseeak",
    "Philly Cheesesteak",
    "Philly Chest",
    "Philly Cheeses",
    "Philly Cheesest",
    "Philly Chees",
    "Philly Ck",
  ];

  const productData = await Promise.all(
    products.map(async (name, index) => {
      const slug = slugify(name, { lower: true });
      const category = categoryData[index % categoryData.length];
      return await prisma.product.upsert({
        where: { slug },
        update: {},
        create: {
          name,
          slug,
          description: `${name} description`,
          image: "/images/special-products/burger.png",
          price: parseFloat((Math.random() * 10 + 5).toFixed(2)),
          categoryId: category.id,
        },
      });
    })
  );

  const sizes = ["Small", "Medium", "Large"] as SizeEnum[];

  await Promise.all(
    productData.flatMap((product) =>
      sizes.map(async (size, index) => {
        return await prisma.size.upsert({
          where: { name_productId: { productId: product.id, name: size } },
          update: {},
          create: {
            name: size,
            price: (index + 1) * 2.5,
            productId: product.id,
          },
        });
      })
    )
  );

  const extras = ["Cheese", "Bacon", "Mushrooms", "Onions", "Jalapenos"];

  await Promise.all(
    productData.flatMap((product) =>
      extras.map(async (extra) => {
        return await prisma.extra.upsert({
          where: { name_productId: { productId: product.id, name: extra } },
          update: {},
          create: {
            name: extra,
            price: parseFloat((Math.random() * 2 + 1).toFixed(2)),
            productId: product.id,
          },
        });
      })
    )
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
