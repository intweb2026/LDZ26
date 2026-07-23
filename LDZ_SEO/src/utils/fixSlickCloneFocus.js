// react-slick clones slides for its infinite-loop mode and marks the clone
// wrapper aria-hidden="true", but it does not touch the focusability of
// interactive elements inside those clones — they stay tab-focusable even
// though assistive tech is told to ignore them. This walks a slider's
// container after every render/re-init and neutralizes those clones' focus,
// restoring the original tabindex once a slide is no longer a hidden clone.
export function fixSlickCloneFocus(container) {
  if (!container) return;

  const hidden = container.querySelectorAll(
    '[aria-hidden="true"] a, [aria-hidden="true"] button, [aria-hidden="true"] input, [aria-hidden="true"] [tabindex]',
  );
  hidden.forEach((el) => {
    if (el.dataset.a11yOrigTabindex === undefined) {
      el.dataset.a11yOrigTabindex = el.getAttribute("tabindex") ?? "";
    }
    el.setAttribute("tabindex", "-1");
  });

  const stashed = container.querySelectorAll("[data-a11y-orig-tabindex]");
  stashed.forEach((el) => {
    if (el.closest('[aria-hidden="true"]')) return;
    const orig = el.dataset.a11yOrigTabindex;
    if (orig) el.setAttribute("tabindex", orig);
    else el.removeAttribute("tabindex");
    delete el.dataset.a11yOrigTabindex;
  });
}
