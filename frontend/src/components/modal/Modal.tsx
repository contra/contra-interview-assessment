import React from 'react';
import styles from './Modal.module.css';
import ModalPortal from "./ModalPortal";


type ModalProps = React.PropsWithChildren<{
  close: Function;
  title: String;
}>;

export default class Modal extends React.Component<ModalProps> {


  public componentDidMount() {
    document.body.style.overflow = 'hidden';
  }

  public componentWillUnmount() {
    document.body.style.overflow = 'unset';
  }

  public render() {
    return (
        <ModalPortal>
        <div className={styles['modal']} role='dialog'>
          <div className={styles['modal-content']}>
            <div className={styles['modal-header']}>
              <span tabIndex={0}
                className={styles['close']}
                onClick={() => this.props.close()}
              >
                &times;
              </span>
              <h2 role='heading'>{this.props.title}</h2>
            </div>
            <div className={styles['modal-body']}>{this.props.children}</div>
          </div>
        </div>
        </ModalPortal>
    );
  }
}
