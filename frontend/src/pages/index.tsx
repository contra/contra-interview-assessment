/* eslint-disable canonical/filename-match-exported */
import { useState, useRef } from "react";
import { type NextPage } from 'next';

import Modal from "@/common/Modal";
import { Input } from "@/common/Input";
import BodyText from "@/common/BodyText";
import { Button } from "@/common/Button";
import { Checkbox } from "@/common/Checkbox";

const Index: NextPage = () => {
  const [isMyProfileModalOpen, setIsMyProfileModalOpen] = useState(false);
  const [isMyProfileVerificationModalOpen, setIsMyProfileVerificationModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="p-5">
      <div className="flex space-x-4">
      <Button
        onClick={() => setIsMyProfileModalOpen(true)}
        label="Open Modal 1"
      />
      <Button
        ref={buttonRef}
        variant="secondary"
        label="Second Button to show an example of finalFocusRef"
      />
      <Button
        variant="secondary"
        label="Switch to dark mode."
      />
      </div>
      <BodyText />
      <Modal
        isOpen={isMyProfileModalOpen}
        onClose={() => setIsMyProfileModalOpen(false)}
        // size="full"
        initialFocusRef={inputRef}
        // finalFocusRef={buttonRef}
        // blockScrollOnMount={false}
        closeOnOutsideClick={false}
        closeOnEsc={false}
      >
        <Modal.Header>
          <h1 className="text-lg text-gray-800">My Profile</h1>
        </Modal.Header>
        <Modal.Body>
          <p className="text-xs text-gray-600">
            This is an example of a modal that has form elements. The initial focus is set to the Input field that accepts
            the user's name. The final focus is set to the secondary button.
          </p>
          <Input
            type="text"
            label="Name"
            ref={inputRef}
            placeholder="Oliver Smith"
          />
          <Checkbox
            label="Frontend Engineer"
            name="checkbox"
            id="checkbox1"
          />
          <Checkbox
            label="Backend Engineer"
            name="checkbox"
            id="checkbox2"
          />

        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => setIsMyProfileVerificationModalOpen(true)}
            label="Open second modal"
          />
          <Button
            variant="text"
            onClick={() => setIsMyProfileModalOpen(false)}
            label="Close modal"
          />
        </Modal.Footer>
      </Modal>

      <Modal
        isOpen={isMyProfileVerificationModalOpen}
        onClose={() => setIsMyProfileVerificationModalOpen(false)}
      >
        <Modal.Header>
        <h1 className="text-lg text-gray-800">Verify Details</h1>
        </Modal.Header>
        <Modal.Body>
          <p className="text-xs text-gray-500">
            This is an example of a nested modal. Here, we have not provided an
            intialFocusRef and hence the focus is automatically set to the close button.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => setIsMyProfileVerificationModalOpen(false)}
            label="Yes, I agree."
          />
          <Button
            variant="text"
            onClick={() => setIsMyProfileVerificationModalOpen(false)}
            label="No, I disagree."
          />
        </Modal.Footer>
      </Modal>
    </div>
  );

};

export default Index;
