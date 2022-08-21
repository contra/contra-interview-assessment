import { render, type RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import React, { type ComponentProps } from 'react';
import {
  ModalContent,
  ModalDescription,
  ModalRoot,
  ModalTitle,
  ModalClose,
  ModalTrigger,
} from '@/components/Modal';

expect.extend(toHaveNoViolations);

const MODAL_TITLE = 'Title';
const MODAL_DESCRIPTION = 'Hello world!';
const CLOSE_BUTTON_TEXT = 'Close';
const INPUT_FIELD_LABEL = 'First name';
const SIMPLE_MODAL_ID = 'simple-modal';
const MODAL_WITH_TABBABLE_ITEMS_ID = 'modal-with-tabbable-id';
const MODAL_TRIGGER_TEXT = 'Open';

const SimpleModal = (
  props: Omit<React.ComponentProps<typeof ModalRoot>, 'children'>
) => {
  return (
    <ModalRoot shouldShowOverlay {...props}>
      <ModalTrigger>{MODAL_TRIGGER_TEXT}</ModalTrigger>
      <ModalContent data-testid={SIMPLE_MODAL_ID}>
        <ModalTitle>{MODAL_TITLE}</ModalTitle>
        <ModalDescription>{MODAL_DESCRIPTION}</ModalDescription>
      </ModalContent>
    </ModalRoot>
  );
};

const ModalWithTabbableItem = (
  props: Omit<React.ComponentProps<typeof ModalRoot>, 'children'> & {
    shouldShowCloseButton?: boolean;
    shouldShowInput?: boolean;
  }
) => {
  const {
    shouldShowInput = false,
    shouldShowCloseButton = false,
    ...modalRootProps
  } = props;
  return (
    <ModalRoot shouldShowOverlay {...modalRootProps}>
      <ModalContent data-testid={MODAL_WITH_TABBABLE_ITEMS_ID}>
        <ModalTitle>{MODAL_TITLE}</ModalTitle>
        <ModalDescription>{MODAL_DESCRIPTION}</ModalDescription>
        {shouldShowInput && (
          <label>
            <span>{INPUT_FIELD_LABEL}</span>
            <input />
          </label>
        )}
        {shouldShowCloseButton && <ModalClose>{CLOSE_BUTTON_TEXT}</ModalClose>}
      </ModalContent>
    </ModalRoot>
  );
};

describe('For a modal', () => {
  it("shouldn't have accessibility violations", async () => {
    expect.assertions(1);
    const rendered = render(<SimpleModal defaultOpen />);
    await expect(axe(rendered.container)).resolves.toHaveNoViolations();
  });

  it('should show modal if defaultOpen is true', async () => {
    expect.assertions(1);
    render(<SimpleModal defaultOpen />);
    const elements = screen.getByRole('dialog');
    expect(elements).toBeVisible();
  });

  it('should open the modal if trigger is pressed', async () => {
    expect.assertions(3);
    const rendered = render(<SimpleModal />);
    const modalTriggerButton = rendered.getByText(MODAL_TRIGGER_TEXT);
    expect(rendered.queryByTestId(SIMPLE_MODAL_ID)).toBeNull();
    expect(modalTriggerButton).toBeInTheDocument();
    await userEvent.click(modalTriggerButton);
    const modalDialog = rendered.getByTestId(SIMPLE_MODAL_ID);
    expect(modalDialog).toBeInTheDocument();
  });

  describe('once the modal is open', () => {
    it('should lock the scroll on body when open', () => {
      expect.assertions(2);
      render(<SimpleModal defaultOpen />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(document.body).toHaveStyle({ overflow: 'hidden' });
    });

    it('should close the modal when ESC is pressed', async () => {
      expect.assertions(1);
      const rendered = render(<SimpleModal defaultOpen />);
      await userEvent.keyboard('{Escape}');
      const dialogModal = rendered.queryByRole('dialog');
      expect(dialogModal).toBeNull();
    });

    describe('handles focus within the modal', () => {
      it('focusses on the container when open if there are no tabbable child items', async () => {
        expect.assertions(1);
        const rendered = render(<SimpleModal defaultOpen />);
        const diaLogModal = rendered.getByRole('dialog');
        expect(diaLogModal).toHaveFocus();
      });

      it('focusses on first tabbable item when open', async () => {
        expect.assertions(1);
        const rendered = render(
          <ModalWithTabbableItem defaultOpen shouldShowCloseButton />
        );
        const closeButton = rendered.getByText(CLOSE_BUTTON_TEXT);
        expect(closeButton).toHaveFocus();
      });

      it('moves focus to first tabbable element from last tabbable element inside the modal when pressing tab', async () => {
        expect.assertions(1);
        const rendered = render(
          <ModalWithTabbableItem
            defaultOpen
            shouldShowCloseButton
            shouldShowInput
          />
        );
        const firstTabbableItem = rendered.queryByLabelText(INPUT_FIELD_LABEL);
        const lastTabbableItem = rendered.queryByText(CLOSE_BUTTON_TEXT);
        lastTabbableItem?.focus();
        await userEvent.tab();
        expect(firstTabbableItem).toHaveFocus();
      });

      it('moves focus to last tabbable element from first tabbable element inside the modal when pressing shift+tab', async () => {
        expect.assertions(1);
        const rendered = render(
          <ModalWithTabbableItem
            defaultOpen
            shouldShowCloseButton
            shouldShowInput
          />
        );
        const lastTabbableItem = rendered.queryByText(CLOSE_BUTTON_TEXT);
        await userEvent.tab({ shift: true });
        expect(lastTabbableItem).toHaveFocus();
      });
    });
  });
});

const StackedModals = (props: {
  firstModalProps?: ComponentProps<typeof SimpleModal>;
  secondModalProps?: ComponentProps<typeof ModalWithTabbableItem>;
}) => {
  return (
    <>
      <SimpleModal {...props.firstModalProps} />
      <ModalWithTabbableItem {...props.secondModalProps} />
    </>
  );
};

describe('For stacked modals', () => {
  let rendered: RenderResult;
  let firstModal: HTMLElement;
  let secondModal: HTMLElement;

  beforeEach(() => {
    rendered = render(
      <StackedModals
        firstModalProps={{ defaultOpen: true }}
        secondModalProps={{ defaultOpen: true }}
      />
    );
    firstModal = rendered.getByTestId(SIMPLE_MODAL_ID) as HTMLElement;
    secondModal = rendered.getByTestId(
      MODAL_WITH_TABBABLE_ITEMS_ID
    ) as HTMLElement;
  });

  it('should show both modals', () => {
    expect.assertions(2);
    expect(firstModal).toBeInTheDocument();
    expect(secondModal).toBeInTheDocument();
  });

  it('should focus within the modal that was rendered last', () => {
    expect.assertions(1);
    expect(secondModal).toHaveFocus();
  });

  it('should only close the last rendered modal when ESC is pressed', async () => {
    expect.assertions(2);
    await userEvent.keyboard('{Escape}');
    expect(secondModal).not.toBeInTheDocument();
    expect(firstModal).toBeInTheDocument();
  });

  it('should lock pointer events on the modal that is not at the top', () => {
    expect.assertions(1);
    expect(firstModal).toHaveStyle({ 'pointer-events': 'none' });
  });
});
