import { createRef } from 'react';
import ModalWrapper from './modal/modal-wrapper';
import Button from './button';

const AcceptCookiesBtn = () => {
  const btnRef = createRef();

  return (
    <Button ref={btnRef} id="test" label="test" handleClick={() => false} theme="contrast">
      Accept
    </Button>
  );
};

const CookiesModal = () => {
  return (
    <ModalWrapper
      openLabel="See Cookie Policy"
      title="Accept Cookies"
      id="accept-cookies"
      isNested={false}
      showFooterControls={true}
      showFooterClose={true}
      altBtn={<AcceptCookiesBtn />}
    >
      <main>
        <p>This is some content.</p>
        <p>This is some content.</p>
        <p>Plz accept cookies.</p>
      </main>
    </ModalWrapper>
  );
};

export default CookiesModal;
