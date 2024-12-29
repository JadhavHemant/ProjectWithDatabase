import React from "react";
import { Task } from "../types/public-types";
import { BarTask } from "../types/bar-task";
import { OptionalKeys } from "../types/custom";
export interface ITooltipContentProps {
    task: Task;
    fontSize: string;
    fontFamily: string;
}
export declare type IProps = {
    task: BarTask;
    rtl: boolean;
    children: JSX.Element | string;
    arrowIndent: number;
    scrollX: number;
    scrollY: number;
    svgContainerHeight: number;
    svgContainerWidth: number;
    headerHeight: number;
    rowHeight: number;
    taskListWidth: number;
    multiBarRowMode?: boolean;
    rootStyle?: React.CSSProperties;
};
declare type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
declare type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;
export declare const defaultProps: TOptionalProps;
declare const Tooltip: {
    (props: IProps & typeof defaultProps): JSX.Element;
    defaultProps: Required<Pick<IProps, TOptionalPropsKeys>>;
};
export default Tooltip;
export declare const StandardTooltipContent: (props: ITooltipContentProps) => JSX.Element;
export declare const NationalResourcesTooltipContent: (props: ITooltipContentProps) => JSX.Element;
