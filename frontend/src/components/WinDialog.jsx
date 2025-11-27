import { postLeaderboard } from "../api/fetch"
import { useNavigate } from "react-router"
import style from "../components-css/WinDialog.module.css"

export default function WinDialog({ dialogRef, gamename, seconds }) {
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        const callback = async () => {
            await postLeaderboard(e.target.username.value, gamename, seconds)
            navigate("/leaderboard")
        }
        callback()
    }

    return (
        <dialog className={style.customDiag} ref={dialogRef}>
            <header className={style.customHeader}>
                <h2>You found all the characters!</h2>
                <p>Time: {seconds} seconds</p>
            </header>
            <form className={style.customForm} onSubmit={handleSubmit}>
                <label htmlFor="username">Enter your name for leaderboard:</label>
                <p>
                    <input type="text" id="username" name="username" placeholder="Enter your name here..."/>
                </p>
                <button type="submit">Submit</button>
            </form>
        </dialog>
    )
}