import style from '../components-css/MissDialog.module.css'

export default function MissDialog({ dialogRef }) {
    return (
        <dialog className={style.customDiag} ref={dialogRef}>
            <h1>You Missed!</h1>
            <p>Try again!</p>
        </dialog>
    )
}