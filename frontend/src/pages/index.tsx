/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { useState } from 'react';
import Button from '@/components/Button';
import Modal from '@/components/Modal';

const Index: NextPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  return (
    <div className="container mx-auto font-sans bg-white sm:rounded sm:mt-2 p-4">
      <h1 className="text-center">Custom Modal Demo</h1>
      <div className="mb-4">
        <p className="mb-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lobortis, nulla at sollicitudin pharetra, enim quam lacinia eros, nec vehicula metus felis non lacus. Maecenas bibendum facilisis lorem at consequat. Nam tempus eleifend interdum. Nulla tincidunt orci nec velit tempor mollis. Mauris nec nisi ligula. Ut quis accumsan tortor, sit amet pulvinar dui. Sed condimentum in lorem sed lobortis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus dapibus vel lorem sit amet eleifend. Donec non congue magna. Donec egestas aliquam varius. Quisque ac eleifend nisi. Nulla dolor ipsum, pretium eget sapien non, venenatis fringilla massa. Sed sed elit ante. Sed vel lectus nec arcu porttitor accumsan in at eros.</p>
        <p className="mb-10">Suspendisse potenti. In ut gravida purus. Fusce bibendum vitae mi id elementum. Nulla ultricies eu lectus sed semper. Maecenas nec vestibulum ligula, vitae varius augue. Morbi sit amet hendrerit ex. In ac neque in nulla sollicitudin rutrum non id dui. Fusce bibendum ligula in dolor accumsan volutpat. Sed vestibulum nisi rutrum, accumsan felis accumsan, sagittis dolor. Nullam feugiat, diam nec consequat commodo, dolor urna egestas purus, vel lobortis ante elit a purus. Nulla euismod at odio ut gravida. Suspendisse fringilla eget est at rhoncus. Nam sodales porta varius. Vivamus id massa vel nisi finibus pulvinar et a urna. Aliquam sagittis in justo sit amet dignissim.</p>
        <p className="mb-10">Cras dictum sit amet mi vitae cursus. Nam sodales, tellus at gravida malesuada, sapien est tincidunt massa, nec tempus nibh tortor et urna. Sed vitae leo sapien. Aenean commodo, mauris vel lobortis pharetra, magna ex dignissim lorem, sed feugiat felis tortor sit amet sapien. Mauris dignissim tempor tristique. Donec sit amet enim tellus. In tincidunt ante pulvinar, dictum metus ac, cursus sapien. Quisque et faucibus odio. Sed hendrerit magna at euismod luctus. Aenean lacinia euismod est dapibus viverra. Praesent commodo nisl id sapien semper sollicitudin. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam vulputate diam at vulputate pulvinar. Praesent tincidunt orci ut nulla mattis tincidunt. Phasellus mattis, massa id blandit pulvinar, tortor ante tincidunt sapien, in accumsan ipsum felis sit amet felis. In dictum nulla sed elit imperdiet feugiat quis sed est.</p>
      </div>
      {showModal || <Button onClick={() => setShowModal(true)}>Show Modal</Button>}
      <Modal handleClose={() => setShowModal(false)} show={showModal} title="Modal 1">
        <Button onClick={() => setShowModal2(true)} type="secondary">Login</Button>
        <Modal handleClose={() => setShowModal2(false)} show={showModal2} title="Modal 2">
          Nested Modal
        </Modal>
      </Modal>
    </div>
  );
};

export default Index;
