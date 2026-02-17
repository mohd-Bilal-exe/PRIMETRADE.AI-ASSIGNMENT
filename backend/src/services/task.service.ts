import prisma from "../config/database.js";


interface CreateTaskData {
  title: string;
  description?: string;
  status?: string;
  priority?: string;
}

interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
}

interface TaskFilters {
  status?: string;
  priority?: string;
  search?: string;
}

export const createTask = async (userId: string, data: CreateTaskData) => {
  const task = await prisma.task.create({
    data: {
      ...data,
      userId,
    },
  });

  return task;
};

export const getTasks = async (
  userId: string,
  filters: TaskFilters = {},
  page: number = 1,
  limit: number = 10
) => {
  const skip = (page - 1) * limit;

  const where: any = { userId };

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.priority) {
    where.priority = filters.priority;
  }

  if (filters.search) {
    where.OR = [
      { title: { contains: filters.search, mode: 'insensitive' } },
      { description: { contains: filters.search, mode: 'insensitive' } },
    ];
  }

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.task.count({ where }),
  ]);

  return {
    tasks,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getTaskById = async (userId: string, taskId: string) => {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!task) {
    throw new Error('Task not found or unauthorized');
  }

  return task;
};

export const updateTask = async (
  userId: string,
  taskId: string,
  updates: UpdateTaskData
) => {
  // Check if task exists and belongs to user
  await getTaskById(userId, taskId);

  const task = await prisma.task.update({
    where: { id: taskId },
    data: updates,
  });

  return task;
};

export const deleteTask = async (userId: string, taskId: string) => {
  // Check if task exists and belongs to user
  await getTaskById(userId, taskId);

  await prisma.task.delete({
    where: { id: taskId },
  });

  return { message: 'Task deleted successfully' };
};
