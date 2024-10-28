const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getUserByEmail = async (email) => {
  const user = await prisma.users.findFirst({
    where: {
      email: email,
    },
  });

  const serializedUser = JSONBigInt.stringify(user);
  return JSONBigInt.parse(serializedUser);
};
