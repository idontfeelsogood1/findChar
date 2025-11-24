import { useFetch } from "../api/hooks"

export default function Leaderboard() {
    const url = import.meta.env.VITE_SERVER_URL + `/leaderboard`
    const { data, loading, error } = useFetch(url) 
    let leaderboard = null

    if (loading) {
        return (
            <h1>Loading leaderboard...</h1>
        )
    }
    if (error) {
        return (
            <div>
                {error.message}
                {error.status}
            </div>
        )
    }
    if (data) {
        leaderboard = data.leaderboard
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Player Name</th>
                    <th>Seconds</th>
                    <th>Game Name</th>
                </tr>
            </thead>

            <tbody>
                {leaderboard.map((item) => {
                    return (
                        <tr>
                            <td>{item.username}</td>
                            <td>{item.seconds}</td>
                            <td>{item.gamename}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}