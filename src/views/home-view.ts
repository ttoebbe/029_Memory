/** Renders the home screen HTML */
export function renderHomeView(): string {
  return `
    <section class="view view--home" data-view="home">
      <div class="home__content">
        <p class="home__subtitle">It's play time.</p>
        <h1 class="home__title">Ready to play?</h1>
        <button class="btn btn--primary" data-action="go-to-settings">
          <img src="/assets/designs/stadia_controller.svg" alt="" class="btn__icon" aria-hidden="true">
          Play &rarr;
        </button>
      </div>
      <img src="/assets/designs/stadia_controller.svg" alt="" class="home__bg-icon" aria-hidden="true">
    </section>
  `;
}
