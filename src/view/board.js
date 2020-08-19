import AbstractView from "./abstract";

export default class Board extends AbstractView {
  _createBoardTemplate() {
    return (`<section class="board container"></section>`);
  }

  _getTemplate() {
    return this._createBoardTemplate();
  }
}
