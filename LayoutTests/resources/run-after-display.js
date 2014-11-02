function runAfterDisplay(callback) {
    window.requestAnimationFrame(function() {
        // At this point, only the animate has happened, but no compositing
        // or layout.  Use a timeout for the callback so that notifyDone
        // can be called inside of it.
        // FIXME: we need a better way of waiting for chromium events to happen
        window.setTimeout(callback, 1);
    });
}
