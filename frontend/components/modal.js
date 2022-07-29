import styles from '../styles/Modal.module.css'
const Modal = () =>{
    return (
        <> 
            <div className={styles.modal_wrapper}>
                <div className={styles.modal_header}>
                    <h1>Title</h1>
                </div>
                <div className={styles.modal_body}>
                    testing what
                </div>
            </div>
        </>
    )
}

export default Modal