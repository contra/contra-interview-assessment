export const multipleModal = [
  {
    modalContent: 'Last modal',
    modalHeader: 'Multiple Modal One',
    modalName: 'multi modal 1',
    type: 'dialog',
  },
  {
    modalContent: 'When you close one the rest will remain',
    modalHeader: 'Multiple Modal Two',
    modalName: 'multi modal 2',
    type: 'dialog',
  },
  {
    buttonText: 'Send',
    modalContent: 'These Modals are stacked on top of each other',
    modalFooter: true,
    modalHeader: 'Multiple Modal Three',
    modalName: 'multi modal 3',
    submitAction: () => alert('callback to some fn'),
    type: 'dialog',
  },
];
