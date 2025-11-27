import style from '../components-css/MarkerBox.module.css'

export default function MarkerBox({ boxInfos }) {
    return (
        boxInfos.map((info) => {
            return (
                <div 
                    className={style.container}
                    // Necessary for functionality
                    style={{
                        position: "absolute",
                        zIndex: 9998,
                        top: info.y,
                        left: info.x,
                        width: info.width,
                        height: info.height,
                    }}
                >
                </div>
            )
        })
    )
}