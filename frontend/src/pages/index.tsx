/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { useState } from 'react';
import Modal from '@/components/Modal';

const Index: NextPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showNestedModal, setShowNestedModal] = useState(false);

  const handleClick = () => setShowModal(!showModal);

  const handleClickNested = () => setShowNestedModal(!showNestedModal);

  return (
    <div className="centered">
      <h1>Welcome to Contra!</h1>

      <h2>Modal testing</h2>
      <button onClick={handleClick} type="button">
        Show modal
      </button>
      <p className="wrapped-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas alias ea
        ipsa consectetur distinctio natus harum dicta quisquam hic, maxime culpa
        tempora sequi nostrum quis at? Possimus hic, officiis nobis ducimus
        enim, consequuntur minus ab molestiae unde molestias consequatur itaque
        obcaecati animi necessitatibus. Qui sapiente ea laborum, eligendi fugiat
        vitae obcaecati dolores consequatur mollitia ipsum natus placeat hic
        minima est consequuntur illo quae quo maiores repellat reiciendis,
        voluptatibus laboriosam, eaque aut voluptas commodi praesentium ipsam
        corrupti, consequatur dolores repudiandae alias quis delectus
        aspernatur! Et dolor debitis reiciendis mollitia at cupiditate id fugiat
        eius harum dolores adipisci earum aut delectus asperiores placeat, quasi
        corporis est animi, unde aliquam repellat quidem maiores accusamus?
        Eius, provident mollitia earum quibusdam rem reprehenderit maiores
        consequatur eveniet iusto, dignissimos ipsum! In enim odit fuga maiores
        asperiores, nam modi? Eveniet quaerat commodi molestiae, eos inventore
        excepturi accusantium vitae enim velit fugit est nemo autem explicabo
        minima sapiente omnis voluptatem fuga laboriosam repudiandae illum
        sequi? Expedita nostrum ab consequatur consequuntur velit nesciunt enim
        ipsa eveniet recusandae hic quisquam, autem tempore nihil doloribus
        ullam, beatae reiciendis incidunt explicabo voluptas. Incidunt pariatur
        consequuntur possimus mollitia rem, harum unde non fugiat. Ducimus
        facere doloribus expedita rerum incidunt iusto eveniet quae sit
        provident consectetur, soluta eos nobis distinctio doloremque culpa
        harum sint, consequuntur odio debitis voluptate architecto. Illo dolores
        culpa ipsam laboriosam suscipit quisquam porro. Eius eum nobis
        architecto alias aliquam enim nihil, neque ducimus corporis, iure
        consectetur, quae cum possimus voluptatum aperiam provident. Assumenda
        alias vero quae hic iste ipsum tempora atque possimus, libero recusandae
        molestiae ratione, asperiores eveniet magni corrupti facilis repellendus
        quam quo dolore laborum veniam harum aperiam! Autem temporibus ratione
        modi nesciunt vel neque sunt id debitis dolore officia. Magni doloremque
        et aspernatur iure, pariatur cupiditate totam ex? Recusandae deserunt ad
        animi fugiat unde iure quis doloremque ipsum distinctio ut cum sapiente
        earum, dolorum provident consectetur quos temporibus asperiores
        corrupti. Hic tempora ex nostrum, eius quidem sit dolorem maiores
        molestiae recusandae eveniet iure rerum praesentium saepe voluptatem
        necessitatibus quasi? Necessitatibus saepe adipisci eligendi nobis,
        inventore nemo, nisi tempora quasi numquam fugit aperiam doloremque at,
        reiciendis blanditiis laborum iure qui quidem officiis temporibus et
        fuga molestiae! Incidunt dolorum nulla dicta atque minima non dolore,
        qui delectus ea libero mollitia, veniam voluptatem soluta assumenda
        accusantium, praesentium sed nisi illum? Cum dolorum optio molestias
        asperiores cupiditate nemo facilis, impedit modi labore, quidem velit
        dolores quos totam sed incidunt expedita explicabo esse! Molestias
      </p>
      <button onClick={handleClick} type="button">
        Show modal
      </button>
      <p className="wrapped-text">
        aspernatur, iure repudiandae. Iste quo odio adipisci perspiciatis,
        corrupti beatae quaerat eveniet inventore exercitationem, omnis cumque?
        Alias nam cupiditate quae esse quo id at delectus et atque vel in
        tenetur corporis quasi mollitia consectetur libero repudiandae,
        pariatur, sapiente ex iusto est ipsa. Maiores, quam ex aut possimus
        perspiciatis alias! Totam architecto, minus non necessitatibus autem id
        quod consectetur vitae cumque delectus in excepturi mollitia nihil. Rem,
        cum cumque repudiandae ipsam laborum minima deleniti enim. Cupiditate
        fugit, nulla sequi expedita animi quidem quos eius suscipit odit modi
        voluptatibus beatae sapiente corrupti quibusdam laboriosam libero
        aspernatur tenetur repellat! Illum, dolorem iusto! Voluptatem, facere
        temporibus blanditiis ipsa, laboriosam perspiciatis sed dignissimos
        mollitia eos, nesciunt fugiat quod reiciendis accusamus! Perspiciatis
        itaque autem, similique harum error libero illum nulla deleniti, quia
        nobis dolore culpa ipsum hic dignissimos repudiandae eum consequatur
        quaerat ratione! Sunt blanditiis at a ducimus alias accusamus. Placeat
        distinctio corrupti beatae deleniti dolores dolorum, debitis esse
        aliquid doloremque earum fugit totam temporibus adipisci itaque nostrum
        dolorem quas unde eveniet autem. Velit repellendus cupiditate ut soluta
        temporibus voluptas mollitia odio sunt et architecto reprehenderit
        reiciendis, adipisci quidem unde enim iusto cum praesentium fugiat
        corporis a? Et consequatur inventore nihil porro modi explicabo dolorem
        sed voluptates non assumenda, nemo quas, eos nisi, aut delectus
        suscipit? Impedit laborum quas voluptatem obcaecati fuga assumenda
        voluptas aspernatur, dolor modi sint vitae blanditiis sit at porro ut
        ab, adipisci sed beatae accusamus velit perferendis corrupti repellat.
        Esse nesciunt magnam blanditiis amet, nostrum iste, quisquam cumque
        neque dolorem aliquid suscipit. Expedita, deserunt. Voluptas blanditiis
        adipisci natus ex repellendus ipsum quo reiciendis numquam voluptatum?
        Molestiae tempore ab sunt facilis unde, non voluptate ad excepturi
        adipisci cumque dolorem?
      </p>
      {showModal && (
        <Modal close={handleClick} title="Test Modal">
          <button onClick={handleClickNested} type="button">
            Show nested modal
          </button>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis
            consectetur molestias reprehenderit tenetur, iure consequuntur fuga
            nulla maiores? Unde culpa ipsa cum expedita obcaecati inventore
            laudantium nostrum cumque non sint? Aperiam atque veniam dicta
            voluptatem! Voluptatem, facilis aspernatur itaque assumenda quidem
            error maxime temporibus! Dolor, repellat ratione iste vitae, sit
            accusantium expedita ipsa ipsum laudantium saepe perferendis quis
            maiores ex.
          </p>
          {showNestedModal && (
            <Modal close={handleClickNested} title="Nested Modal">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Veritatis consectetur molestias reprehenderit tenetur, iure
                consequuntur fuga nulla maiores? Unde culpa ipsa cum expedita
                obcaecati inventore laudantium nostrum cumque non sint? Aperiam
                atque veniam dicta voluptatem! Voluptatem, facilis aspernatur
                itaque assumenda quidem error maxime temporibus! Dolor, repellat
                ratione iste vitae, sit accusantium expedita ipsa ipsum
                laudantium saepe perferendis quis maiores ex.
              </p>
            </Modal>
          )}
          <input placeholder="Testing tab indexes" type="text" />
        </Modal>
      )}
    </div>
  );
};

export default Index;
