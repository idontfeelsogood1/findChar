const db = require("../prisma/queries")

async function getLeaderboard(req, res) {
    try {
        const leaderboard = await db.findLeaderboard()
        res.status(200).json({ leaderboard })
    } catch(err) {
        res.status(500).json({ message: "Something went wrong." })
    }
}

async function postLeaderboard(req, res) {
    try {
        const username = req.body.username
        const gamename = req.body.gamename
        const seconds = req.body.seconds
        await db.createLeaderboardRecord(username, gamename, seconds)
        res.sendStatus(200) 
    } catch(err) {
        res.status(500).json({ message: "Something went wrong." })
    }
}

module.exports = {
    getLeaderboard,
    postLeaderboard,
}