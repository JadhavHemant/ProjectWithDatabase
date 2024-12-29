import React from "react";
import TaskListHeader, { IProps as TaskListHeaderProps } from "./components/TaskListHeader";
import TaskListTable, { IProps as TaskListTableProps } from "./components/TaskListTable";
export declare type IProps = {
    scrollY: number;
    TaskListHeader: typeof TaskListHeader;
    TaskListTable: typeof TaskListTable;
    taskListHeaderProps: TaskListHeaderProps;
    taskListTableProps: TaskListTableProps;
    taskListTableWrapperStyles?: React.CSSProperties;
    taskListRef: React.RefObject<HTMLDivElement>;
};
declare const TaskList: (props: IProps) => JSX.Element;
export default TaskList;
