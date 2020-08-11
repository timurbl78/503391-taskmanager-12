import {createElement} from "../utils";

export default class TaskList {
  constructor() {
    this._element = null;
  }

  _createTaskListTemplate() {
    return `<div class="board__tasks"></div>`;
  }

  _getTemplate() {
    return this._createTaskListTemplate();
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
