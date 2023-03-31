import React from "react";
import ReactDOM from "react-dom";


type ModalProps = {
}

export default class ModalPortal extends React.Component<{ children?: React.ReactNode }> {

    public constructor(props: ModalProps) {
        super(props);

        this.modalRoot = document
            .querySelector("#modal-root") as HTMLElement | null;


        if (this.modalRoot === null) {
            this.modalRoot = document.createElement('div');
            this.modalRoot.setAttribute('id', 'modal-root');
            document.body.appendChild(this.modalRoot);
        }

        this.el = document.createElement('div');
    }

    public componentDidMount() {
        this.modalRoot?.appendChild(this.el);
    }

    public componentWillUnmount() {
        this.modalRoot?.removeChild(this.el);
    }

    private readonly modalRoot?: HTMLElement | null;

    public el: HTMLElement;

    public render() {
        return ReactDOM.createPortal((<>{this.props.children}</>), this.el);
    }
}