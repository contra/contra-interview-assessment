/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';

import { Input } from "@/common/Input";
import BodyText from "@/common/BodyText";
import { Button } from "@/common/Button";
import { Checkbox } from "@/common/Checkbox";

const Index: NextPage = () => {
  return (
    <div className="p-5">
      <div className="flex space-x-4">
      <Button        
        label="Open Modal 1"
      />
      <Button        
        variant="secondary"
        label="Second Button to show an example of finalFocusRef"
      />
      <Button
        variant="text"
        label="This is a text button."
      />
      <Input placeholder="This is a text input field" />
      <Checkbox label="Checkbox" id="checkbox-1" name="checkbox-1"/>
      </div>
      <BodyText />     
    </div>
  );

};

export default Index;
