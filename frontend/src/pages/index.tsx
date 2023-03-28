/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import Link from 'next/link';

const Index: NextPage = () => {
  return (
    <div className='root vertical-flex center-flex fill-screen'>
      <Link href='/demos'>
        <a 
          className='link font-large' 
          tabIndex={0}
          aria-label='Go To Demos Page'
        >
          {'Go To Demos >>'}
        </a>
      </Link>
    </div>
  )
};

export default Index;