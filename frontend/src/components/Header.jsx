import style from '../components-css/Header.module.css'

export default function Header() {
    return (
        <div className={style.header}>
            <a className={style.logo} href="/home">Find the character!</a>
            <a className={style.leaderboard} href="/leaderboard">Leaderboard</a>
        </div>
    )
}