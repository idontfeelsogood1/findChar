import style from '../components-css/HitDialog.module.css'

export default function HitDialog({ dialogRef }) {
    return (
        <dialog className={style.customDiag} ref={dialogRef}>
            <h1>You Hit!</h1>
            <p>Good Job!</p>
        </dialog>
    )
}