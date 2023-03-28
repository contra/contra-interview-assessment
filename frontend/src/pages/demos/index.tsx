import Link from 'next/link';
import { NextPage } from 'next/types';

const DemosIndex: NextPage = () => {
    return (
        <div className='vertical-flex center-flex fill-screen'>
            <Link href='/'>
                <a 
                    className='link font-large center-text' 
                    tabIndex={0}
                    aria-label='Go To Back Main Page'
                >
                    {'<< Back To Main Page'}
                </a>
            </Link>
            <Link href='/demos/modals'>
                <a 
                    className='link font-large center-text' 
                    tabIndex={1}
                    aria-label='Go To Modal Demo Page'
                >
                    {'Go To Modal Demo >>'}
                </a>
            </Link>
        </div>          
    )
}

export default DemosIndex;