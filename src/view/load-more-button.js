import AbstractView from "./abstract";

export default class LoadMoreButton extends AbstractView {
  _createLoadMoreButtonTemplate() {
    return (
      `<button class="load-more" type="button">load more</button>`
    );
  }

  _getTemplate() {
    return this._createLoadMoreButtonTemplate();
  }
}
