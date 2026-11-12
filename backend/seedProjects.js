require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("./config/db");
const Project = require("./models/Project");

const initialProjects = [
  {
    title: "Vault",
    type: "DISTRIBUTED STORAGE",

    description:
      "Distributed object storage system focused on replica integrity, self-healing, version consistency, quorum behavior and network fault recovery.",

    tech: [
      "Go",
      "Distributed Systems",
      "SHA-256",
      "HTTP",
      "Docker"
    ],

    github: "https://github.com/DHEERAJ565",

    image: "/vault.png",

    order: 1
  },

  {
    title: "Paw-Mart",
    type: "PET E-COMMERCE",

    description:
      "A full-stack pet marketplace for browsing and purchasing dogs, featuring a responsive React interface, user authentication and a Node.js and Express backend connected to MongoDB.",

    tech: [
      "React",
      "React Router",
      "Node.js",
      "Express.js",
      "MongoDB"
    ],

    github: "https://github.com/DHEERAJ565",

    image: "/paw-mart.png",

    order: 2
  },

  {
    title: "Health Predict",
    type: "HEALTH + ML",

    description:
      "Health prediction platform designed to provide data-driven health insights through a modern web interface.",

    tech: [
      "React",
      "Node.js",
      "MongoDB",
      "ML"
    ],

    github: "https://github.com/DHEERAJ565",

    image: "/health-predict.png",

    order: 3
  },

  {
    title: "Dynamic Gift Store",
    type: "E-COMMERCE",

    description:
      "Responsive full-stack shopping platform with product browsing, authentication and a modern responsive interface.",

    tech: [
      "React",
      "Node.js",
      "Express",
      "MongoDB"
    ],

    github:
      "https://github.com/DHEERAJ565/myproject1",

    image: "/gift-store.png",

    order: 4
  }
];

async function seedProjects() {
  try {
    await connectDB();

    const count = await Project.countDocuments();

    if (count > 0) {
      console.log(
        "Projects already exist. No seed data was inserted."
      );

      return;
    }

    await Project.insertMany(initialProjects);

    console.log("Initial projects inserted successfully!");
  } catch (error) {
    console.error("Project seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedProjects();