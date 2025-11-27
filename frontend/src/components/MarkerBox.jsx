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
                    <svg className={style.customSvg} width="100%" height="100%" style={{ display: 'block' }}>
                        <rect width="100%" height="100%" />
                        <line x1="0" y1="0" x2="100%" y2="100%" />
                        <line x1="100%" y1="0" x2="0" y2="100%" />
                    </svg>
                </div>
            )
        })
    )
}