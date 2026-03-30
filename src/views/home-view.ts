/** Renders the home screen HTML */
export function renderHomeView(): string {
  return `
    <section class="view view--home" data-view="home">
      <div class="home__content">
        <p class="home__subtitle">It's play time.</p>
        <h1 class="home__title">Ready to play?</h1>
        <button class="btn-home-play" data-action="go-to-settings" aria-label="Play game">
          <img src="/assets/designs/settings/btn-primary.svg" data-hover-src="/assets/designs/settings/btn-primary-hover.svg" alt="" aria-hidden="true" class="btn-home-play__image">
        </button>
      </div>
      <img src="/assets/designs/stadia_controller.svg" alt="" class="home__bg-icon" aria-hidden="true">
    </section>
  `;
}
