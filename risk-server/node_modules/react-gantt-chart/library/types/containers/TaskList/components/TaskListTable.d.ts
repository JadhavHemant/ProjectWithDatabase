import React from "react";
import { Task } from "../../../types/public-types";
import { OptionalKeys } from "../../../types/custom";
export interface IProps {
    tasks: Task[];
    locale: string;
    expanderSymbolOpen?: JSX.Element | string;
    expanderSymbolClose?: JSX.Element | string;
    expanderSymbolEmpty?: JSX.Element | string;
    onExpanderClick: (task: Task) => void;
    showStartDateColumn?: boolean;
    showEndDateColumn?: boolean;
    rootStyle?: React.CSSProperties;
    tableRowStyle?: React.CSSProperties;
    tableRowStyleProject?: React.CSSProperties;
    tableCellStyle?: React.CSSProperties;
    tableCellStyleProject?: React.CSSProperties;
    tableCellStyleTask?: React.CSSProperties;
    tableCellStyleMileStone?: React.CSSProperties;
    tableCellWrapperStyle?: React.CSSProperties;
    expanderStyle?: React.CSSProperties;
    expanderEmptyStyle?: React.CSSProperties;
}
declare type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
declare type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;
export declare const defaultProps: TOptionalProps;
declare const TaskListTable: {
    (props: IProps & typeof defaultProps): JSX.Element;
    defaultProps: Required<Pick<IProps, TOptionalPropsKeys>>;
};
export default TaskListTable;
