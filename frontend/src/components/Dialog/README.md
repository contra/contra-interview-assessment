## Dialog Component @ Contra

### Thought process
This is an interview, of course, but anyways in my mind I designed this component to be used in a design system, that can be reused across applications. So I made very few assumptions of what and how this component shall be used.

### Implementation
To use this component, your `onClose` prop MUST call a function that sets the state variable of `isOpen` back to `false`, such as:

```jsx
onClose={() => setIsOpen(false)}
```

### Extendability
This component can be extended to support additional styles, either for the dialog itself, customize the close button and other minor details. I would apply conditional styles in this case, making them come via props optionally.
