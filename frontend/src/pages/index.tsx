/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { useState } from 'react';
import { Modal } from '@/components/Modal';

const Index: NextPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
    <Modal onClose={() => setOpen(false)} open={open}>
      <LongForm />
    </Modal>
    <button onClick={() => setOpen(true)} type="button">open</button>
    </>
  );
};

export default Index;

const LongForm = () => {
  return (
    <form action="/">
      <legend>A Sample Form Legend</legend>

      <label htmlFor="name">Name: </label>
      <input name="Name" type="text" value="Name" />

      <label htmlFor="email">Email: </label>
      <input name="Email" type="email" value="Email" />

      <label htmlFor="button">Button: </label>
      <input name="button" type="button" value="Button" />

      <label>
        Single Checkbox:
        <input name="button" type="checkbox" value="checkbox1" />
      </label>

      {/* <fieldset>
        <legend>Group of Checkboxes: </legend>
        <label>
          Checkbox 1:
          <input name="checkgroup[]" type="checkbox" value="checkbox1" />
        </label>
        <label>
          Checkbox 2:
          <input name="checkgroup[]" type="checkbox" value="checkbox2" />
        </label>
        <label>
          Checkbox 3:
          <input name="checkgroup[]" type="checkbox" value="checkbox3" />
        </label>
        <label>
          Checkbox 4:
          <input name="checkgroup[]" type="checkbox" value="checkbox4" />
        </label>
      </fieldset>

      <label htmlFor="color">Color: </label>
      <input name="color" type="color" value="color" />

      <label htmlFor="date">Date: </label>
      <input name="date" type="date" value="date" />

      <label htmlFor="datetime">Date, Time (Local): </label>
      <input name="datetime" type="datetime-local" value="datetime" />

      <label htmlFor="file">File: </label>
      <input name="file" type="file" value="file" />

      <input name="hidden" type="hidden" value="hidden" />

      <label htmlFor="image">Image: </label>
      <input name="image" type="image" value="image" />

      <label htmlFor="month">Month: </label>
      <input name="month" type="month" value="month" />

      <label htmlFor="number">Number: </label>
      <input name="number" type="number" value="number" />

      <label htmlFor="password">Password: </label>
      <input name="password" type="password" value="password" />

      <label>
        Single Radio:
        <input name="radio" type="radio" value="radio" />
      </label>

      <fieldset>
        <legend>Group of Radios: </legend>
        <label>
          Radio 1:
          <input name="radiogroup" type="radio" value="radio1" />
        </label>
        <label>
          Radio 2:
          <input name="radiogroup" type="radio" value="radio2" />
        </label>
        <label>
          Radio 3:
          <input name="radiogroup" type="radio" value="radio3" />
        </label>
        <label>
          Radio 4:
          <input name="radiogroup" type="radio" value="radio4" />
        </label>
      </fieldset>

      <label>Range: </label>
      <input name="range" type="range" value="range" />

      <label>Reset: </label>
      <input name="reset" type="reset" value="reset" />

      <label>Time: </label>
      <input name="time" type="time" value="time" />

      <label>Search: </label>
      <input name="search" type="search" value="search" />

      <label>Tel: </label>
      <input name="tel" type="tel" value="tel" />

      <label>Text: </label>
      <input name="text" type="text" value="text" />

      <label>URL: </label>
      <input name="url" type="url" value="url" />

      <label>Week: </label>
      <input name="week" type="week" value="week" />

      <button type="button">This is a button!</button>

      <label>Select 1: </label>
      <select name="select" size={1}>
        <option>Test</option>
        <option>Test</option>
      </select>

      <label>Select 2: </label>
      <select name="select1" size={3}>
        <option>Test</option>
        <option>Test</option>
      </select>

      <label>Select Multiple: </label>
      <select multiple name="select2" size={3}>
        <option>Test</option>
        <option>Test</option>
      </select>

      <label>Select Groups: </label>
      <select multiple name="select3" size={1}>
        <optgroup label="First Group">
          <option>Test</option>
          <option>Test</option>
        </optgroup>
        <optgroup label="Second Group">
          <option>Test</option>
          <option>Test</option>
        </optgroup>
        <optgroup label="Third Group">
          <option>Test</option>
          <option>Test</option>
        </optgroup>
      </select>

      <fieldset>
        <legend>Datalist: </legend>
        <input list="samplelist" name="datalist" type="text" />
        <datalist id="samplelist">
          <option>Something</option>
          <option>Something else</option>
          <option>Another thing</option>
        </datalist>
      </fieldset>

      <label>A textarea!</label>
      <textarea name="textarea">A paragraph in here</textarea>

      <label>Progress (very unsupported): </label>
      <progress max="100" value="20" />

      <label>Meter (very unsupported): </label>
      <meter high={90} low={10} max="100" min="0" optimum={90} value="20">
        20 in the meter
      </meter>

      <input type="submit" value="GO" /> */}
    </form>
  );
};
