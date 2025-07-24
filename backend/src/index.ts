// Import core modules and utilities
import express from 'express';
import { setupSwagger } from './utils/swagger'; // Swagger setup function
import taskRoutes from './routes/task.routes'; // Task-related route handlers

// Initialize the Express application
const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Mount task-related routes at /tasks endpoint
// e.g., POST /tasks, GET /tasks/:id, etc.
app.use('/tasks', taskRoutes);

// Set up Swagger documentation at /api-docs
setupSwagger(app);

// Basic root endpoint for health check or default response
app.get('/', (_req, res) => {
  res.send('Task Manager API is running!');
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`Swagger Docs: http://localhost:${PORT}/api-docs`);
});
