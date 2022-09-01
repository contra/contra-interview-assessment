import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import Image from 'next/image';

const handleParty = async () => {
  await confetti({
    origin: {
      x: Math.random(),
      y: Math.random() - 0.2,
    },
    particleCount: 100,
    spread: 360,
    startVelocity: 30,
  });
};

const Profile = () => {
  return (
    <>
      <motion.div
        className="m-auto w-1/6 rounded-full bg-neutral-600"
        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
      >
        <Image
          alt="A Memoji of Ryel"
          // eslint-disable-next-line react/forbid-component-props
          className="rounded-full"
          height={100}
          layout="responsive"
          src="/Memoji.png"
          width={100}
        />
      </motion.div>

      <div className="m-4">
        <h1 className="mb-1 bg-gradient-to-r from-sky-500 via-indigo-500 to-pink-500 bg-clip-text text-center text-4xl font-extrabold text-transparent">
          Ryel Banfield
        </h1>
        <h2 className="text-center font-semibold">Full Stack Developer ⚛️</h2>
      </div>

      <div className="mb-2 flex justify-center">
        <div className="mr-1 w-36 rounded-full bg-white p-3 text-center text-xs">
          <p>FullStack Engineer</p>
        </div>
        <div className="ml-1 w-36 rounded-full bg-white p-3 text-center text-xs">
          <p>Frontend Engineer</p>
        </div>
      </div>
      <div className="mb-6 flex justify-center">
        <p className="w-36 rounded-full bg-white p-3 text-center text-xs">
          Web Developer
        </p>
      </div>

      <div className="mb-6 flex justify-center">
        <motion.button
          className="w-1/2 max-w-sm rounded-full bg-gradient-to-r from-yellow-500 to-orange-400 p-3 text-center font-semibold"
          onClick={handleParty}
          type="button"
          whileHover={{ scale: 1.025, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
        >
          <p>Let's Party</p>
        </motion.button>
      </div>

      <div className="mb-8 flex flex-col items-center justify-center px-6 text-center">
        <h3 className="mb-1 font-semibold">Who Am I?</h3>
        <p>I want to be good at what I do.</p>
        <p>I want to write code that makes an impact.</p>
        <p>I don't want to just build small freelance projects.</p>
        <p>I want to work with a great team that I can learn from.</p>
        <p>I want to contribute to something making a difference.</p>
      </div>
    </>
  );
};

export default Profile;
