import { postLeaderboard } from "../api/fetch"
import { useNavigate } from "react-router"

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
        <dialog ref={dialogRef}>
            <div>
                <h2>You found all the characters!</h2>
                <p>Time: {seconds} seconds</p>
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Enter your name for leaderboard:</label>
                <p>
                    <input type="text" id="username" name="username"/>
                </p>
                <button type="submit">Submit</button>
            </form>
        </dialog>
    )
}