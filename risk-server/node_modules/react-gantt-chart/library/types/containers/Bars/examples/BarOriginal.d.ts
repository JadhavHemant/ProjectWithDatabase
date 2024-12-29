import React from "react";
import { BarTask } from "../../../types/bar-task";
import { GanttContentMoveAction } from "../../../types/gantt-task-actions";
export interface IProps {
    task: BarTask;
    rtl: boolean;
    isDateChangeable: boolean;
    isProgressChangeable: boolean;
    onEventStart: (action: GanttContentMoveAction, selectedTask: BarTask, event?: React.MouseEvent | React.KeyboardEvent) => any;
}
declare const BarOriginal: (props: IProps) => JSX.Element;
export default BarOriginal;
