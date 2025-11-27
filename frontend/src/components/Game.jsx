import { useParams } from 'react-router';
import { useFetch } from '../api/hooks';
import { useState, useEffect } from 'react';
import Menu from './Menu';
import Dialog from './Dialog';
import MarkerBox from './MarkerBox';
import style from '../components-css/Game.module.css'

export default function Game() {
    const { gameId } = useParams()
    const [imgNormalizedPosition, setImgNormalizedPosition] = useState({ x: 0, y: 0 })
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
    const [imgSize, setImgSize] = useState({ 
        baseWidth: 0, 
        baseHeight: 0, 
        newWidth: 0,
        newHeight: 0
    })
    const [showMenu, setShowMenu] = useState(false)
    const [showDialog, setShowDialog] = useState(false)
    const [boxInfos, setBoxInfos] = useState([])
    const [result, setResult] = useState(null)
    const url = import.meta.env.VITE_SERVER_URL + `/game/${gameId}`
    const { data, loading, error } = useFetch(url)
    let game = null,
        characters = null

    useEffect(() => {
        // Show dialog on result
        setShowDialog(true)
        setTimeout(() => {
            setShowDialog(false)
        }, "2000")

        if (result) {
            if (result.isCorrectClick) {
                // Find the character of result
                const { x, y, width, height } = characters.find((char) => char.id === result.characterId)
  
                // NORMALIZE CHARACTERS BASE x, y, width, height INTO NEW newX, newY, newWidth, newHeight
                const scaleX = imgSize.newWidth / imgSize.baseWidth, 
                      scaleY = imgSize.newHeight / imgSize.baseHeight
        
                const newX = x * scaleX,
                    newY = y * scaleY,
                    newWidth= width * scaleX,
                    newHeight = height * scaleY 

                setBoxInfos([
                    ...boxInfos,
                    {
                        x: newX,
                        y: newY,
                        width: newWidth,
                        height: newHeight,
                    }
                ])
            }
        }
    }, [result])

    if (loading) {
        return (
            <div className={style.loading}>
                Loading Game...
            </div>
        )
    }
    if (error) {
        return (
            <div className={style.error}>
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
            setMenuPosition({ x: event.pageX, y: event.pageY})
            setCursorPosition({ x: event.pageX, y: event.pageY})
            setImgSize({
                baseWidth: game.baseWidth, 
                baseHeight: game.baseHeight, 
                newWidth: event.currentTarget.offsetWidth,
                newHeight: event.currentTarget.offsetHeight
            })
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
        <div className={style.container}>
            <header className={style.header}>
                <h1>Find these characters</h1>
                <div className={style.characterContainer}>
                    {characters.map((character) => {
                        return (
                            <div>
                                <h3>{character.name}</h3>
                                <img src={character.imgUrl} alt={character.imgPath} />
                            </div>
                        )
                    })}
                </div>
            </header>
            
            <main className={style.imgContainer}>
                <img className={style.customImg} src={game.imgUrl} alt={game.imgPath} onClick={handleClick}/>
                <MarkerBox boxInfos={boxInfos} />
            </main>

            <Menu 
                characters={characters} 
                game={game}
                showMenu={showMenu} 
                menuPosition={menuPosition} 
                cursorPosition={cursorPosition}
                imgNormalizedPosition={imgNormalizedPosition}
                setShowMenu={setShowMenu}
                setResult={setResult}
            />

            { result && <Dialog 
                    isCorrectHit={result.isCorrectClick}
                    hasWon={result.hasWon}
                    showDialog={showDialog}
                    gamename={game.name}
                    seconds={result.secondsFinished}
                />
            }
        </div>
    )
}


    


