// eslint-disable-next-line import/no-unassigned-import
import '@testing-library/jest-dom/extend-expect';

// Dialog element is not implemented by JSDOM yet
// There is a WIP PR to add it https://github.com/jsdom/jsdom/pull/3403
HTMLDialogElement.prototype.show = jest.fn();
HTMLDialogElement.prototype.showModal = jest.fn();
HTMLDialogElement.prototype.close = jest.fn();
