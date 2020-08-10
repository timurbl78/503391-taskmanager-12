import {createBoardTemplate} from "./view/board";
import {createFiltersTemplate} from "./view/filters";
import {createLoadMoreButtonTemplate} from "./view/load-more-button";
import {createMainMenuTemplate} from "./view/main-menu";
import {createTaskEditTemplate} from "./view/task-edit";
import {createTaskTemplate} from "./view/task";
import {generateTask} from "./mock/task";
import {generateFilter} from "./mock/filter";

const TASK_COUNT = 20;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const render = (container, code, place) => {
  container.insertAdjacentHTML(place, code);
};

const siteMainElement = document.querySelector(`.main`);
const siteControlElement = siteMainElement.querySelector(`.main__control`);

render(siteControlElement, createMainMenuTemplate(), `beforeend`);
render(siteMainElement, createFiltersTemplate(filters), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const siteBoardElement = siteMainElement.querySelector(`.board`);
const siteBoardTasksElement = siteBoardElement.querySelector(`.board__tasks`);

render(siteBoardTasksElement, createTaskEditTemplate(tasks[0]), `beforeend`);

for (let i = 1; i < Math.min(TASK_COUNT_PER_STEP, tasks.length); i++) {
  render(siteBoardTasksElement, createTaskTemplate(tasks[i]), `beforeend`);
}

if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  render(siteBoardElement, createLoadMoreButtonTemplate(), `beforeend`);

  const loadMoreButton = siteBoardElement.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => render(siteBoardTasksElement, createTaskTemplate(task), `beforeend`));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
