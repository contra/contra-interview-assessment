export default [
    {
      default: '',
      description: 'A single child content element.',
      id: 1,
      name: 'children*',
      type: 'element',
    },
    {
      default: 'false',
      description: 'If true, the component is shown.',
      id: 2,
      name: 'isOpen',
      type: 'boolean',
    },
    {
      default: '',
      description: 'setter for isOpen',
      id: 3,
      name: 'setIsOpen',
      type: 'function',
    },
    {
      default: '',
      description:
        'Callback fired when the component requests to be closed. The reason parameter can optionally be used to control the response to onClose.',
      id: 3,
      name: 'closeOverride',
      type: 'function',
    },
    {
      default: "'md'",
      description: "Options are 'xs', 'sm', 'md' & 'lg'.",
      id: 4,
      name: 'size',
      type: 'string',
    },
    {
      default: '',
      description: "It's the title of the modal.",
      id: 5,
      name: 'title',
      type: 'string',
    },
    {
      default: 'false',
      description: 'It handle overlay dismissed functionality',
      id: 6,
      name: 'overlayDismissed',
      type: 'boolean',
    },
  ];