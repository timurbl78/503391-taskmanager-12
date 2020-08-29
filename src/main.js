import FiltersView from "./view/filters";
import MainMenuView from "./view/main-menu";
import BoardPresenter from "./presenter/board";
import {generateTask} from "./mock/task";
import {generateFilter} from "./mock/filter";
import TasksModel from "./model/tasks.js";
import {render, RenderPosition} from "./utils/render";

const TASK_COUNT = 20;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteControlElement = siteMainElement.querySelector(`.main__control`);

const boardPresenter = new BoardPresenter(siteMainElement, tasksModel);

render(siteControlElement, new MainMenuView(), RenderPosition.BEFOREEND);
render(siteMainElement, new FiltersView(filters), RenderPosition.BEFOREEND);

boardPresenter.init();
