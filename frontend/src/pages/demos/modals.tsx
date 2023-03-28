import Modal from '@/component/modal/Modal';
import Link from 'next/link';
import { NextPage } from 'next/types';
import { createContext, useContext, useEffect, useState } from 'react';

const Lorem = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`

const useModalHandlers = () => {
    const [open, setOpen] = useState(false)
    const [depth, setDepth] = useState(2) // from 2 to 10

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleDepthIncrement = () => {
        if(depth < 10) setDepth( depth + 1 )
    }

    const handleDepthDecrement = () => {
        if(depth > 2) setDepth( depth - 1 )
    }

    return {
        open,
        depth,
        setOpen,
        handleOpen,
        handleClose,
        handleDepthIncrement,
        handleDepthDecrement
    }
}

const SingleModal = () => {
    const { open, handleOpen, handleClose } = useModalHandlers()

    return (
        <div>
            <button 
                className='button'
                onClick={handleOpen}
            >
                Open Single Modal
            </button>
            <Modal
                isOpen={open}
                title='Single Modal'
                onClose={() => handleClose()}
            >
                {Lorem}
            </Modal>
        </div>
    )
}

const SingleModalWithFullscreen = () => {
    const { open, handleOpen, handleClose } = useModalHandlers()

    return (
        <div>
            <button 
                className='button'
                onClick={handleOpen}
            >
                Open Single Modal with Fullscreen
            </button>
            <Modal
                isOpen={open}
                title='Single Modal with Fullscreen'
                fullscreen={true}
                onClose={() => handleClose()}
            >
                {Lorem}
            </Modal>
        </div>
    )
}

const SingleModalWithScrollableContent = () => {
    const { open, handleOpen, handleClose } = useModalHandlers()

    return (
        <div>
            <button 
                className='button'
                onClick={handleOpen}
            >
                Open Single Modal with Scrollable Content
            </button>
            <Modal
                isOpen={open}
                title='Single Modal with Scrollable Content'
                onClose={() => handleClose()}
            >
                {Array(10).fill(Lorem).join('')}
            </Modal>
        </div>
    )
}

const SingleModalWithScrollableContentAndOutsideClickDismissalDisabled = () => {
    const { open, handleOpen, handleClose } = useModalHandlers()

    return (
        <div>
            <button 
                className='button'
                onClick={handleOpen}
            >
                Open Single Modal with Scrollable Content & Outside Click Dismissal Disabled
            </button>
            <Modal
                isOpen={open}
                title='Single Modal with Scrollable Content & Outside Click Dismissal Disabled'
                dismissOnOutsideClick={false}
                onClose={() => handleClose()}
            >
                {Array(10).fill(Lorem).join('')}
            </Modal>
        </div>
    )
}

const TwoLevelMultiModal = () => {
    const { open, handleOpen, handleClose } = useModalHandlers()

    return (
        <div>
            <button 
                className='button'
                onClick={handleOpen}
            >
                Open Two Level Multi Modal
            </button>
            <Modal
                isOpen={open}
                title='Two Level Multi Modal'
                onClose={() => handleClose()}
            >
                <div className='vertical-flex'>
                    <span>{Lorem}</span>
                    <SingleModal />
                </div>
            </Modal>
        </div>
    )
}

const TwoLevelMultiModalWithVaryingScreens = () => {
    const { open, handleOpen, handleClose } = useModalHandlers()

    return (
        <div>
            <button 
                className='button'
                onClick={handleOpen}
            >
                Open Two Level Multi Modal with Varying Screens
            </button>
            <Modal
                isOpen={open}
                title='Two Level Multi Modal with Varying Screens'
                fullscreen={true}
                onClose={() => handleClose()}
            >
                <div className='vertical-flex'>
                    <span>{Array(10).fill(Lorem).join('')}</span>
                    <SingleModalWithScrollableContent />
                </div>
            </Modal>
        </div>
    )
}

type MultiLevelModalContextType = {
    content: string[]
}

const MultiLevelModalContext = createContext<MultiLevelModalContextType>({ content: [] })

type DynamicModalProps = {
    depth: number
}


const DynamicModal = ({ depth }: DynamicModalProps) => {
    const { content } = useContext(MultiLevelModalContext)
    const { open, handleOpen, handleClose } = useModalHandlers()

    const [index, setIndex] = useState(0)

    useEffect(() => {
        setIndex(content.length - depth)
    }, [depth, content])

    return (
        <>
            <button 
                className='button fit-content'
                onClick={handleOpen}
            >
                Open Multi Level Modal of Depth <span>{depth}</span>
            </button>
            <Modal
                isOpen={open}
                title={`Multi Level Modal of Depth ${depth}`}
                fullscreen={index === 0}
                onClose={() => handleClose()}
            >
                <div className='vertical-flex'>
                    <p>{content[index]}</p>
                    { depth - 1 !== 0 && <DynamicModal depth={depth - 1}/> }
                </div>
            </Modal>
        </>
    )
}

const DynamicMultiLevelModal = () => {
    const {  depth, handleDepthIncrement, handleDepthDecrement } = useModalHandlers()
    const [ content, setContent ] = useState<string[]>([])

    useEffect(() => {
        setContent(
            Array(depth)
                .fill('')
                .reduce(
                    (accum, _, index) => {
                        accum.push(
                            Array(depth - index).fill(Lorem).join('')
                        )
                        return accum
                    },
                    []
                )
        )
    }, [depth])

    return (
        <div className='vertical-flex center-flex segment'>
            <span className='font-normal center-text'>Multi Level Modal</span>
            <div className='horizontal-flex'>
                <button 
                    className='button'
                    disabled={depth === 10}
                    onClick={handleDepthIncrement}
                >
                    Increase Depth
                </button>
                <button 
                    className='button'
                    disabled={depth === 2}
                    onClick={handleDepthDecrement}
                >
                    Decrease Depth
                </button>
            </div>
            <MultiLevelModalContext.Provider value={{ content }}>
                <DynamicModal depth={depth}/>
            </MultiLevelModalContext.Provider>
        </div>
    )
}

const Modals: NextPage = () => {
    return (
        <div className='vertical-flex'>
            <div className='horizontal-flex'>
                <Link href='/demos'>
                    <a 
                        className='link font-large' 
                        tabIndex={1}
                        aria-label='Go Back To Demos Page'
                    >
                        {'<<'}
                    </a>
                </Link>
            <span className='font-large'>Modal Demos</span>
            </div>
            <hr />
            <div className='horizontal-flex wrap-flex'>
                <SingleModal />
                <SingleModalWithFullscreen />
                <SingleModalWithScrollableContent />
                <SingleModalWithScrollableContentAndOutsideClickDismissalDisabled />
                <TwoLevelMultiModal />
                <TwoLevelMultiModalWithVaryingScreens />
                <span className='fill-width'>
                    <DynamicMultiLevelModal />
                </span>
            </div>
        </div>
    )
}

export default Modals;