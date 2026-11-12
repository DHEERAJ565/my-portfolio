
require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("./config/db");
const Skill = require("./models/Skill");

const initialSkills = [
  {
    name: "React",
    type: "Frontend",
    icon: "react",
    level: "Core",
    order: 1
  },
  {
    name: "JavaScript",
    type: "Language",
    icon: "javascript",
    level: "Core",
    order: 2
  },
  {
    name: "Node.js",
    type: "Backend",
    icon: "node",
    level: "Core",
    order: 3
  },
  {
    name: "Express",
    type: "Backend",
    icon: "express",
    level: "Core",
    order: 4
  },
  {
    name: "MongoDB",
    type: "Database",
    icon: "mongodb",
    level: "Core",
    order: 5
  },
  {
    name: "Tailwind",
    type: "UI",
    icon: "tailwind",
    level: "Learning",
    order: 6
  },
  {
    name: "FastAPI",
    type: "Python",
    icon: "fastapi",
    level: "Learning",
    order: 7
  },
  {
    name: "Docker",
    type: "DevOps",
    icon: "docker",
    level: "Learning",
    order: 8
  },
  {
    name: "HTML",
    type: "Frontend",
    icon: "html",
    level: "Core",
    order: 9
  },
  {
    name: "CSS",
    type: "Frontend",
    icon: "css",
    level: "Core",
    order: 10
  },
  {
    name: "Server",
    type: "Backend",
    icon: "server",
    level: "Learning",
    order: 11
  }
];

async function seedSkills() {
  try {
    await connectDB();

    const existingCount = await Skill.countDocuments();

    if (existingCount > 0) {
      console.log(
        "Skills already exist. No seed data inserted."
      );

      return;
    }

    await Skill.insertMany(initialSkills);

    console.log("Initial 11 skills inserted successfully!");

  } catch (error) {
    console.error("Skills seeding failed:", error);

    process.exitCode = 1;

  } finally {
    await mongoose.disconnect();
  }
}

seedSkills();