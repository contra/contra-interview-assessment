import '@testing-library/jest-dom/extend-expect';

Element.prototype.scroll = () => {};
Element.prototype.scrollIntoView = jest.fn();
Element.prototype.scrollTo = jest.fn();

window.scrollTo = jest.fn();
