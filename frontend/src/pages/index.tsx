/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { useEffect, useState } from 'react';
import AreYouSureModal from '../Components/Modal';
import tableData from 'fixtures/tableData';


const Index: NextPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleShowModal = (): void => {
    setShowModal(true);
  };

  const handleCloseModal = (): void => {
    // Here we handle anything before the modal close. e.g if we are using form,
    // we can guide user that your form values are not save, please save it before modal close.
    if (window.confirm('Are you sure you want to kill it?')) {
      setShowModal(false);
    }
  };

  const [showChildModal, setShowChildModal] = useState<boolean>(false);
  const handleShowChildModal = (): void => {
    setShowChildModal(true);
  };

  const handleCloseChildModal = (): void => {
    setShowChildModal(false);
  };

  useEffect(() => {
    // Background scroll-locking
    if (showModal || showChildModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal, showChildModal]);

  return (
    <div className="page-main-container">
      <AreYouSureModal
        closeOverride={handleCloseModal}
        isOpen={showModal}
        overlayDismissed
        setOpen={setShowModal}
        size="sm"
        title="Are You Sure? <modal>"
      >
        <div>
          <br />
          <p className="paragraph-style">
            A simple, lightweight and innocent modal that just wants you to be sure before you <b>KILL</b> it.
            <br />
          </p>
       

          <button className="child-modal-btn" onClick={handleShowChildModal}>
            Open Child Modal
          </button>
          <br />
          <p className="paragraph-style">
            This innocent modal can be configured in following ways:
            <br />
          </p>
          <br />
          <div className="table-wrapper">
            <table
              className="w-100 table-border"
              style={{ color: 'black', border: 'solid 1px black' }}
            >
              <thead>
                <tr>
                  <th className="table-border">Name</th>
                  <th className="table-border">Type</th>
                  <th className="table-border">Default</th>
                  <th className="table-border">Description</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((data) => (
                  <tr key={data.id}>
                    <td className="table-border">{data.name}</td>
                    <td className="table-border">{data.type}</td>
                    <td className="table-border">{data.default}</td>
                    <td className="table-border">{data.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <AreYouSureModal
          closeOverride={handleCloseChildModal}
          isOpen={showChildModal}
          overlayDismissed={false}
          setOpen={setShowChildModal}
          size="xs"
          title="Child Modal"
        >
          <div>
            <div className="btn-container">
              <button
                className="child-modal-btn"
                onClick={handleCloseChildModal}
              >
                Close Child Modal
              </button>
            </div>
          </div>
        </AreYouSureModal>
      </AreYouSureModal>
      {/* Button to open the modal  */}
      <button className="page-btn-modal-open" onClick={handleShowModal}>
        Open Modal
      </button>
    </div>
  );
};

export default Index;
