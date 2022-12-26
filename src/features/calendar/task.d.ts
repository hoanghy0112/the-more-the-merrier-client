export type TaskComponentProp = {
  tasks: ITask[];
};

export enum EPriority {
  CANT_BE_IGNORED,
  IMPORTANT,
  NORMAL,
  CAN_BE_IGNORED,
}

export interface ITask {
  _id: String;
  title: String;
  time: {
    from: Date;
    to: Date;
  };
  location: String;
  descriptions: String[];
  priority: EPriority;
  tags: String[];
  days: Date[];
}

export interface ITaskDisplayData {
  data: ITask[];
}
