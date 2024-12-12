// taskController.ts
import { Request, Response } from 'express';
import prisma from '../config/db';

interface TaskParams {
    id: string;
}

interface CreateTaskBody {
    title: string;
    color?: string;
}

interface UpdateTaskBody extends CreateTaskBody {
    completed?: boolean;
}

export const taskController = {
    getAllTasks: async (req: Request, res: Response) => {
        try {
            const tasks = await prisma.task.findMany({
                orderBy: {
                    createdAt: 'desc'
                }
            });
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: "Error fetching tasks" });
        }
    },

    createTask: async (req: Request<{}, {}, CreateTaskBody>, res: Response) => {
        const { title, color } = req.body;
        try {
            const task = await prisma.task.create({
                data: {
                    title,
                    color: color || 'gray',
                }
            });
            res.json(task);
        } catch (error) {
            console.error('Error details:', error);
            res.status(500).json({ error: "Error creating task" });
        }
    },

    updateTask: async (req: Request<TaskParams, {}, UpdateTaskBody>, res: Response) => {
        const { id } = req.params;
        const { title, color, completed } = req.body;
        try {
            const task = await prisma.task.update({
                where: { id: Number(id) },
                data: { title, color, completed }
            });
            res.json(task);
        } catch (error) {
            res.status(500).json({ error: "Error updating task" });
        }
    },

    deleteTask: async (req: Request<TaskParams>, res: Response) => {
        const { id } = req.params;
        try {
            await prisma.task.delete({
                where: { id: Number(id) }
            });
            res.json({ message: "Task deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "Error deleting task" });
        }
    },

    getTask: async (req: Request<TaskParams>, res: Response) => {
        const { id } = req.params;
        try {
            const task = await prisma.task.findUnique({
                where: { id: Number(id) }
            });
            
            if (!task) {
                return res.status(404).json({ error: "Task not found" });
            }
            
            res.json(task);
        } catch (error) {
            res.status(500).json({ error: "Error fetching task" });
        }
    }
};