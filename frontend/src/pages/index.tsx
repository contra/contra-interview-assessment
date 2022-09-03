/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { useState } from 'react';
import Modal from '../components/FirstModal';

const Index: NextPage = () => {
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const onClose = () => {
    setOpen(false);
    document.body.style.overflow = 'auto';
  };
  return (
    <div style={{ overflowY: open ? 'hidden' : 'auto' }}>
      <Modal open={open} onClose={onClose} />
      <div className="text-container">
        <div className="text">
          <h1>Welcome to Contra!</h1>
          <button onClick={onOpen}>Enter your details</button>
          <div className="information">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas
            pharetra convallis posuere morbi leo urna molestie. Odio euismod
            lacinia at quis. Nec nam aliquam sem et tortor consequat id.
            Bibendum ut tristique et egestas quis ipsum. Quis commodo odio
            aenean sed adipiscing diam donec. Venenatis a condimentum vitae
            sapien. Amet risus nullam eget felis eget. Risus in hendrerit
            gravida rutrum quisque non tellus. In est ante in nibh. Sagittis
            purus sit amet volutpat consequat. Pharetra diam sit amet nisl
            suscipit adipiscing bibendum. Massa tincidunt dui ut ornare lectus
            sit amet est placerat. Posuere urna nec tincidunt praesent semper
            feugiat nibh. Felis imperdiet proin fermentum leo vel orci porta.
            Consequat interdum varius sit amet. Ullamcorper dignissim cras
            tincidunt lobortis. Risus at ultrices mi tempus imperdiet nulla.
            Nisl pretium fusce id velit ut tortor pretium. Nunc sed blandit
            libero volutpat sed cras ornare arcu dui. Auctor augue mauris augue
            neque gravida in. Nibh tellus molestie nunc non blandit. Risus quis
            varius quam quisque id diam vel. Urna cursus eget nunc scelerisque
            viverra. Porttitor leo a diam sollicitudin tempor. Mattis
            ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget.
            Nullam non nisi est sit amet. Cras pulvinar mattis nunc sed blandit
            libero volutpat sed. Diam sollicitudin tempor id eu nisl. Magna
            fermentum iaculis eu non diam phasellus vestibulum lorem sed. Mauris
            cursus mattis molestie a iaculis. Nulla pharetra diam sit amet nisl
            suscipit. Mauris ultrices eros in cursus turpis massa. Nibh tellus
            molestie nunc non blandit massa enim nec dui. Leo integer malesuada
            nunc vel risus commodo viverra maecenas accumsan. Ligula ullamcorper
            malesuada proin libero. Fames ac turpis egestas sed tempus urna.
            Pharetra convallis posuere morbi leo urna molestie at elementum.
            Aliquam id diam maecenas ultricies mi eget mauris pharetra et.
            Turpis egestas integer eget aliquet nibh praesent tristique magna
            sit. Tellus mauris a diam maecenas sed enim ut. Faucibus interdum
            posuere lorem ipsum dolor. Leo in vitae turpis massa sed elementum
            tempus egestas sed. Posuere ac ut consequat semper viverra nam. Id
            aliquet lectus proin nibh nisl condimentum id. Facilisi etiam
            dignissim diam quis enim lobortis scelerisque. Turpis egestas
            integer eget aliquet nibh praesent tristique. Facilisis magna etiam
            tempor orci eu. Maecenas ultricies mi eget mauris pharetra et
            ultrices neque ornare. Potenti nullam ac tortor vitae purus. Semper
            viverra nam libero justo laoreet sit amet cursus. In hac habitasse
            platea dictumst vestibulum rhoncus est pellentesque elit. Tellus
            cras adipiscing enim eu turpis. Suspendisse faucibus interdum
            posuere lorem ipsum dolor. Odio morbi quis commodo odio aenean.
            Porta lorem mollis aliquam ut porttitor. Sed tempus urna et pharetra
            pharetra massa massa. Amet venenatis urna cursus eget nunc
            scelerisque. Eget velit aliquet sagittis id consectetur purus. Lacus
            laoreet non curabitur gravida arcu ac. Penatibus et magnis dis
            parturient. Viverra maecenas accumsan lacus vel facilisis volutpat
            est. Nulla pellentesque dignissim enim sit. Mauris pharetra et
            ultrices neque ornare aenean euismod elementum. Nisl vel pretium
            lectus quam id leo. Ut sem nulla pharetra diam sit amet nisl. Ac
            tortor dignissim convallis aenean et tortor at risus viverra. Donec
            ac odio tempor orci dapibus ultrices in iaculis nunc. Morbi tempus
            iaculis urna id. Arcu felis bibendum ut tristique. At elementum eu
            facilisis sed odio morbi. Justo donec enim diam vulputate ut
            pharetra sit amet. Scelerisque viverra mauris in aliquam sem. Duis
            at tellus at urna. Orci nulla pellentesque dignissim enim sit amet.
            Et netus et malesuada fames ac turpis. Sed felis eget velit aliquet
            sagittis. Risus ultricies tristique nulla aliquet enim tortor at
            auctor. Consectetur purus ut faucibus pulvinar. Risus at ultrices mi
            tempus imperdiet. Id neque aliquam vestibulum morbi blandit cursus
            risus. Ultricies mi quis hendrerit dolor magna eget. Urna neque
            viverra justo nec ultrices dui sapien. Amet risus nullam eget felis.
            Ut tortor pretium viverra suspendisse potenti nullam ac tortor
            vitae. Vitae purus faucibus ornare suspendisse. Sed turpis tincidunt
            id aliquet risus feugiat in ante metus. Amet tellus cras adipiscing
            enim eu turpis egestas. Eleifend donec pretium vulputate sapien nec
            sagittis. Urna nunc id cursus metus aliquam eleifend mi in nulla.
            Donec massa sapien faucibus et molestie ac feugiat sed. Non
            consectetur a erat nam at lectus urna duis. Eget nulla facilisi
            etiam dignissim diam quis enim. Eget duis at tellus at urna.
            Senectus et netus et malesuada fames ac turpis. Ut diam quam nulla
            porttitor massa id neque. Aliquet risus feugiat in ante metus dictum
            at. Cras ornare arcu dui vivamus arcu felis. Posuere morbi leo urna
            molestie at elementum. Orci a scelerisque purus semper eget duis at
            tellus. Quis imperdiet massa tincidunt nunc pulvinar. Ornare massa
            eget egestas purus viverra accumsan in nisl. Varius vel pharetra vel
            turpis nunc eget. Lorem ipsum dolor sit amet consectetur adipiscing
            elit duis tristique. Pellentesque id nibh tortor id aliquet lectus
            proin. In hac habitasse platea dictumst. Varius vel pharetra vel
            turpis nunc eget. Gravida neque convallis a cras semper auctor. Leo
            integer malesuada nunc vel risus commodo viverra maecenas accumsan.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
