import MainMenuView from "./view/main-menu";
import StatisticsView from "./view/statistics.js";
import BoardPresenter from "./presenter/board";
import FilterPresenter from "./presenter/filter.js";
import {generateTask} from "./mock/task";
import TasksModel from "./model/tasks.js";
import FilterModel from "./model/filter.js";
import {render, RenderPosition, remove} from "./utils/render";
import {MenuItem, UpdateType, FilterType} from "./const.js";
import Api from "./api";

const TASK_COUNT = 20;
const AUTHORIZATION = `Basic hS2sdr33dfSf4sa2j`;
const END_POINT = `https://12.ecmascript.pages.academy/task-manager`;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const api = new Api(END_POINT, AUTHORIZATION);

api.getTasks().then((tasks) => {
  console.log(tasks);
});

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterModel = new FilterModel();

const siteMainElement = document.querySelector(`.main`);
const siteControlElement = siteMainElement.querySelector(`.main__control`);

const mainMenuComponent = new MainMenuView();
render(siteControlElement, mainMenuComponent, RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(siteMainElement, tasksModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, tasksModel);

const handleTaskNewFormClose = () => {
  mainMenuComponent.getElement().querySelector(`[value=${MenuItem.TASKS}]`).disabled = false;
  mainMenuComponent.setMenuItem(MenuItem.TASKS);
};

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_TASK:
      remove(statisticsComponent);
      boardPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
      boardPresenter.init();
      boardPresenter.createTask(handleTaskNewFormClose);
      mainMenuComponent.getElement().querySelector(`[value=${MenuItem.TASKS}]`).disabled = true;
      break;
    case MenuItem.TASKS:
      boardPresenter.init();
      remove(statisticsComponent);
      break;
    case MenuItem.STATISTICS:
      boardPresenter.destroy();
      statisticsComponent = new StatisticsView(tasksModel.getTasks());
      render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

mainMenuComponent.setMenuClickHandler(handleSiteMenuClick);
filterPresenter.init();
boardPresenter.init();
