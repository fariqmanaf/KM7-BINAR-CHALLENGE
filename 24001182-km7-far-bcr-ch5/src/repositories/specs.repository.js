const JSONBigInt = require("json-bigint");
const prisma = require("../config/database/prisma");
const getSpecsByIdRepo = async (id) => {
    const searchedSpecs = await prisma.specs.findMany({
        where: { cars_id: parseInt(id) },
        include: {
            spec_details: true,
        },
    });

    const serializedSpecs = JSONBigInt.stringify(searchedSpecs);
    return JSONBigInt.parse(serializedSpecs);
};

const createSpecsRepo = async (spec_details_id, cars_id) => {
    const newSpec = spec_details_id.map(async (id) => {
        await prisma.specs.create({
            data: {
                spec_details_id: id,
                cars_id,
            },
        });
    });
    const serializedSpecs = JSONBigInt.stringify(newSpec);
    return JSONBigInt.parse(serializedSpecs);
};

const updateSpecsRepo = async (spec_details_id, ids) => {
    const specsTarget = await prisma.specs.findMany({
        where: { cars_id: ids },
    });

    const updatedSpecs = await Promise.all(
        spec_details_id.map(async (id, index) => {
            return await prisma.specs.update({
                where: { id: specsTarget[index].id },
                data: {
                    spec_details_id: id,
                    cars_id: ids,
                },
            });
        })
    );

    const serializedSpecs = JSONBigInt.stringify(updatedSpecs);
    return JSONBigInt.parse(serializedSpecs);
};

const deleteSpecsRepo = async (cars_id) => {
    const deletedSpec = await prisma.specs.deleteMany({
        where: { cars_id: cars_id },
    });
    const serializedSpecs = JSONBigInt.stringify(deletedSpec);
    return JSONBigInt.parse(serializedSpecs);
};

module.exports = {
    createSpecsRepo,
    updateSpecsRepo,
    deleteSpecsRepo,
    getSpecsByIdRepo,
};
