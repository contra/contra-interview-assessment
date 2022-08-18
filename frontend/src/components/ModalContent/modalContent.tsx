/* eslint-disable canonical/filename-match-exported */
import React, { FunctionComponent, useState } from 'react';
import Modal from '@/components/Modal/modal';
import InnerModalContent from './innerModalContent';

const ModalContent: FunctionComponent = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <React.Fragment>
            <div>
                <p>
                    Here's where you put some content!
                </p>
                <button
                    onClick={() => setShowModal(true)}
                >
                    {'Click to open inner modal'}
                </button>
                <Modal
                    isShowing={showModal}
                    closeModal={() => setShowModal(false)}
                    content={[<InnerModalContent />]}
                    headline='Sample Modal'
                />
            </div>
        </React.Fragment>
    )
};

export default ModalContent;