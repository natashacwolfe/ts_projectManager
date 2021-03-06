import { Draggable } from "../models/drag-drop";
import Component from './base-component';
import  autoBind  from '../decorators/autobind-decorator';
import { Project } from '../models/project';

// project item class
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable {
  private project: Project;

  get persons() {
    if (this.project.people === 1) {
      return `1 person`;
    } else {
      return `${this.project.people} persons`;
    }
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @autoBind
  dragStartHandle(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  dragEndHandle(_: DragEvent) {
    console.log("dragEnd");
  }

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandle);
    this.element.addEventListener("dragstart", this.dragEndHandle);
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.persons + " assigned";
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
