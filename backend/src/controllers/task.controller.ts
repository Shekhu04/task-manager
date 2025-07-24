import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { taskSchema } from "../types/task.schema";

// Create a new task
export const createTask = async (req: Request, res: Response) => {
  const parse = taskSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: parse.error.format() }); // Validation error
  }

  const { title, description, status } = parse.data;

  // Create and return the new task
  const task = await prisma.task.create({
    data: { title, description, status },
  });
  res.status(201).json(task);
};

// Get all tasks with optional filters: pagination, status, and title search
export const getAllTasks = async (req: Request, res: Response) => {
  const { page = "1", limit = "10", status, title } = req.query;

  const where: any = {};
  if (status) where.status = status; // Filter by status
  if (title) where.title = { contains: title as string, mode: "insensitive" }; // Case-insensitive title search

  // Paginate and return tasks
  const tasks = await prisma.task.findMany({
    where,
    skip: (parseInt(page as string) - 1) * parseInt(limit as string),
    take: parseInt(limit as string),
  });

  res.json(tasks);
};

// Get a single task by its ID
export const getTaskById = async (req: Request, res: Response) => {
  const task = await prisma.task.findUnique({
    where: { id: req.params.id },
  });

  if (!task) return res.status(404).json({ error: 'Task not found' }); // Handle invalid ID
  res.json(task);
};

// Update a task by ID
export const updateTaskById = async (req: Request, res: Response) => {
  const parse = taskSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: parse.error.flatten() }); // Validation error
  }

  const { title, description, status } = parse.data;

  try {
    // Update the task
    const task = await prisma.task.update({
      where: { id: req.params.id },
      data: { title, description, status },
    });
    res.json(task);
  } catch (err) {
    res.status(404).json({ error: "Task not found" }); // Handle invalid ID
  }
};

// Delete a task by ID
export const deleteTaskById = async (req: Request, res: Response) => {
  try {
    await prisma.task.delete({ where: { id: req.params.id } }); // Delete task
    res.status(204).send(); // No content response
  } catch (err) {
    res.status(404).json({ error: "Task not found" }); // Handle invalid ID
  }
};
