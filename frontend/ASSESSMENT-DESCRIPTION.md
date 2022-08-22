An implementation of a lightweight, customisable Modal component from scratch. The Modal component has been designed as a compound component.

## Loom Video

Please watch the following loom video to understand the structure, working, and UI of the modal component. 

## Component Structure

 A compound component gives us the flexibility to pass children and style the children in different styles without having to move those styles to the Modal component itself. The Modal component in this PR comprises of a Header, Body, and Footer component viz., `Modal.Header, Modal.Body, and Modal.Footer`. 

Suppose, few weeks down the development roadmap, we have shipped a Modal component. Now, the new design requires us to show a badge along with the Modal Title to show whether a user is in the Base pricing plan or Pro pricing plan. In this case, we would either have to re-write the Modal component, or add complex logic to render a Badge for only the My Account modal.

Using a compound component, we are providing the control for the structure of the component to the person who would be using the Modal in different scenarios. For the above example, it would be as simple as - 

```jsx
<Modal isOpen={isAccountInfoModalOpen} onClose={() => setIsAccountInfoModalOpen(isAccountInfoModalOpen => !isAccountInfoModalOpen)}>
  // add custom classNames to Modal.Header
  <Modal.Header className="flex flex-row justify-start space-x-2">
    <h2 className="text-lg text-gray-800">My Account</h2>
		<Badge style="yellow" label="pro plan" />
  </Modal.Header>
```

And hence, the same structure has been followed for Header, Body, and Footer. The modal component provides some basic styles to these elements. However, all of these styles can be overriden by using providing a `className` prop to each of these components.

## Prop Type Definitions

### Modal Component
### Modal Component

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| isOpen | boolean |  | The modal will be open, if true. |
| className? | string |  | Provide custom tailwindCSS or external classnames to the modal dialog. |
| onClose | () ⇒ void |  | Callback that is invoked when the modal is closed. |
| isCentered? | boolean | true | The modal will be centred if true, else will aligned to the top. |
| closeOnEsc? | boolean | true | If false, the modal will not close on key stroke esc |
| ariaLabel? | string | “modal-title” | Can we used to define the aria-label for the modal for better a11y. |
| backdropClassName? | string |  | Provide custom tailwindCSS or external classnames to the modal backdrop. |
| blockScrollOnMount? | boolean | true | If false, the body will not have a scroll lock. |
| closeOnOutsideClick? | boolean | true | If false, the modal will not close on clicking outside of the dialog. |
| finalFocusRef? | React.RefObject<HTMLElement> |  | HTML element to be focused once the modal is closed. |
| children | React.ReactNode | React.ReactNode[] |  | Can be used to pass children to the Modal component. Theoretically, Header, Body, and Footer. |
| initialFocusRef? | React.RefObject<HTMLElement> |  | HTML element to be focused once the modal opens (programatically).  |
| size? | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full” | “lg” | Can be used to vary the size of the modal. |

### Modal.Header, Modal.Body, and Modal.Footer

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| children | React.ReactNode | React.ReactNode[] |  | Can be used to pass children to the Header, Body, and Footer component. |
| className? | string |  | Can be used to pass custom styles and classNames to Header, Body, and Footer component. |

## Hooks

### useCloseOnOutsideClick

The `useCloseOnOutsideClick` is a custom hook which accepts the `insideRef, outsideRef, and a handler function`. If the click falls outside of the `insideRef` then the action is invoked. Else, the action is not invoked. 

