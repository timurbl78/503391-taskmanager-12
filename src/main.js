import {createBoardTemplate} from "./view/board";
import {createFiltersTemplate} from "./view/filters";
import {createLoadMoreButtonTemplate} from "./view/load-more-button";
import {createMainMenuTemplate} from "./view/main-menu";
import {createTaskEditTemplate} from "./view/task-edit";
import {createTaskTemplate} from "./view/task";
import {generateTask} from "./mock/task";

const TASK_COUNT = 3;

const render = (container, code, place) => {
  container.insertAdjacentHTML(place, code);
};

const siteMainElement = document.querySelector(`.main`);
const siteControlElement = siteMainElement.querySelector(`.main__control`);

render(siteControlElement, createMainMenuTemplate(), `beforeend`);
render(siteMainElement, createFiltersTemplate(), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const siteBoardElement = siteMainElement.querySelector(`.board`);
const siteBoardTasksElement = siteBoardElement.querySelector(`.board__tasks`);

render(siteBoardTasksElement, createTaskEditTemplate(), `beforeend`);

for (let i = 0; i < TASK_COUNT; i++) {
  render(siteBoardTasksElement, createTaskTemplate(), `beforeend`);
}

render(siteBoardElement, createLoadMoreButtonTemplate(), `beforeend`);
