/* eslint-disable canonical/filename-match-exported */
import { useState } from 'react';
import { ModalContainer } from './components/modalContainer';
import { multipleModal } from './components/modalData';
import { Navigation } from './components/nav';

const Settings = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleToggleModals = () => {
    // turning scroll lock on and off
    if (openModal) {
      document.body.classList.remove('no-scroll');
    } else {
      document.body.classList.add('no-scroll');
    }

    setOpenModal(!openModal);
  };

  return (
    <div className="container">
      <h1 className="heading">Multiple Modals</h1>
      <Navigation navLinks={[{ name: 'Back', path: '/' }]} />
      <div className="container-body">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id
          magna in lorem sodales maximus aliquet sit amet ipsum. Fusce finibus
          imperdiet nisl luctus egestas. Aliquam erat volutpat. Phasellus
          malesuada tempor velit at eleifend. Donec euismod sagittis libero, ac
          efficitur ipsum lacinia eu. Fusce vestibulum nisi ac sem malesuada, eu
          semper leo malesuada. Duis non consequat orci, in blandit mauris.
          Morbi pretium justo et massa imperdiet, eu luctus leo fermentum. Ut a
          velit ut ligula blandit tempus. Mauris quis magna ac massa tincidunt
          sollicitudin ullamcorper quis nibh. Nullam lacus felis, pharetra eu
          erat non, tristique tempor ligula. Morbi vehicula venenatis lectus.
          Duis id faucibus elit. Duis quis dui iaculis, dapibus dolor sit amet,
          sollicitudin orci. Fusce mattis, erat non blandit aliquet, nisl ante
          tristique neque, vel auctor lorem metus nec augue. Nullam consectetur
          eu neque pharetra sollicitudin. Nullam eu massa nulla. Donec vel
          tortor interdum, convallis massa vitae, efficitur velit. Sed eget
          suscipit quam. Morbi ut cursus ante, vitae vulputate risus. Donec quis
          metus nec metus tempor aliquet. Cras fermentum in velit a lobortis.
          Curabitur laoreet tortor mi. Etiam dignissim lectus nulla, non
          molestie est mollis quis. Donec eleifend, turpis ut semper dapibus,
          eros neque feugiat dolor, eget aliquam lectus arcu nec magna. Nunc
          nisi risus, viverra ac purus in, blandit pellentesque arcu. Aenean
          aliquam felis elit, in eleifend felis feugiat vitae. Aliquam hendrerit
          luctus accumsan. Integer vitae finibus quam, et scelerisque nulla.
          Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam
          mollis, lectus id interdum tempus, lorem felis lobortis lacus, non
          commodo urna lorem varius sem. Suspendisse ornare nibh a quam vehicula
          volutpat. Maecenas feugiat, ex eleifend rutrum hendrerit, est magna
          bibendum neque, vel eleifend enim lectus ut velit. Vestibulum luctus
          placerat neque, id molestie mi elementum eu. Aenean eget justo ac sem
          pellentesque mollis. Morbi dapibus, orci vel lobortis dictum, tellus
          augue tristique leo, nec dictum nulla est et elit. Ut id velit sit
          amet nisi aliquet tincidunt pretium sit amet turpis. Curabitur tortor
          mauris, vehicula vel neque at, pellentesque posuere leo. Fusce eu
          purus ac ex feugiat maximus. Nullam erat neque, egestas venenatis quam
          eu, pulvinar eleifend mauris. Nulla sed magna eget tortor consectetur
          ornare. Nam varius imperdiet ante ut dictum. Maecenas ligula nisl,
          feugiat eget urna nec, venenatis cursus est. In finibus posuere magna,
          ac elementum ante tempor id. Vivamus sed ante a leo eleifend
          scelerisque.
        </p>
        <button className="button" onClick={handleToggleModals} type="button">
          Open Multiple Modals
        </button>
        <p>
          Donec non vestibulum massa. Curabitur nec felis lacus. Integer ut leo
          ut est imperdiet eleifend vel at ante. Morbi eget vulputate lacus, in
          egestas ligula. Nulla finibus tortor ac nisi semper, non euismod massa
          consequat. Nam ultrices, nisi a auctor venenatis, ante nisi ornare
          justo, non tincidunt augue ipsum in mi. Donec ultrices ligula at
          sapien egestas congue. Fusce et purus sit amet turpis convallis
          interdum. Sed in quam augue. Interdum et malesuada fames ac ante ipsum
          primis in faucibus. Vivamus tincidunt urna in convallis dapibus. Donec
          pretium, est ut sollicitudin tincidunt, est nisl lacinia orci, eu
          blandit justo massa vel ante. Mauris eget quam leo. Aenean rutrum
          felis in diam tristique pharetra. Integer eu nulla aliquet, vehicula
          sem et, porta nisl. Mauris semper dignissim ipsum, nec viverra sem
          hendrerit vel. Quisque enim nibh, feugiat at porttitor a, sagittis a
          velit. In at neque orci. Duis rutrum, justo at pretium auctor, lectus
          nisl posuere erat, ut lobortis orci est ut neque. Nulla id felis nibh.
          Nullam libero sem, varius vel tempus non, tristique vitae augue. In
          lorem dui, imperdiet vitae laoreet sed, ultrices id ipsum. Donec
          pulvinar enim urna, et tincidunt lorem euismod nec. Vivamus eget lorem
          vehicula, ultrices lorem ut, dapibus augue. Mauris elementum, ipsum
          quis fringilla malesuada, arcu mauris imperdiet enim, ac interdum erat
          turpis vel dolor. In tortor justo, tincidunt ac tempus ut, posuere sit
          amet urna. Sed sit amet aliquet ex. Curabitur eget justo dolor.
          Suspendisse sed finibus libero. Aenean tempus, justo sit amet faucibus
          varius, mauris tellus consequat massa, sit amet aliquet libero leo ac
          odio. Donec lacinia vel diam ut commodo. Donec efficitur turpis eu
          libero volutpat congue. Vivamus vulputate a ante vitae pulvinar.
          Suspendisse ut commodo mi, vitae convallis eros. Etiam quam sapien,
          fermentum at quam vitae, pulvinar efficitur urna. Donec vitae pharetra
          ipsum. Suspendisse hendrerit tincidunt ultrices. Sed malesuada
          vulputate arcu congue tincidunt. Vestibulum nunc est, rhoncus sit amet
          dolor in, bibendum lobortis diam. Proin cursus quam tempor vestibulum
          finibus. Aliquam sollicitudin ipsum quis mauris condimentum, id
          vestibulum orci fringilla. Nam sapien nulla, porta non metus vitae,
          malesuada volutpat arcu. Aliquam vel lacus velit. Nullam quis mi
          dignissim, iaculis lectus id, placerat nisl. Nullam pellentesque elit
          at erat ultrices, facilisis posuere tellus tincidunt. Cras tortor
          lectus, imperdiet at augue sed, dapibus aliquam turpis. Curabitur ac
          facilisis lorem. Nunc nec accumsan felis. Pellentesque sit amet libero
          sollicitudin leo ullamcorper bibendum. Fusce euismod magna risus, sed
          fringilla elit faucibus id. Aliquam malesuada sed magna quis
          tincidunt. Interdum et malesuada fames ac ante ipsum primis in
          faucibus. Aenean consequat varius enim. Aenean id lorem ex. Praesent
          sed augue blandit arcu dictum euismod eu a ipsum. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Praesent ornare justo quis justo dignissim tempus.
          Suspendisse nec tellus ante. Phasellus vel tellus vitae nisi commodo
          egestas non quis lorem. Quisque finibus enim non erat vulputate, sit
          amet consectetur purus mattis. Vestibulum vitae cursus ante, eget
          fermentum felis. Curabitur ut dolor pulvinar, maximus risus et,
          aliquet odio. Donec sed lacus sapien. Cras vitae vehicula nunc, quis
          semper lectus. Vestibulum efficitur mi id lectus rhoncus egestas.
          Vestibulum ut fringilla arcu. Quisque imperdiet maximus volutpat. Nam
          pellentesque lacus vel enim auctor, nec mollis lectus aliquam. Morbi
          condimentum tincidunt placerat. Maecenas tempor elementum elit quis
          pulvinar. Cras sed sapien a sapien sagittis rhoncus auctor non nisi.
          Proin aliquam nisi in risus bibendum, eu elementum enim bibendum.
          Phasellus imperdiet nibh felis, auctor dictum purus ultricies ac.
        </p>
      </div>
      {Boolean(openModal) && (
        <ModalContainer
          handleToggleModal={handleToggleModals}
          modalArrayData={multipleModal}
          modalFooter
        />
      )}
    </div>
  );
};

export default Settings;
