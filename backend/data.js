import bcrypt from "bcryptjs";

const data = {
  user: [
    {
      name: "Me",
      email: "admin@example@gmail.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: true,
    },
    {
      name: "User",
      email: "user@example@gmail.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      _id: "1",
      name: "Blue Dress Shirt",
      category: "Shirts",
      image: "/images/BlueDressShirt.jpg",
      price: 40,
      countInStock: 4,
      brand: "Polo",
      rating: 2,
      numReviews: 10,
      description: "High quality dress shirt",
    },
  ],
};

export default data;
