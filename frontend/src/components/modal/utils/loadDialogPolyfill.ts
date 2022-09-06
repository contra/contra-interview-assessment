const loadDialogPolyfill = (dialog: HTMLDialogElement) => {
    import("dialog-polyfill/dist/dialog-polyfill.css");
    import('dialog-polyfill').then(polyfill => {
        polyfill.default.registerDialog(dialog)
        dialog.showModal();
    }).catch(() => {
        // An error occured while loading polyfill
    })
}

export default loadDialogPolyfill;
