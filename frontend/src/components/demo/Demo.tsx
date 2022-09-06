// An example of modal usage for information display with continue button to close

import ClickOutside from "./subcomponents/ClickOutside";
import Information from "./subcomponents/Information";
import StackingModal from "./subcomponents/StackingModal";
import WithForm from "./subcomponents/WithForm";


const Demo = () => {
    return <>
        <h1>Contra Frontend Assessment - Custom Modal Demo</h1>
        <Information />
        <WithForm />
        <ClickOutside />
        <StackingModal />
    </>
};

export default Demo;