/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { useReducer } from 'react';
import Modal from '../molecules/Modal/Modal';
import type ModalContainer from '../molecules/Modal/ModalContainerT';

const Index: NextPage = () => {
  const modalContainer: ModalContainer = {
    modalBody: {
      content: 'this is the modal body',
    },
    modalFooter: {
      text: 'this is the modal footer',
    },
    modalHeader: {
      text: 'this is the modal header',
    },
    show: false,
  };

  const [modal, dispatch] = useReducer(
    (state: ModalContainer, action: { type: string }) => {
      switch (action.type) {
        case 'show':
          return {
            ...state,
            show: true,
          };
        default:
          return state;
      }
    },
    modalContainer
  );

  return (
    <>
      <button
        onClick={() => {
          dispatch({ type: 'show' });
        }}
        type="button"
      >
        show modal
      </button>
      <br />
      <br />
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
        malesuada aliquam nisi at vestibulum. Pellentesque a placerat lectus.
        Phasellus pharetra consectetur lectus, a vulputate odio consectetur
        lobortis. Maecenas hendrerit venenatis dapibus. Nunc efficitur ex dui,
        sed lacinia velit scelerisque ac. Nullam placerat quam nunc, nec
        condimentum nisi sodales vitae. Integer finibus id est gravida aliquet.
        Morbi purus nunc, egestas ut metus et, imperdiet pulvinar enim. Maecenas
        fringilla aliquam elementum. Maecenas pretium erat in justo tempor, eu
        sollicitudin massa tempus. Donec sit amet augue posuere, ornare diam
        nec, egestas nisi. Morbi efficitur iaculis sapien, ac ullamcorper metus
        vulputate quis. Fusce lorem tortor, tristique sed dictum quis, dignissim
        a enim. Phasellus sit amet arcu id augue rutrum sagittis. Duis
        elementum, turpis a fringilla ultricies, lorem ipsum scelerisque enim,
        ut consequat nulla elit elementum neque. Nam viverra ipsum turpis. Donec
        non est feugiat, pharetra elit ut, tristique elit. Sed pulvinar
        tincidunt risus sit amet feugiat. Donec tempus mi ac dui vestibulum
        rutrum. Aenean cursus finibus nulla. Aliquam luctus viverra ullamcorper.
        Donec mi mauris, sagittis sed hendrerit sed, bibendum sed neque. Ut quis
        mi ante. Donec quis velit ut tellus elementum auctor porttitor sit amet
        tellus. Sed arcu lectus, dignissim non lectus vel, aliquam ornare nulla.
        Aenean dictum pharetra efficitur. Sed id enim mauris. Praesent laoreet
        fermentum erat, fermentum dictum elit rutrum vitae. Ut massa mauris,
        sagittis a diam vitae, tempus lobortis sem. Cras in fringilla metus, sit
        amet laoreet dolor. In cursus leo auctor aliquet euismod. Sed facilisis
        sagittis risus in maximus. Vestibulum in eros imperdiet, aliquam nulla
        ac, iaculis quam. Phasellus vel ipsum a quam pharetra porta eu quis
        quam. Vestibulum rhoncus rutrum dolor, a bibendum mi pulvinar ac. Etiam
        hendrerit commodo tortor sed molestie. Phasellus vulputate risus
        fringilla ex aliquet convallis. Nam in dolor feugiat, dapibus nunc id,
        finibus diam. Sed sagittis eu lacus in porta. Vivamus vehicula lorem nec
        quam dignissim rhoncus. Etiam arcu purus, semper et massa a, scelerisque
        consectetur tortor. Integer lacinia lacus sodales, vulputate turpis at,
        tincidunt mauris. Curabitur a pellentesque ipsum. Nulla convallis,
        tellus quis sollicitudin ultricies, est nisl egestas magna, sed
        convallis mi nisi eget nisl. Sed quis nulla ut nisl molestie mattis.
        Fusce venenatis libero in enim finibus pharetra. Donec interdum sem non
        lectus luctus auctor. Mauris sed dignissim ante, vel porta diam. In at
        justo et augue vestibulum ultricies. Aliquam viverra enim sapien, eu
        placerat odio gravida a. Nunc sollicitudin eleifend condimentum. Mauris
        quis est dui. Curabitur elementum placerat mi vitae rhoncus. Donec
        commodo neque finibus ligula euismod porta. Quisque mollis tempor
        malesuada. Vestibulum faucibus elit et aliquet interdum. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Phasellus malesuada aliquam
        nisi at vestibulum. Pellentesque a placerat lectus. Phasellus pharetra
        consectetur lectus, a vulputate odio consectetur lobortis. Maecenas
        hendrerit venenatis dapibus. Nunc efficitur ex dui, sed lacinia velit
        scelerisque ac. Nullam placerat quam nunc, nec condimentum nisi sodales
        vitae. Integer finibus id est gravida aliquet. Morbi purus nunc, egestas
        ut metus et, imperdiet pulvinar enim. Maecenas fringilla aliquam
        elementum. Maecenas pretium erat in justo tempor, eu sollicitudin massa
        tempus. Donec sit amet augue posuere, ornare diam nec, egestas nisi.
        Morbi efficitur iaculis sapien, ac ullamcorper metus vulputate quis.
        Fusce lorem tortor, tristique sed dictum quis, dignissim a enim.
        Phasellus sit amet arcu id augue rutrum sagittis. Duis elementum, turpis
        a fringilla ultricies, lorem ipsum scelerisque enim, ut consequat nulla
        elit elementum neque. Nam viverra ipsum turpis. Donec non est feugiat,
        pharetra elit ut, tristique elit. Sed pulvinar tincidunt risus sit amet
        feugiat. Donec tempus mi ac dui vestibulum rutrum. Aenean cursus finibus
        nulla. Aliquam luctus viverra ullamcorper. Donec mi mauris, sagittis sed
        hendrerit sed, bibendum sed neque. Ut quis mi ante. Donec quis velit ut
        tellus elementum auctor porttitor sit amet tellus. Sed arcu lectus,
        dignissim non lectus vel, aliquam ornare nulla. Aenean dictum pharetra
        efficitur. Sed id enim mauris. Praesent laoreet fermentum erat,
        fermentum dictum elit rutrum vitae. Ut massa mauris, sagittis a diam
        vitae, tempus lobortis sem. Cras in fringilla metus, sit amet laoreet
        dolor. In cursus leo auctor aliquet euismod. Sed facilisis sagittis
        risus in maximus. Vestibulum in eros imperdiet, aliquam nulla ac,
        iaculis quam. Phasellus vel ipsum a quam pharetra porta eu quis quam.
        Vestibulum rhoncus rutrum dolor, a bibendum mi pulvinar ac. Etiam
        hendrerit commodo tortor sed molestie. Phasellus vulputate risus
        fringilla ex aliquet convallis. Nam in dolor feugiat, dapibus nunc id,
        finibus diam. Sed sagittis eu lacus in porta. Vivamus vehicula lorem nec
        quam dignissim rhoncus. Etiam arcu purus, semper et massa a, scelerisque
        consectetur tortor. Integer lacinia lacus sodales, vulputate turpis at,
        tincidunt mauris. Curabitur a pellentesque ipsum. Nulla convallis,
        tellus quis sollicitudin ultricies, est nisl egestas magna, sed
        convallis mi nisi eget nisl. Sed quis nulla ut nisl molestie mattis.
        Fusce venenatis libero in enim finibus pharetra. Donec interdum sem non
        lectus luctus auctor. Mauris sed dignissim ante, vel porta diam. In at
        justo et augue vestibulum ultricies. Aliquam viverra enim sapien, eu
        placerat odio gravida a. Nunc sollicitudin eleifend condimentum. Mauris
        quis est dui. Curabitur elementum placerat mi vitae rhoncus. Donec
        commodo neque finibus ligula euismod porta. Quisque mollis tempor
        malesuada. Vestibulum faucibus elit et aliquet interdum. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Phasellus malesuada aliquam
        nisi at vestibulum. Pellentesque a placerat lectus. Phasellus pharetra
        consectetur lectus, a vulputate odio consectetur lobortis. Maecenas
        hendrerit venenatis dapibus. Nunc efficitur ex dui, sed lacinia velit
        scelerisque ac. Nullam placerat quam nunc, nec condimentum nisi sodales
        vitae. Integer finibus id est gravida aliquet. Morbi purus nunc, egestas
        ut metus et, imperdiet pulvinar enim. Maecenas fringilla aliquam
        elementum. Maecenas pretium erat in justo tempor, eu sollicitudin massa
        tempus. Donec sit amet augue posuere, ornare diam nec, egestas nisi.
        Morbi efficitur iaculis sapien, ac ullamcorper metus vulputate quis.
        Fusce lorem tortor, tristique sed dictum quis, dignissim a enim.
        Phasellus sit amet arcu id augue rutrum sagittis. Duis elementum, turpis
        a fringilla ultricies, lorem ipsum scelerisque enim, ut consequat nulla
        elit elementum neque. Nam viverra ipsum turpis. Donec non est feugiat,
        pharetra elit ut, tristique elit. Sed pulvinar tincidunt risus sit amet
        feugiat. Donec tempus mi ac dui vestibulum rutrum. Aenean cursus finibus
        nulla. Aliquam luctus viverra ullamcorper. Donec mi mauris, sagittis sed
        hendrerit sed, bibendum sed neque. Ut quis mi ante. Donec quis velit ut
        tellus elementum auctor porttitor sit amet tellus. Sed arcu lectus,
        dignissim non lectus vel, aliquam ornare nulla. Aenean dictum pharetra
        efficitur. Sed id enim mauris. Praesent laoreet fermentum erat,
        fermentum dictum elit rutrum vitae. Ut massa mauris, sagittis a diam
        vitae, tempus lobortis sem. Cras in fringilla metus, sit amet laoreet
        dolor. In cursus leo auctor aliquet euismod. Sed facilisis sagittis
        risus in maximus. Vestibulum in eros imperdiet, aliquam nulla ac,
        iaculis quam. Phasellus vel ipsum a quam pharetra porta eu quis quam.
        Vestibulum rhoncus rutrum dolor, a bibendum mi pulvinar ac. Etiam
        hendrerit commodo tortor sed molestie. Phasellus vulputate risus
        fringilla ex aliquet convallis. Nam in dolor feugiat, dapibus nunc id,
        finibus diam. Sed sagittis eu lacus in porta. Vivamus vehicula lorem nec
        quam dignissim rhoncus. Etiam arcu purus, semper et massa a, scelerisque
        consectetur tortor. Integer lacinia lacus sodales, vulputate turpis at,
        tincidunt mauris. Curabitur a pellentesque ipsum. Nulla convallis,
        tellus quis sollicitudin ultricies, est nisl egestas magna, sed
        convallis mi nisi eget nisl. Sed quis nulla ut nisl molestie mattis.
        Fusce venenatis libero in enim finibus pharetra. Donec interdum sem non
        lectus luctus auctor. Mauris sed dignissim ante, vel porta diam. In at
        justo et augue vestibulum ultricies. Aliquam viverra enim sapien, eu
        placerat odio gravida a. Nunc sollicitudin eleifend condimentum. Mauris
        quis est dui. Curabitur elementum placerat mi vitae rhoncus. Donec
        commodo neque finibus ligula euismod porta. Quisque mollis tempor
        malesuada. Vestibulum faucibus elit et aliquet interdum.
      </div>
      <Modal {...modal} />
    </>
  );
};

export default Index;
