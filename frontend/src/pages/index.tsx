/* eslint-disable canonical/filename-match-exported */
import styled from 'styled-components';
import { LoginModal, CookiesModal } from '../components';

const Wrapper = styled.div`
  width: 600px;
  height: auto;
  margin: 0 auto;
  padding: 2em;
  background: rgba(0,0,0,.1);
  border-radius: 1em;
`;

const Index = () => {
  return (
    <Wrapper>
      <LoginModal />

      <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu laoreet massa. Nulla sollicitudin maximus nibh, ac sodales dolor semper a. Aliquam posuere dolor sed laoreet lobortis. Morbi sit amet arcu augue. Mauris magna erat, eleifend nec euismod ac, pellentesque ut elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius facilisis metus.
      </p>

      <CookiesModal />
    </Wrapper>
  );
};

export default Index;
