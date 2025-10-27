import App from "./app";

async function startServer() {
  const server = new App();

  try {
    await server.initializeDatabase();
    server.listen();
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
