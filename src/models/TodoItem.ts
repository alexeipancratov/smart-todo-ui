export default class TodoItem {
  id: string = "";
  title: string = "";
  dateTimeCreated: string = "";
  dateTimeCompleted: string = "";
  isCompleted: boolean = false;

  constructor(obj?: Partial<TodoItem>) {
    Object.assign(this, obj);
  }
}
