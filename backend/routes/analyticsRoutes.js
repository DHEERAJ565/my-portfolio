
// const express = require("express");

// const router = express.Router();

// const requireAdmin = require("../middleware/requireAdmin");

// const Project = require("../models/Project");
// const Skill = require("../models/Skill");
// const Message = require("../models/Message");
// const Resume = require("../models/Resume");
// const Profile = require("../models/Profile");

// // ==========================================
// // ADMIN ANALYTICS
// // ==========================================

// router.get("/", requireAdmin, async (req, res) => {
//   try {

//     // FETCH COUNTS

//     const [
//       totalProjects,
//       totalSkills,
//       totalMessages,
//       unreadMessages
//     ] = await Promise.all([

//       Project.countDocuments(),

//       Skill.countDocuments(),

//       Message.countDocuments(),

//       Message.countDocuments({
//         isRead: false
//       })

//     ]);

//     // FETCH RECENT DATA

//     const [
//       resume,
//       profile,
//       recentMessages,
//       recentProjects
//     ] = await Promise.all([

//       Resume.findOne({
//         key: "primary"
//       }),

//       Profile.findOne({
//         key: "primary"
//       }),

//       Message.find()
//         .sort({ createdAt: -1 })
//         .limit(5)
//         .select("name email subject message isRead createdAt"),

//       Project.find()
//         .sort({ createdAt: -1 })
//         .limit(5)
//         .select("title type createdAt")

//     ]);

//     // RESPONSE

//     res.status(200).json({

//       success: true,

//       analytics: {

//         totalProjects,

//         totalSkills,

//         totalMessages,

//         unreadMessages,

//         resumeAvailable: Boolean(resume),

//         profileConfigured: Boolean(profile)

//       },

//       recentMessages,

//       recentProjects

//     });

//   } catch (error) {

//     console.error(
//       "Analytics Error:",
//       error
//     );

//     res.status(500).json({

//       success: false,

//       message: "Unable to load analytics."

//     });

//   }
// });

// module.exports = router;


const express = require("express");

const router = express.Router();

const requireAdmin = require("../middleware/requireAdmin");

const Project = require("../models/Project");
const Skill = require("../models/Skill");
const Message = require("../models/Message");
const Resume = require("../models/Resume");
const Profile = require("../models/Profile");
const PortfolioVisit = require("../models/PortfolioVisit");

// ==========================================
// ADMIN ANALYTICS
// ==========================================

router.get("/", requireAdmin, async (req, res) => {

  try {

    const now = new Date();

    const thirtyDaysAgo = new Date(
      now.getTime() - 30 * 24 * 60 * 60 * 1000
    );

    const sevenDaysAgo = new Date(
      now.getTime() - 7 * 24 * 60 * 60 * 1000
    );

    // ======================================
    // DATABASE STATISTICS
    // ======================================

    const [

      totalProjects,
      totalSkills,
      totalMessages,
      unreadMessages

    ] = await Promise.all([

      Project.countDocuments(),

      Skill.countDocuments(),

      Message.countDocuments(),

      Message.countDocuments({
        isRead: false
      })

    ]);

    // ======================================
    // RESUME AND PROFILE
    // ======================================

    const [

      resume,
      profile

    ] = await Promise.all([

      Resume.findOne({
        key: "primary"
      }),

      Profile.findOne({
        key: "primary"
      })

    ]);

    // ======================================
    // VISITOR ANALYTICS
    // ======================================

    const [

      pageViews30Days,
      uniqueVisitorHashes,
      sectionStats,
      dailyStats

    ] = await Promise.all([

      // PAGE VIEWS

      PortfolioVisit.countDocuments({

        eventType: "page",

        createdAt: {
          $gte: thirtyDaysAgo
        }

      }),

      // UNIQUE BROWSER IDENTIFIERS

      PortfolioVisit.distinct(

        "visitorHash",

        {
          eventType: "page",

          createdAt: {
            $gte: thirtyDaysAgo
          }
        }

      ),

      // POPULAR SECTIONS

      PortfolioVisit.aggregate([

        {
          $match: {

            eventType: "section",

            createdAt: {
              $gte: thirtyDaysAgo
            }

          }
        },

        {
          $group: {

            _id: "$section",

            views: {
              $sum: 1
            }

          }
        },

        {
          $sort: {
            views: -1
          }
        },

        {
          $limit: 6
        }

      ]),

      // LAST 7 DAYS

      PortfolioVisit.aggregate([

        {
          $match: {

            eventType: "page",

            createdAt: {
              $gte: sevenDaysAgo
            }

          }
        },

        {
          $group: {

            _id: {

              $dateToString: {

                format: "%Y-%m-%d",

                date: "$createdAt",

                timezone: "Asia/Kolkata"

              }

            },

            views: {
              $sum: 1
            }

          }
        },

        {
          $sort: {
            _id: 1
          }
        }

      ])

    ]);

    // ======================================
    // RECENT MESSAGES AND PROJECTS
    // ======================================

    const [

      recentMessages,
      recentProjects

    ] = await Promise.all([

      Message.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select(
          "name email subject message isRead createdAt"
        ),

      Project.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("title type createdAt")

    ]);

    // ======================================
    // RESPONSE
    // ======================================

    res.status(200).json({

      success: true,

      analytics: {

        totalProjects,

        totalSkills,

        totalMessages,

        unreadMessages,

        resumeAvailable: Boolean(resume),

        profileConfigured: Boolean(profile),

        pageViews30Days,

        uniqueVisitors30Days:
          uniqueVisitorHashes.length

      },

      sectionStats: sectionStats.map((item) => ({

        section: item._id,

        views: item.views

      })),

      dailyPageViews: dailyStats.map((item) => ({

        date: item._id,

        views: item.views

      })),

      recentMessages,

      recentProjects

    });

  } catch (error) {

    console.error(
      "Analytics Error:",
      error
    );

    res.status(500).json({

      success: false,

      message: "Unable to load analytics."

    });

  }

});

module.exports = router;