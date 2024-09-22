export const getDeleteContent = (modelName) => `
export default defineEventHandler((event) => {
  const id = event.context?.params?.id;

  if (!id) {
    return createError({
      status: 422,
      message: 'Missing parameter "id"',
    });
  }

  return event.context.prisma.${modelName}.delete({
    where: {
      id,
    },
  });
});
`;

export const getGetContent = (modelName) => `
export default defineEventHandler((event) => {
  const id = event.context?.params?.id;

  if (!id) {
    return createError({
      status: 422,
      message: 'Missing parameter "id"',
    });
  }

  return event.context.prisma.${modelName}.findFirst({
    where: {
      id,
    },
  });
});
`;

export const getPutContent = (modelName) => `
export default defineEventHandler(async (event) => {
  const id = event.context?.params?.id;

  if (!id) {
    return createError({
      status: 422,
      message: 'Missing parameter "id"',
    });
  }

  const body = await readBody(event);

  return event.context.prisma.${modelName}.update({
    where: {
      id,
    },
    data: body,
  });
});
`;

export const getCreateContent = (modelName) => `
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const prisma = event.context.prisma;

  return prisma.${modelName}.create({
    data: body,
  });
});
`;

export const getListContent = (modelName) => `
export default defineEventHandler((event) => {
  return event.context.prisma.${modelName}.findMany();
});
`;
