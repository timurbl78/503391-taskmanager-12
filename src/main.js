import {createBoardTemplate} from "./view/board";
import {createFiltersTemplate} from "./view/filters";
import {createLoadMoreButtonTemplate} from "./view/load-more-button";
import {createMainMenuTemplate} from "./view/main-menu";
import {createTaskEditTemplate} from "./view/task-edit";
import {createTaskTemplate} from "./view/task";
import {generateTask} from "./mock/task";
import {generateFilter} from "./mock/filter";
import {renderTemplate, RenderPosition} from "./utils";

const TASK_COUNT = 20;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const render = (container, code, place) => {
  container.insertAdjacentHTML(place, code);
};

const siteMainElement = document.querySelector(`.main`);
const siteControlElement = siteMainElement.querySelector(`.main__control`);

renderTemplate(siteControlElement, createMainMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createFiltersTemplate(filters), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createBoardTemplate(), RenderPosition.BEFOREEND);

const siteBoardElement = siteMainElement.querySelector(`.board`);
const siteBoardTasksElement = siteBoardElement.querySelector(`.board__tasks`);

renderTemplate(siteBoardTasksElement, createTaskEditTemplate(tasks[0]), RenderPosition.BEFOREEND);

for (let i = 1; i < Math.min(TASK_COUNT_PER_STEP, tasks.length); i++) {
  renderTemplate(siteBoardTasksElement, createTaskTemplate(tasks[i]), RenderPosition.BEFOREEND);
}

if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  renderTemplate(siteBoardElement, createLoadMoreButtonTemplate(), RenderPosition.BEFOREEND);

  const loadMoreButton = siteBoardElement.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => renderTemplate(siteBoardTasksElement, createTaskTemplate(task), RenderPosition.BEFOREEND));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
