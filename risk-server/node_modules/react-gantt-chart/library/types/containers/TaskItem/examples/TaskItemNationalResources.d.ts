import React from "react";
import { BarTask } from "../../../types/bar-task";
import { GanttContentMoveAction } from "../../../types/gantt-task-actions";
import { OptionalKeys } from "../../../types/custom";
export declare type IProps = {
    task: BarTask;
    arrowIndent: number;
    taskHeight: number;
    isProgressChangeable: boolean;
    isDateChangeable: boolean;
    isDelete: boolean;
    isSelected: boolean;
    rtl: boolean;
    onEventStart: (action: GanttContentMoveAction, selectedTask: BarTask, event?: React.MouseEvent | React.KeyboardEvent) => any;
    taskItemTextStyle?: React.CSSProperties;
    taskItemTextOutsideStyle?: React.CSSProperties;
};
declare type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
declare type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;
export declare const defaultProps: TOptionalProps;
declare const TaskItemNationalResources: {
    (props: IProps & typeof defaultProps): JSX.Element;
    defaultProps: Required<Pick<IProps, TOptionalPropsKeys>>;
};
export default TaskItemNationalResources;
