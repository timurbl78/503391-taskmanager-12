import {createElement} from "../utils";

export default class Sort {
  constructor() {
    this._element = null;
  }

  _createSortTemplate() {
    return (`<div class="board__filter-list">
    <a href="#" class="board__filter">SORT BY DEFAULT</a>
    <a href="#" class="board__filter">SORT BY DATE up</a>
    <a href="#" class="board__filter">SORT BY DATE down</a>
  </div>`);
  }

  _getTemplate() {
    return this._createSortTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
