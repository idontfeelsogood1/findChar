import { fetchResult } from "../api/fetch"
import style from "../components-css/Menu.module.css"

export default function Menu({ characters, game, showMenu, menuPosition, cursorPosition, imgNormalizedPosition, setShowMenu, setResult }) {
    function handleClick(characterId) {
        setShowMenu(false)
        
        // Set result for game component
        const callback = async () => {
            const result = await fetchResult(game.id, characterId, imgNormalizedPosition.x, imgNormalizedPosition.y)
            setResult(result)
        }
        callback()
    }

    const markerWidth = 30,
          markerHeight = 30,
          menuOffsetX = 30,
          menuOffsetY = 18
    return showMenu && (
        <>
            <div className={style.customUl}
                // Necessary for functionality
                style={{
                    position: 'absolute',
                    top: menuPosition.y - menuOffsetY,
                    left: menuPosition.x + menuOffsetX,
                    zIndex: 1000, // Ensure it's on top
                }}
            >
                {characters.map((character) => {
                    return (
                        <div className={style.customLi} onClick={() => handleClick(character.id)}>{character.name}</div>
                    )
                })}
            </div>
            <div className={style.marker}
                // Necessary for functionality
                style={{
                    position: 'absolute',
                    width: markerWidth,
                    height: markerHeight,
                    top: cursorPosition.y - (markerHeight / 2),
                    left: cursorPosition.x - (markerWidth / 2),
                    zIndex: 999,
                }}
            >
            </div>
        </>
    )
}