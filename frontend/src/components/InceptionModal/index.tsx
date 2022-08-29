import { Heading } from '@/styleComponents/Heading';
import { Paragraph } from '@/styleComponents/Paragraph';
import { useModal } from '@/utils/useModal';
import Button from '../../styleComponents/Button';
import { ESystemColor } from '../../styles/ESystemColor';
import styles from './InceptionModal.module.css';

type TProps = {};

export const InceptionModal: React.FC<TProps> = () => {
  const { handleModal, modal } = useModal({
    content: (
      <div>
        <Paragraph color={ESystemColor.blue}>
          I'm baby master cleanse ennui deep v banjo normcore, polaroid
          humblebrag vegan glossier umami viral snackwave sriracha. Taxidermy
          scenester pinterest blue bottle tonx, chambray XOXO bodega boys
          raclette bespoke roof party banjo. Shaman ascot single-origin coffee
          palo santo, chartreuse bruh paleo VHS raclette mixtape vape four loko.
          Praxis raclette synth, drinking vinegar cliche retro sriracha
          live-edge taxidermy yes plz fit actually quinoa.
        </Paragraph>

        <Paragraph color={ESystemColor.blue}>
          Mixtape selvage sriracha pork belly franzen, sustainable deep v quinoa
          readymade. Bruh cloud bread poutine roof party small batch. Four loko
          cold-pressed disrupt asymmetrical XOXO, blog gentrify ascot mukbang
          authentic next level green juice tilde tousled. Butcher taxidermy DIY
          aesthetic, semiotics lo-fi sus salvia Brooklyn hoodie lumbersexual
          swag bicycle rights health goth. Normcore semiotics 3 wolf moon marfa
          mukbang lyft.
        </Paragraph>

        <Paragraph color={ESystemColor.blue}>
          DSA photo booth synth yes plz selvage. Tote bag pitchfork forage fanny
          pack humblebrag chambray. Tattooed fit next level, cold-pressed austin
          hexagon keytar tonx. Tote bag sartorial pitchfork, tattooed PBR&B
          kombucha keytar godard heirloom DIY shoreditch thundercats put a bird
          on it gentrify. Keytar fingerstache VHS subway tile slow-carb cred
          vegan pabst live-edge thundercats.
        </Paragraph>

        <Paragraph color={ESystemColor.blue}>
          Pinterest echo park chia, pour-over ethical dreamcatcher craft beer
          polaroid put a bird on it copper mug stumptown post-ironic
          chicharrones trust fund man braid. Beard literally sartorial irony,
          vaporware cliche mumblecore umami. Try-hard kale chips tacos, forage
          JOMO kickstarter seitan lumbersexual yuccie big mood polaroid. Master
          cleanse fingerstache messenger bag, vegan disrupt four dollar toast
          vibecession poutine edison bulb. Hell of direct trade praxis ugh
          street art schlitz organic, raclette migas tbh fingerstache cliche you
          probably haven't heard of them.
        </Paragraph>

        <Paragraph color={ESystemColor.blue}>
          Flannel drinking vinegar succulents yes plz roof party whatever
          gochujang artisan shabby chic street art knausgaard kale chips master
          cleanse lyft paleo. VHS JOMO la croix vice cloud bread keffiyeh
          kickstarter unicorn vape helvetica lumbersexual lyft photo booth
          praxis selfies. Shabby chic helvetica vinyl, cronut neutra yes plz
          organic kickstarter slow-carb hexagon chicharrones blue bottle ramps
          four loko. Organic unicorn readymade synth. Occupy iceland stumptown
          master cleanse shabby chic literally.
        </Paragraph>

        <Paragraph color={ESystemColor.blue}>
          Banh mi irony jean shorts, fixie deep v meh bodega boys occupy 8-bit
          leggings franzen distillery lumbersexual cornhole farm-to-table.
          Sriracha copper mug yes plz crucifix photo booth godard poke actually
          90's. Stumptown lumbersexual put a bird on it, kale chips four dollar
          toast roof party fam DSA sus 8-bit fixie hoodie pabst. Neutra tbh palo
          santo raclette hoodie roof party everyday carry succulents skateboard
          viral mixtape tumeric.
        </Paragraph>

        <Paragraph color={ESystemColor.blue}>
          Vexillologist mukbang health goth, hammock authentic pour-over cronut
          vegan actually glossier ethical DSA palo santo. Waistcoat thundercats
          yr, readymade 90's activated charcoal leggings before they sold out
          DSA crucifix chambray subway tile banh mi kombucha chillwave. Coloring
          book mixtape slow-carb, live-edge aesthetic meggings gatekeep marfa
          pork belly. Blog sustainable four loko, meh bushwick hell of put a
          bird on it venmo echo park mukbang distillery truffaut pour-over
          marfa. Portland beard try-hard, raw denim chartreuse flannel seitan
          messenger bag coloring book glossier gluten-free hell of. Hell of
          craft beer banh mi, man braid microdosing locavore vaporware JOMO
          green juice asymmetrical sriracha.
        </Paragraph>

        <Paragraph color={ESystemColor.blue}>
          Tumblr austin tacos, meditation beard mustache tbh semiotics prism
          enamel pin kale chips iceland ennui. Cornhole before they sold out
          bodega boys, selfies whatever JOMO craft beer four dollar toast ascot
          cred tattooed mustache adaptogen keffiyeh. Jean shorts affogato
          taiyaki listicle hashtag portland gochujang iceland vexillologist
          beard mumblecore drinking vinegar man braid. Before they sold out swag
          crucifix ennui subway tile, vinyl tbh cliche ugh butcher fixie roof
          party biodiesel tumeric. Lyft tousled cliche trust fund skateboard.
          YOLO asymmetrical swag pork belly kitsch bodega boys typewriter copper
          mug taxidermy neutra offal bicycle rights squid food truck. Ugh
          franzen hexagon, retro +1 hoodie activated charcoal crucifix big mood
          green juice fit photo booth.
        </Paragraph>

        <Paragraph color={ESystemColor.blue}>
          Chillwave seitan normcore, williamsburg synth scenester offal hoodie
          bruh. Waistcoat art party cliche distillery. Kinfolk kickstarter chia,
          farm-to-table man bun raclette vinyl blog. Artisan mlkshk portland
          bespoke 90's. Tattooed cloud bread 8-bit tacos Brooklyn you probably
          haven't heard of them tbh prism subway tile actually gluten-free
          vibecession.
        </Paragraph>

        <Paragraph color={ESystemColor.blue}>
          Butcher marfa truffaut lumbersexual sustainable. Vexillologist pickled
          YOLO etsy. Letterpress migas vice paleo literally leggings. Craft beer
          butcher biodiesel man braid pickled. Tattooed salvia migas ennui,
          tilde typewriter thundercats slow-carb kinfolk readymade chartreuse
          church-key. Umami mukbang hoodie, retro forage cold-pressed pok pok
          same vibecession raw denim.
        </Paragraph>

        <Paragraph color={ESystemColor.blue}>
          Flexitarian biodiesel wolf etsy ugh literally. Austin etsy chia put a
          bird on it tumeric butcher. Vape vegan fit mustache pok pok roof party
          woke direct trade pitchfork. Slow-carb snackwave pug adaptogen
          gentrify. Post-ironic knausgaard coloring book copper mug sus next
          level single-origin coffee gluten-free organic mumblecore live-edge.
          Keytar tousled live-edge +1. Blue bottle venmo migas adaptogen
          actually viral succulents bruh craft beer fit thundercats vape man bun
          mixtape.
        </Paragraph>
      </div>
    ),
    heading: 'This is a modal heading',
  });
  return (
    <div className={styles['InceptionModal']}>
      <Heading size="regular">Would you like to open a modal?</Heading>
      <Button onClick={() => handleModal()}>Open Modal</Button>

      {modal}
    </div>
  );
};
