require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { sequelize } = require("./models/db");
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");

const MAX_RETRIES = 10;
const RETRY_INTERVAL = 5000;

//Function to avoid race conditions of database taking too long to initialize and this process running first,
const waitForDatabase = async (retryCount = 0) => {
  try {
    await sequelize.authenticate();
    console.log("Database is ready.");
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      console.log(
        `Database connection failed. Retrying in ${
          RETRY_INTERVAL / 1000
        } seconds...`
      );
      await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL));
      await waitForDatabase(retryCount + 1);
    } else {
      console.error("Max retries exceeded. Failed to connect to the database.");
      process.exit(1);
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server
  .start()
  .then(async () => {
    server.applyMiddleware({ app });

    await waitForDatabase();

    const PORT = 4000;
    app.listen(PORT, async () => {
      try {
        await sequelize.sync();
        console.log(
          `Server running at http://localhost:${PORT}${server.graphqlPath}`
        );
      } catch (error) {
        console.error("Error syncing models with the database:", error);
        process.exit(1);
      }
    });
  })
  .catch((error) => {
    console.error("Error starting ApolloServer:", error);
    process.exit(1);
  });