In the modal component, the modal closes on clicking the backdrop (provided `closeOnOutsideClick` is set to `true`. This handled using this hook.

### useHotKeys

The `useHotKeys` is a custom hook which accepts `key, action, dependencies, useCmdKey, useAltKey, useShiftKey`. The hook performs the provided action based on some custom keybinding as defined in the hook. 

In the modal component, the modal closes on pressing `esc` (provided `closeOnEsc` is set to `true`). This is handled using this hook. 

### useModal

The `useModal` is a custom hook that encapsulates all the logic required to focus trap, focus on `intialRef` and `finalRef` passed to the modal component along with handling closing of the modal and setting scroll-lock to the webpage when the modal is open, and also adding a `paddingRight` to the body when `overflow` is set to hidden. This hook wraps up the core logic and working of the modal component. The hook returns the function `handleModalClose` which is used by the close icon button in the modal header.

## Modal Manager

The `ModalManager` class is responsible for encapsulating the logic for nested/stacked modals and to store which element retain focus on closing of a modal. The class methods are defined below -

| Method Name | Definition |
| --- | --- |
| add(modal) | Used to add a particular modal into the modals array. Also, stores the currently focused element in the modal to retain focus when the modal appears again. |
| remove(modal) | Used to remove a particular modal from the modals array. This is done when a particular modal is closed. |
| getTopModal | Returns the top most modal in the modal stack. |
| manageFinalFocus() | Returns the previously focused element in a modal. |
| getFocusableElements() | Returns the previouslyFocusedElements array. |
| isTopModal(modal) | Returns true if the modal passed is the top most modal in the modal stack. |
| isLastModal(modal) | Returns true if the modal is last the modal in the modal stack. |
| hasModals() | Returns true if there are any modals rendered o  |


### useModalManager

The custom hook `useModalManager` is used to add a particular modal into the `modals` array when a modal opens and remove it from the array when the modal closes.

## Utils

### focusable

The focusable util is used to get a list of focusable items and make sure that these are the items that are focused when the modal opens. The util accepts a `ref` which is a ref to the modal dialog and a boolean parameter `shouldFocusFirstFocusableElement` which if set to true, focuses on the first focusable element in the modal which is the close icon button. The parameter is set to `false` when we provide and `initialFocusRef` to the Modal component to focus on some other element programatically. However, even if the parameter is set to `false` the focus will still be trapped inside the focusable elements in the Modal.

## Tests

I have written a few basic tests that check the rendering, prop based UI changes, and the basic working of the Modal component.

The tests are written for the following cases - 

1. The modal should be rendered without crashing.
2. The modal should not be rendered if `isOpen={false}`.
3. The modal should always render with a backdrop.
4. The modal should render a header when `Modal.Header` is passed as children.
5. The modal should render a body when `Modal.Body` is passed as children.
6. The modal should render a footer when `Modal.Footer` is passed as children.
7. The modal must always render a close icon button.
8. The modal should call the `onClose` callback when the close icon button is clicked.
9. The modal should call the `onClose` callback when the `esc` key is pressed.
10. The modal should close on clicking the backdrop.
11. The modal should not close when `closeOnOutsideClick` prop is set to `false`.
12. The modal should not close when `closeOnEsc` prop is set to `false`.
13. The webpage should not scroll when the modal is open.
14. The webpage should scroll when the modal is open and `blockScrollOnMount` is set to `false`.
15. The modal should focus on the close icon button by default when the modal opens.
16. The modal should focus on a particular element when the `initialFocusRef` is passed to the Modal.

These were some quick tests written to ensure that any changes made to the Modal component in future does not break the default behaviour of the Modal. All tests are present inside the  `__tests__` folder inside `frontend/src/common/Modal`.

## Styles

The entire project, component, custom components like `Button, Input, and Checkbox` have all been styled using tailwindCSS. 

## Animation

The Modal component has been styled using framer-motion. 

## Misc

I have created a few misc form elements like `Button, Checkbox, and Input` as part of the challenge to render these elements inside of the Modal.

A portal component has also been created to render the modal.

## Accessibility

- The focus is trapped inside of a modal once opened.
- Pressing `esc` or clicking anywhere but not the modal dialog will close the modal provided the `closeOnEsc` and `closeOnOutsideClick` props are set to `true`.
- The focus is automatically set to the first focusable element by default, provided, `initialFocusRef` is not provided. If the ref is provided, then the focus would be on that element.
- The focus is automatically set to the element that triggered the Modal to open provided, `finalFocusRef` is not provided. If the ref is provided, then the focus would be on that custom element.
- Scroll is blocked on the body. This can be disabled by setting the prop `blockScrollOnMount` to `false`.
- The modal is rendered inside a portal with `aria-modal` set to `true` along with `arial-labelledby`.
- To avoid layout shift when the scrollbar is hidden, a `padding-right` is added to the body. The value is computed dynamically, each time a modal is rendered.