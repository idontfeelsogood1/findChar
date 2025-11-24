import style from "../components-css/Home.module.css"

export default function Home() {
    console.log(import.meta.env.VITE_SERVER_URL)
    return (
        <div className={style.container}>
            <div>
                <a href="/game/1">
                    <img className={style.customImg} src={import.meta.env.VITE_SERVER_URL + "/images/cityport.png"} alt="cityport.png" />
                </a>
            </div>

            <div>
                <a href="/game/2">
                    <img className={style.customImg} src={import.meta.env.VITE_SERVER_URL + "/images/rainforest.png"} alt="rainforest.png" />
                </a>
            </div>

            <div>
                <a href="/game/3">
                    <img className={style.customImg} src={import.meta.env.VITE_SERVER_URL + "/images/floating_island.png"} alt="floating_island.png" />
                </a>
            </div>

            <div>
                <a href="/game/4">
                    <img className={style.customImg} src={import.meta.env.VITE_SERVER_URL + "/images/medieval_floating_village.png"} alt="medieval_floating_village.png" />
                </a>
            </div>
        </div>
    )
}