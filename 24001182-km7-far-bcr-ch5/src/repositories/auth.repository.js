const JSONBigInt = require("json-bigint");

const prisma = require("../config/database/prisma");

exports.getUserByEmail = async (email) => {
    const user = await prisma.users.findFirst({
        where: {
            email: email,
        },
    });

    const serializedUser = JSONBigInt.stringify(user);
    return JSONBigInt.parse(serializedUser);
};
