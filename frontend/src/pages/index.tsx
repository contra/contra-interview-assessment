/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { useState } from 'react';
import Modal from '@/components/Modal';

const Index: NextPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [otherModalVisible, setOtherModalVisible] = useState(false);
  return (
    <>
      <h1>Welcome to Contra!</h1>
      <button onClick={() => setModalVisible(true)} type="button">
        Open Modal
      </button>
      <p style={{ width: `400px` }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
        semper neque id libero eleifend, ac hendrerit nunc consectetur. Nulla
        dolor eros, aliquet id ante vitae, pretium cursus quam. Phasellus
        fermentum felis nec luctus ultricies. Sed non turpis id massa hendrerit
        varius in vel tortor. Fusce aliquet odio lorem, sagittis pretium metus
        volutpat a. Nullam ac orci id nisi imperdiet egestas a id metus. Etiam
        pharetra metus ipsum, nec maximus purus commodo non. Mauris tempus risus
        condimentum ligula ultricies, a ullamcorper mi bibendum. Mauris congue
        lectus in nunc auctor, vitae euismod arcu feugiat. Nulla rutrum auctor
        lectus sit amet eleifend. In sodales augue ut libero auctor posuere.
        Mauris tincidunt sapien quis mi tristique, in vulputate risus egestas.
        Nullam tincidunt cursus lectus vitae aliquet. Praesent congue neque at
        augue pulvinar, gravida porta tortor sollicitudin. Donec tempus dictum
        nulla non tincidunt. Fusce eu massa tortor. Nulla facilisi. Aliquam ut
        interdum tortor. Integer commodo rutrum tempor. Cras hendrerit laoreet
        mauris, at sollicitudin augue finibus eget. Sed sodales magna id enim
        dignissim, vitae tempor ligula condimentum. Nulla iaculis efficitur orci
        quis scelerisque. Sed in quam quis felis porta porta. Nulla cursus
        viverra massa sed semper. Pellentesque habitant morbi tristique senectus
        et netus et malesuada fames ac turpis egestas. Praesent feugiat sapien
        ex, faucibus tincidunt diam venenatis id. Nunc auctor augue a justo
        volutpat sollicitudin. Nullam imperdiet, dui eu lacinia euismod, mauris
        risus rutrum magna, id faucibus mauris diam et justo. Duis at eros ut
        lacus placerat convallis nec non lorem. Phasellus tincidunt magna sed
        nulla fringilla, sed sagittis felis facilisis. Duis vestibulum est eu
        nunc facilisis sollicitudin. Morbi eleifend ullamcorper massa, sit amet
        aliquet lorem. Donec aliquam a turpis sed dictum. Proin urna nibh,
        pretium sed quam vel, posuere cursus orci. Suspendisse facilisis nibh
        mi, eu sollicitudin metus blandit et. Sed fringilla erat vel sagittis
        efficitur. Maecenas sed ex a urna dapibus laoreet at a leo. Ut sit amet
        arcu ut tortor imperdiet imperdiet quis in tellus. Etiam eleifend
        lacinia nulla. Suspendisse faucibus dapibus eleifend. Phasellus dictum
        diam a aliquet congue. Ut posuere tristique lacinia. Ut ornare, neque
        sit amet auctor porta, erat dui finibus erat, nec ultricies diam odio ut
        metus. Etiam id velit tincidunt, placerat ex nec, mollis ex. Mauris eu
        convallis tellus. Suspendisse ut quam a mi scelerisque dignissim non non
        dolor. Proin non tellus id dui ullamcorper mollis. Sed sed ligula id
        libero porta convallis. In dignissim quam pretium risus ornare rutrum.
        Nullam eget egestas leo. Nullam ac sem tincidunt, tempus felis a,
        facilisis magna. Nam finibus risus ut libero mollis molestie. Cras sed
        lorem non lacus ultricies commodo at ut ante. Ut nisi risus, mollis non
        metus a, semper suscipit nisl. Pellentesque sed dui vel ligula bibendum
        suscipit vel ac sem. Nullam malesuada lacus magna, feugiat semper nisl
        pretium et. Nullam lobortis ligula ac neque tempor fermentum. Etiam
        auctor tristique elit eu malesuada. Etiam venenatis fermentum augue, ac
        aliquet felis blandit ut. Maecenas pharetra tortor tempor, aliquam augue
        at, eleifend felis. Aliquam eu sodales mi. Vestibulum nec sagittis
        tortor, id pharetra urna. Fusce ac convallis tellus. Maecenas et
        convallis nunc, quis varius nisi. Nunc sed dolor eget mauris cursus
        vehicula eget eu sem. Morbi eu lacus vitae nisl elementum rhoncus ac et
        leo. Duis mattis nunc quis congue aliquam. Proin ac posuere felis. Nunc
        at ante sagittis, mattis dui sit amet, congue lectus. Mauris tellus
        enim, finibus non tellus non, bibendum vehicula elit. Mauris mauris
        augue, lacinia a neque sed, venenatis consequat ipsum. Fusce vitae est
        vel erat semper blandit semper eget leo. Sed luctus ex ipsum, id semper
        nulla ornare ac. Aenean eros nisl, faucibus eu mollis id, rhoncus sit
        amet massa. Maecenas lectus orci, elementum ut risus eget, aliquet
        laoreet urna. Integer quis pretium orci, et lacinia velit. Class aptent
        taciti sociosqu ad litora torquent per conubia nostra, per inceptos
        himenaeos. Nulla porta, tortor sed iaculis volutpat, justo erat
        imperdiet enim, eu lobortis neque quam ac magna. Morbi aliquam mattis
        nulla ac hendrerit. Donec fringilla libero nec elit dictum, eu facilisis
        turpis pretium. Vivamus eget lacus risus. Suspendisse pharetra quis
        turpis non lacinia. Donec vitae leo tincidunt mauris mattis commodo.
        Morbi accumsan justo lacus, ut convallis tellus viverra eget. Maecenas
        nec enim tellus. Curabitur vehicula velit nec tellus tincidunt aliquam.
        Cras at dolor mi. Ut eu porttitor sapien. Sed egestas faucibus arcu eu
        aliquet. Vestibulum ac dignissim purus, eu feugiat purus. Proin vel
        nulla ut tellus porttitor commodo. Pellentesque mollis dui ut blandit
        consectetur. Ut est dolor, ornare fringilla tellus et, pellentesque
        pretium lectus. Nunc ex arcu, varius tincidunt arcu nec, dapibus
        convallis eros. Suspendisse nec mattis lacus. Fusce suscipit quam id
        mauris efficitur, a mattis nulla hendrerit. Aliquam malesuada laoreet
        lacus, non semper augue malesuada in. Class aptent taciti sociosqu ad
        litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse
        nec leo tortor. Vestibulum ante ipsum primis in faucibus orci luctus et
        ultrices posuere cubilia curae; Quisque vitae augue efficitur, cursus
        tortor eget, pellentesque justo. Aenean dapibus eu metus et posuere.
        Cras consequat tristique dignissim. Etiam non scelerisque mi. Sed
        venenatis euismod dolor quis placerat. Morbi gravida tristique
        imperdiet. Donec blandit metus in aliquet tincidunt. Donec tincidunt,
        lectus at cursus accumsan, neque orci hendrerit ipsum, eget tristique
        nunc lacus id nisl. Mauris sit amet tincidunt lectus. Sed id pharetra
        diam. Maecenas tristique consequat varius. Sed euismod augue et
        dignissim consectetur. Mauris scelerisque molestie magna eu efficitur.
        Integer luctus odio magna, id sodales nulla tincidunt in. Fusce
        ultrices, ligula eget ultrices tincidunt, mauris risus tristique velit,
        eu tempus ipsum nulla eu nibh. Suspendisse sodales purus eu tincidunt
        gravida. Vivamus venenatis pulvinar velit vel vestibulum. Praesent id
        eros hendrerit, dapibus massa at, gravida ante. Vivamus eu egestas
        tellus. Etiam posuere urna id vehicula auctor. Maecenas et orci feugiat,
        tincidunt tellus vel, ultricies sapien. Aliquam volutpat et neque et
        luctus. Donec aliquet orci libero, ut tincidunt sapien semper semper.
        Quisque non commodo turpis. Morbi vel scelerisque arcu. Cras in congue
        ex. Morbi pharetra massa vel elementum egestas. Etiam libero libero,
        dapibus ut velit id, cursus viverra nibh. Curabitur viverra volutpat
        odio sit amet dignissim. Maecenas tristique neque hendrerit tortor
        semper pulvinar. Nam luctus nisi massa, a bibendum orci sodales vitae.
        Maecenas ac orci eu quam gravida interdum non sed nisi. In placerat
        turpis mauris, tincidunt aliquam nisi facilisis vel. Etiam vel imperdiet
        ligula, eu iaculis felis. Mauris nulla nunc, sollicitudin sit amet sem
        at, posuere convallis neque. Ut pulvinar consequat tincidunt. Mauris at
        iaculis augue. Praesent rutrum ligula nisl, porttitor tincidunt enim
        fringilla vitae. Quisque eget placerat tellus, sodales viverra tortor.
        Aenean tristique quis felis a varius. Fusce ac nisl nisi. Donec
        efficitur fringilla mauris, ac condimentum quam fermentum a. Donec ante
        libero, imperdiet quis hendrerit in, auctor vel mauris. In rhoncus ante
        nec condimentum auctor. Orci varius natoque penatibus et magnis dis
        parturient montes, nascetur ridiculus mus. Vivamus maximus nec libero eu
        malesuada. Etiam consequat placerat auctor. Duis vulputate elit in
        lacinia posuere. Suspendisse potenti. Aliquam lobortis vulputate
        ultrices. Praesent quis risus tortor. Maecenas nec porta nibh. Nulla
        commodo turpis quis sem varius mollis. Pellentesque et eleifend est.
        Aenean consequat, eros quis tempus vestibulum, tortor nunc sagittis dui,
        vel ultricies mi massa sit amet mauris. Cras vitae velit nisi.
        Pellentesque sagittis dolor ac justo mollis, ac iaculis nibh semper.
        Suspendisse lobortis vitae lacus ac sollicitudin. Sed id massa dolor. Ut
        id libero luctus, ullamcorper sem eget, pharetra nibh. Suspendisse
        potenti. Quisque tristique fermentum lectus. Cras vitae aliquam massa,
        sed lacinia lorem. Morbi ut metus urna. Donec sed orci interdum,
        malesuada nulla eu, consectetur purus. Nullam et ullamcorper ex.
        Maecenas ipsum eros, fringilla ac aliquam nec, venenatis sit amet dolor.
        Etiam tempor eros sapien, nec ultrices nulla maximus sit amet. Integer
        massa risus, consequat sit amet lorem sed, pharetra eleifend est. Sed
        mattis consectetur justo eu efficitur. Praesent scelerisque lacinia
        tellus quis molestie. Donec dapibus efficitur feugiat. Morbi elementum
        rutrum mauris, nec vestibulum libero consectetur vel. Nulla facilisi.
        Proin massa elit, semper nec pharetra quis, molestie eu odio. Ut eu
        pharetra nisl, aliquet iaculis nibh. Nunc vel sagittis felis. Nam
        vulputate magna sagittis, tincidunt lectus a, efficitur erat. Maecenas
        lectus orci, viverra lacinia turpis nec, facilisis egestas metus. Ut
        congue blandit neque non convallis. Etiam pulvinar quis lacus vel
        molestie. Nullam id dapibus magna, id sagittis nibh. Nullam et pretium
        neque. Interdum et malesuada fames ac ante ipsum primis in faucibus.
        Integer dolor metus, auctor in felis non, pellentesque lobortis enim.
        Duis accumsan risus et est tristique, eget pharetra ante tincidunt.
        Morbi id lectus quis ex blandit pulvinar ut ac mi. Etiam pretium iaculis
        tellus quis finibus. Cras varius dapibus erat id dictum. In mattis nisi
        mauris, vitae eleifend risus pulvinar a. Phasellus ut blandit elit, nec
        accumsan ipsum. Proin non porta ante. Aliquam vel gravida nisl. Nam
        ultricies mi pretium lorem molestie pretium in vel risus. Cras ac metus
        lobortis, placerat sem vitae, vulputate quam. Nulla vel mattis neque.
        Pellentesque quis tellus nec tellus sagittis lobortis ut eget nisl.
        Nullam at felis lacinia, molestie sapien tincidunt, pellentesque lorem.
        Cras congue in mi ut sagittis. Vivamus et volutpat sem, ut convallis
        ante. Aliquam placerat mollis urna, vel congue ante mollis at. Proin
        venenatis vitae velit sit amet sodales. Cras vehicula odio rhoncus
        tellus fringilla aliquam. Cras non cursus arcu. Aenean diam libero,
        pellentesque mattis velit vitae, blandit tristique dolor. Aliquam
        vehicula euismod tempor. Aliquam erat volutpat. Quisque non pretium
        urna.
      </p>
      <Modal
        onCancel={() => setModalVisible(false)}
        onOk={() => setOtherModalVisible(true)}
        title="Basic Modal"
        visible={modalVisible}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Modal
        escapable={false}
        maskClosable={false}
        onCancel={() => setOtherModalVisible(false)}
        title="Another Basic Modal"
        visible={otherModalVisible}
      >
        <p>MHMMM</p>
      </Modal>
    </>
  );
};

export default Index;
