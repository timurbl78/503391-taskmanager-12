import FiltersView from "./view/filters";
import MainMenuView from "./view/main-menu";
import LoadMoreButtonView from "./view/load-more-button";
import BoardView from "./view/board";
import SortView from "./view/sort";
import TaskListView from "./view/task-list";
import TaskEditView from "./view/task-edit";
import TaskView from "./view/task";
import NoTaskView from "./view/no-task";
import {generateTask} from "./mock/task";
import {generateFilter} from "./mock/filter";
import {render, RenderPosition} from "./utils";

const TASK_COUNT = 20;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteControlElement = siteMainElement.querySelector(`.main__control`);

const renderTask = (taskListElement, task) => {
  const taskComponent = new TaskView(task);
  const taskEditComponent = new TaskEditView(task);

  const replaceCardToForm = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const replaceFormToCard = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  taskComponent.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

render(siteControlElement, new MainMenuView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FiltersView(filters).getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardView();
render(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);

if (tasks.every((task) => task.isArchive)) {
  render(boardComponent.getElement(), new NoTaskView().getElement(), RenderPosition.BEFOREEND);
} else {
  render(boardComponent.getElement(), new SortView().getElement(), RenderPosition.BEFOREEND);

  const taskListComponent = new TaskListView();
  render(boardComponent.getElement(), taskListComponent.getElement(), RenderPosition.BEFOREEND);


  for (let i = 0; i < Math.min(TASK_COUNT_PER_STEP, tasks.length); i++) {
    renderTask(taskListComponent.getElement(), tasks[i]);
  }

  if (tasks.length > TASK_COUNT_PER_STEP) {
    let renderedTaskCount = TASK_COUNT_PER_STEP;

    const loadMoreButtonComponent = new LoadMoreButtonView();

    render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

    loadMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      tasks
        .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
        .forEach((task) => renderTask(taskListComponent.getElement(), task));

      renderedTaskCount += TASK_COUNT_PER_STEP;

      if (renderedTaskCount >= tasks.length) {
        loadMoreButtonComponent.getElement().remove();
        loadMoreButtonComponent.removeElement();
      }
    });
  }
}
