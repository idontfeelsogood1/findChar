import { useRef } from "react";

export default function Dialog({ isCorrectHit, hasWon, showDialog }) {
    const dialogRef = useRef(null)

    // async to ensure dialogRef is set to element before running the function
    async function handleShowDialog() {
        if (showDialog) {
            dialogRef.current.showModal()
        } else {
            dialogRef.current.close()
        }
    }

    handleShowDialog()

    if (isCorrectHit && !hasWon) {
        return (
            <dialog ref={dialogRef}>
                <h1>You Hit!</h1>
            </dialog>
        )
    } 
    if (!isCorrectHit) {
        return (
            <dialog ref={dialogRef}>
                <h1>You Missed!</h1>
            </dialog>
        )
    }
    if (hasWon) {
        return (
            <dialog ref={dialogRef}>
                <h1>You Won!</h1>
            </dialog>
        )
    }
}
