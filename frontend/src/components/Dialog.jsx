import { useRef } from "react";
import WinDialog from "./WinDialog";
import MissDialog from "./MissDialog"
import HitDialog from "./HitDialog"

export default function Dialog({ isCorrectHit, hasWon, showDialog, gamename, seconds }) {
    const dialogRef = useRef(null)

    // async to ensure dialogRef is set to element before running the function
    async function handleShowDialog() {
        if (showDialog || hasWon) {
            dialogRef.current.showModal()
        } else {
            dialogRef.current.close()
        }
    }

    handleShowDialog()

    if (isCorrectHit && !hasWon) {
        return (
            <HitDialog dialogRef={dialogRef} />
        )
    } 
    if (!isCorrectHit) {
        return (
            <MissDialog dialogRef={dialogRef} />
        )
    }
    if (hasWon) {
        return (
            <WinDialog 
                dialogRef={dialogRef}
                gamename={gamename}
                seconds={seconds}
            />
        )
    }
}
