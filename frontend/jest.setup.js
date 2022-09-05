// eslint-disable-next-line import/no-unassigned-import
import '@testing-library/jest-dom';

HTMLDialogElement.prototype.show = jest.fn();
HTMLDialogElement.prototype.showModal = jest.fn();
HTMLDialogElement.prototype.close = jest.fn();