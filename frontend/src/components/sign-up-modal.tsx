import { createRef } from 'react';
import ModalWrapper from './modal/modal-wrapper';
import Button from './button';

const SignUpBtn = () => {
  const btnRef = createRef();

  return (
    <Button ref={btnRef} id="register" label="Register New Account" handleClick={() => false} theme="contrast">
      Submit
    </Button>
  );
};

const SignUpModal = () => {
  return (
    <ModalWrapper
      openLabel="Sign Up"
      title="Sign Up"
      id="sign-up"
      isNested={true}
      showFooterControls={true}
      showFooterClose={true}
      altBtn={<SignUpBtn />}
    >
      <main>
        <p>This is some content.</p>
        <p>Plz sign up.</p>
      </main>
    </ModalWrapper>
  );
};

export default SignUpModal;
