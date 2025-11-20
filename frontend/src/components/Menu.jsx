import { fetchResult } from "../api/fetch"

export default function Menu({ characters, game, showMenu, menuPosition, imgNormalizedPosition, setShowMenu, setResult }) {
    function handleClick(characterId) {
        setShowMenu(false)
        
        // Set result for game component
        const callback = async () => {
            const result = await fetchResult(game.id, characterId, imgNormalizedPosition.x, imgNormalizedPosition.y)
            setResult(result)
        }
        callback()
    }

    return showMenu && (
        <div 
            style={{
            position: 'absolute',
            top: menuPosition.y,
            left: menuPosition.x,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            padding: '10px',
            zIndex: 1000, // Ensure it's on top
        }}
        >
            <ul>
                {characters.map((character) => {
                    return (
                        <li onClick={() => handleClick(character.id)}>{character.name}</li>
                    )
                })}
            </ul>
        </div>
    )
}