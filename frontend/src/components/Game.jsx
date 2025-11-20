import { useParams } from 'react-router';
import { useFetch } from '../api/hooks';
import { useState } from 'react';
import Menu from './Menu';

export default function Game() {
    const { gameId } = useParams()
    const [imgNormalizedPosition, setImgNormalizedPosition] = useState({ x: 0, y: 0})
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0})
    const [showMenu, setShowMenu] = useState(false)
    const [result, setResult] = useState({})
    const url = import.meta.env.VITE_SERVER_URL + `/game/${gameId}`
    const { data, loading, error } = useFetch(url)

    let game = null,
        characters = null

    if (loading) {
        return (
            <div>
                Loading Game...
            </div>
        )
    }
    if (error) {
        return (
            <div>
                {error.message}
                {error.status}
            </div>
        )
    }
    if (data) {
        game = data.game
        characters = data.game.characters
    }

    function normalizeImgCoords(clickX, clickY, baseImgWidth, baseImgHeight, newImgWidth, newImgHeight) {
        const scaleX = baseImgWidth / newImgWidth
        const scaleY = baseImgHeight / newImgHeight

        const normalizedX = clickX * scaleX
        const normalizedY = clickY * scaleY

        return { normalizedX, normalizedY }
    }

    function handleClick(event) {
        if (!showMenu) {
            setShowMenu(true)
            setMenuPosition({ x: event.pageX + 20, y: event.pageY})
            const { normalizedX, normalizedY } = normalizeImgCoords(
                                                    event.nativeEvent.offsetX, 
                                                    event.nativeEvent.offsetY,
                                                    game.baseWidth,
                                                    game.baseHeight,
                                                    event.currentTarget.offsetWidth,
                                                    event.currentTarget.offsetHeight
                                                )
            setImgNormalizedPosition({ x: normalizedX, y: normalizedY })
        } else {
            setShowMenu(false)
        }
    }

    return (
        <div>
            <header>
                <h1>Find these characters</h1>
                {characters.map((character) => {
                    return (
                        <div>
                            <h3>{character.name}</h3>
                            <img src={character.imgUrl} alt={character.imgPath} />
                        </div>
                    )
                })}
            </header>
            
            <main>
                <img src={game.imgUrl} alt={game.imgPath} onClick={handleClick}/>
                <Menu 
                    characters={characters} 
                    game={game}
                    showMenu={showMenu} 
                    menuPosition={menuPosition} 
                    imgNormalizedPosition={imgNormalizedPosition}
                    setShowMenu={setShowMenu}
                    setResult={setResult}
                />
            </main>
        </div>
    )
}