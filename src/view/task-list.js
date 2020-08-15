import AbstractView from "./abstract";

export default class TaskList extends AbstractView {
  _createTaskListTemplate() {
    return `<div class="board__tasks"></div>`;
  }

  _getTemplate() {
    return this._createTaskListTemplate();
  }
}
