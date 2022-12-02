const User = require('../models/user');
const Appreciation = require('../models/appreciation')
const { Op, Sequelize } = require("sequelize");
const sequelize = require('../util/database');

/* Returns all of the current users that have created an account
    Used for pop-up option when choosing who to send Kudos to
 */
const allUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ["user_id", "first_name", "last_name"],
            where: {
                user_id: {
                    [Op.not]: req.query.user_id
                  }
            }
        });
        return res.status(201).json({
            users,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

/* Returns all of the managers/admins registed on the web-app
    Used for pop-up option when creating account for "Reports To"
*/
const allManagers = async (req, res) => {
    try {
        const managers = await User.findAll({
            attributes: ["user_id", "first_name", "last_name"],
            where: {
                [Op.or]: [{ position: "Admin" }, { position: "Manager" }],  
            }
        });
        return res.status(201).json({
            managers,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

/* GET Request returns total amount of appreciations sent/received by all users
    Used for dashboard statistics "Total Letters Sent Across Ally" */
const allAppreciations = async (req, res) => {
    try {
        const kudos = await Appreciation.findAll();
        return res.status(201).json({
            kudos,
        });
    } catch (error) {
        return res.status(500).json({ error : error.message })
    }
}

/* GET Request returns total amount of users
    Used for dashboard statistics "Total Users Across Ally" */
const totalUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(201).json({
            users,
        });
    } catch (error) {
        return res.status(500).json({ error : error.message })
    }
}

const userCount = async (req, res) => {
    try {
        const count = await sequelize.query(`SELECT COUNT(*) AS Users FROM Ally_Kudos.Users`);
        return res.status(201).json({
            count,
        });
    } catch (error) {
        return res.status(500).json({ error : error.message })
    }
}

const generousAppreciations = async (req, res) => {
    try {
        const apprs = await Appreciation.findAll({
            where: {
                kudos_points: {
                    [Op.gte] : 750
                },
                approved: {
                    [Op.ne] : 1
                }
            }
        });
        return res.status(201).json({
            apprs,
        });
    } catch (error) {
        return res.status(500).json({ error : error.message })
    }
}

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.status(201).json({
            user,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const validateUser = async (req, res) => {
    try {
        const user = await User.findAll({
            where: {
                username: req.query.username,
                password: req.query.password
            }
        });
        return res.status(201).json({
            user,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

/* POST Request to add appreciation to database table
    When user clicks next button in KudosResult page */
const addAppreciation = async (req, res) => {
    try {
        const appr = await Appreciation.create(req.body);
        return res.status(201).json({
            appr,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}

/* GET Request for sent appreciations that returns them in order of most recent
    Used for history shown on dashboard */
const latestSentAppreciations = async (req, res) => {
    try {
        const appreciations = await Appreciation.findAll({
            where: {
                user_id : req.query.user_id
            },
            order: [
                ["createdAt", "DESC"]
            ]
        });
        return res.status(201).json({
            appreciations,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}

/* GET Request for received appreciations that returns them in recent order
    Used for history shown on dashboard */
const latestReceivedAppreciations = async (req, res) => {
    try {
        const appreciations = await Appreciation.findAll({
            where: {
                user_receive_id : req.query.user_id
            },
            order: [
                ["createdAt", "DESC"]
            ]
        });
        return res.status(201).json({
            appreciations,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}

const monthlySentKudos = async (req, res) => {
    try {
        const kudos = await Appreciation.findAll({
            attributes: ["kudos_points", "createdAt"],
            where: {
                user_receive_id : req.query.user_id
            }
        });
        return res.status(201).json({
            kudos,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}

const monthlyReceivedKudos = async (req, res) => {
    try {
        const kudos = await Appreciation.findAll({
            attributes: ["kudos_points", "createdAt"],
            where: {
                user_id : req.query.user_id
            }
        });
        return res.status(201).json({
            kudos,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}

const deleteAppreciation = async (req, res) => {
    try {
        const apprs = await Appreciation.destroy({
            where: {
              appreciation_id: req.query.appreciation_id
            }
        });
        return res.status(201).json({
            apprs,
        });
    } catch (error) {
        return res.status(500).json({ error : error.message})
    }
}

const approveAppreciation = async (req, res) => {
    try {
        const apprs = await Appreciation.update({ approved: 1 }, {
            where: {
              appreciation_id: req.query.appreciation_id
            }
        });
        return res.status(201).json({
            apprs,
        })
    } catch (error) {
        return res.status(500).json({ error : error.message})
    }
}


const findEmail = async (req, res) => {
    try {
        const address = await User.findAll({
            attributes: ["email"],
            where: {
                user_id : req.query.user_id
            }
        });
        return res.status(201).json({
            address,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}

const findFirstName = async (req, res) => {
    try {
        const name = await User.findAll({
            attributes: ["first_name"],
            where: {
                user_id : req.query.user_id
            }
        });
        return res.status(201).json({
            name,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}

const updateSent = async (req, res) => {
    try {
        const [result, metadata] = await sequelize.query(`SELECT SUM(kudos_points) AS Sent FROM Ally_Kudos.Appreciations
        WHERE user_id = ${req.query.user_id.toString()}`);
        console.log(result);
        return res.status(201).json({
            result,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}

const updateReceived = async (req, res) => {
    try {
        const [result, metadata] = await sequelize.query(`SELECT SUM(kudos_points) AS Received FROM Ally_Kudos.Appreciations
        WHERE user_receive_id = ${req.query.user_id.toString()}`);
        console.log(result);
        return res.status(201).json({
            result,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}

/* Requests for DataLayers */

/* Getting who has talked to who to create link line in deck.gl graph */
const generateLinks = async (req, res) => {
    try {
        const [links] = await sequelize.query(`SELECT DISTINCT
        CASE 
          WHEN user_id < user_receive_id THEN user_id 
          ELSE user_receive_id 
        END AS source,
        CASE 
          WHEN user_id > user_receive_id THEN user_id 
          ELSE user_receive_id 
        END AS target
FROM Appreciations ORDER BY user_id`);

        return res.status(201).json({
            links
        });

    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}

/* Create the nodes for the deck.gl graph */
const singleUserConnections = async (req, res) => {
    try {

        const [sendCount] = await sequelize.query(`SELECT user_id, count(1) AS Sender FROM Ally_Kudos.Appreciations 
        GROUP BY user_id`);

        const [receiveCount] = await sequelize.query(`SELECT user_receive_id as user_id, count(1) AS Receiver FROM Ally_Kudos.Appreciations 
        GROUP BY user_receive_id`);

        const users = await User.findAll({
            attributes: ["user_id", "first_name", "position"],
        });

        // List of nodes
        let nodes = [];

        // Loop through the users to see if each has sent and/or received appreaciations
        for (index in users) {

            // If a user has no appreciations, the radius of their node will be size 1 to be visible on the graph
            let count = 0;

            for (sent in sendCount) {
                if (sendCount[sent].user_id === users[index].user_id) {
                    count += sendCount[sent].Sender;
                    break;
                }
            }

            for (receive in receiveCount) {
                if (receiveCount[receive].user_id === users[index].user_id) {
                    count += receiveCount[receive].Receiver;
                    break;

                }
            }
            
            if (count == 1) {
                count = count + 0.5;
            }
            else if (count >= 3) {
                count = count / 3;
            }

            // For max case...
            if (count > 6) {
                count = 6;
            }
            
            if (count != 0) {
                nodes.push({id: users[index].user_id, name: users[index].first_name, radius: count, role: users[index].position});
            }
        }

        return res.status(201).json({
            nodes,
        });
        
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}

// GET requests for awards
const uniqueConnections = async (req, res) => {
    try {
        const [result, metadata] = await sequelize.query(`SELECT COUNT(DISTINCT( 
            CASE 
              WHEN user_id < user_receive_id THEN user_id 
              ELSE user_receive_id 
            END),
            (CASE 
              WHEN user_id > user_receive_id THEN user_id 
              ELSE user_receive_id 
            END)) AS num_connections
  FROM Appreciations WHERE user_id = ${req.query.user_id.toString()}`);
        console.log(result)
        return res.status(201).json({
            result,
        });
    } catch (error) {
        return res.status(500).json({ error : error.message })
    }
}

const noConnections = async (req, res) => {
    try {
        const [result, metadata] = await sequelize.query(`SELECT first_name, last_name FROM Users WHERE user_id 
        NOT IN(
        SELECT user_id AS connections
          FROM Appreciations
        UNION
        SELECT user_receive_id
          FROM Appreciations
        )`);
        console.log(result)
        return res.status(201).json({
            result,
        });
    } catch (error) {
        return res.status(500).json({ error : error.message })
    }
}

// /* Returns list of Id and correlating names for text layer */
// const userNameIDs = async (req, res) => {
//     try {
//         const userText = await User.findAll({
//             attributes: ["user_id", "first_name"],
//         });
//         return res.status(201).json({
//             userText,
//         });
//     } catch (error) {
//         return res.status(500).json({ error: error.message})
//     }
// }

// /* Returns all user ids */
// const userIDs = async (req, res) => {
//     try {
//         const ids = await User.findAll({
//             attributes: ["user_id"],
//         });
//         return res.status(201).json({
//             ids,
//         });
//     } catch (error) {
//         return res.status(500).json({ error: error.message})
//     }
// }

// // OLD Function .... tester
// const d3Nodes = async (req, res) => {
//     try {
//         const userNodes = await User.findAll();
//         console.log(userNodes);
//         return res.status(201).json({
//             userNodes,
//         });
//     } catch (error) {
//         return res.status(500).json({ error : error.message });
//     }
// }

/* Requests for DataLayers */

module.exports = {
    createUser, 
    validateUser, 
    addAppreciation,
    latestSentAppreciations,
    latestReceivedAppreciations,
    generousAppreciations,
    deleteAppreciation,
    approveAppreciation,
    monthlyReceivedKudos,
    monthlySentKudos,
    allAppreciations,
    updateSent,
    updateReceived,
    findEmail,
    findFirstName,
    allManagers,
    allUsers,
    totalUsers,
    userCount,
    generateLinks,
    singleUserConnections,
    uniqueConnections,
    noConnections,
    // userNameIDs,
    // userIDs,
    // d3Nodes,
}
