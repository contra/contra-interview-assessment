# Modal

This component is a combination of a background overlay and a centered space to place any component you might want to render. Contents is passed in as `children` and will scroll if the contents is too large. At mobile size it will take over the full screen.

## Props

| Prop | type | Default | required | Description |
| -- | -- |  -- | -- | -- |
| isOpen | boolean | false | yes | Controls if modal is rendered in the react portal |
| onClose | function | () => {} | no | Used when clicking on overlay or `Escape` button |
| children | JSX | undefined | no | Contents of centered modal |
| focusRef | RefObject | null | no | Used to focus on an element when modal opens


# KeyboardManager

A simple class used to register functions to be run when a keyboard key is pressed. 

Events are `registered` and `unregistered` and mapped to a single keypress. Here is an example of the structure stored on the `registeredKeys` class property:

    {
	    Escape: [
		    firstRegisteredFunction,
		    SecondRegisteredFunction,
		    CurrentActiveFunction
		  ],
	    Tab: [
		    firstRegisteredFunction,
		    CurrentActiveFunction
		  ],
    }

## Props 

| Prop | type | Description |
| -- | -- |  -- |
| subscribe | function | Add `addEventListener` to all `keyup` events |
| unsubscribe | function | Remove `addEventListener` to all `keyup` events |
| register| function(key, function) | Accepts a `key` as a `string` to match the `key` of a `KeyboardEvent`. Also accepts a `function` that accepts a `KeyboardEvent` that will be run when the matching keypress happens. |
| unregister | function(key, function) | Uses the `key` and `function` to remove that event from the `registeredKeys` property letting any previous registered events run. |
| handleKey | function(KeyboardEvent) | Called from the registered `addEventListener`. Takes the `key` from the `KeyboardEvent` and finds the last added function to the `registeredKeys[key]` array and runs it. 
