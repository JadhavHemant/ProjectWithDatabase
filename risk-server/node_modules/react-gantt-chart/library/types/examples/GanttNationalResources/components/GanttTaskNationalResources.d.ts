import React from "react";
import { IProps as GridProps } from "../../../containers/Grid/Grid";
import { IProps as CalendarProps } from "../../../containers/Calendar/Calendar";
import { IProps as GanttTaskContentOriginalProps } from "./GanttTaskContentNationalResources";
import { OptionalKeys } from "../../../types/custom";
export declare type IProps = {
    gridProps: GridProps;
    calendarProps: CalendarProps;
    barProps: GanttTaskContentOriginalProps;
    ganttHeight: number;
    scrollX: number;
    scrollY: number;
    rootStyle?: React.CSSProperties;
    contentStyle?: React.CSSProperties;
};
declare type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
declare type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;
export declare const defaultProps: TOptionalProps;
declare const GanttTaskNationalResources: {
    (props: IProps & typeof defaultProps): JSX.Element;
    defaultProps: Required<Pick<IProps, TOptionalPropsKeys>>;
};
export default GanttTaskNationalResources;
