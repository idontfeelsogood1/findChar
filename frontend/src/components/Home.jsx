import style from "../components-css/Home.module.css"

export default function Home() {
    return (
        <main className={style.main}>
            <h1 className={style.pickGame}>Pick a game</h1>
            <div className={style.container}>
                <div className={style.imgContainer}>
                    <a href="/game/1">
                        <img className={style.customImg} src="/images/cityport.png" alt="cityport.png" />
                    </a>
                </div>

                <div className={style.imgContainer}>
                    <a href="/game/2">
                        <img className={style.customImg} src="/images/rainforest.png" alt="rainforest.png" />
                    </a>
                </div>

                <div className={style.imgContainer}>
                    <a href="/game/3">
                        <img className={style.customImg} src="/images/floating_island.png" alt="floating_island.png" />
                    </a>
                </div>

                <div className={style.imgContainer}> 
                    <a href="/game/4">
                        <img className={style.customImg} src="/images/medieval_floating_village.png" alt="medieval_floating_village.png" />
                    </a>
                </div>
            </div>
        </main>
    )
}