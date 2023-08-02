## Dialog Component @ Contra

### Thought process
This is an interview, of course, but  in my mind I designed this component to be used in a design system, that can be reused across applications. So I made very few assumptions of what and how this component shall be used.

### Learnings
The difficult part was how dialog is treated from the browser itself. Only when called via `showModal` the element is displayed in its top layer and has the features like trapping focus and the backdrop.
If we use `open` to be more React-like, the element itself behaves in a non-modal way.
Because of this behaviour there's no simple "one-size-fits-all" solution, and we must leave some of the details to the consumer of the component, but with proper documentation, easing their own experience.

### Implementation
To use this component, your `onClose` prop MUST call a function that sets the state variable of `isOpen` back to `false`, such as:

```jsx
onClose={() => setIsOpen(false)}
```

### Extendability
This component can be extended to support additional styles, either for the dialog itself, customize the close button and other minor details. I would apply conditional styles in this case, making them come via props optionally.


### Props

| Name                 | Type                | Default | Description                                                          |
|----------------------|---------------------|---------|----------------------------------------------------------------------|
| children             | ReactNode           | null    | Child elements for the dialog.                                       |
| isOpen               | boolean             | -       | Whether the dialog should be open (required)                         |
| closeOnBackdropClick | boolean             | true    | Whether the dialog closes when clicking the backdrop                 |
| onClose              | function            | null    | Function that updates isOpen to switch from true to false (required) |
