import { useFetch } from "../api/hooks"
import style from "../components-css/Leaderboard.module.css"

export default function Leaderboard() {
    const url = import.meta.env.VITE_SERVER_URL + `/leaderboard`
    const { data, loading, error } = useFetch(url) 
    let leaderboard = null

    if (loading) {
        return (
            <h1 className={style.loading}>Loading leaderboard...</h1>
        )
    }
    if (error) {
        return (
            <div className={style.error}>
                {error.message}
                {error.status}
            </div>
        )
    }
    if (data) {
        leaderboard = data.leaderboard
    }

    return (
        <table className={style.customTable}>
            <thead className={style.tableHead}>
                <tr className={style.customTr}>
                    <th>Player Name</th>
                    <th>Seconds</th>
                    <th>Game Name</th>
                </tr>
            </thead>

            <tbody className={style.tableBody}>
                {leaderboard.map((item) => {
                    return (
                        <tr className={style.customTr}>
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