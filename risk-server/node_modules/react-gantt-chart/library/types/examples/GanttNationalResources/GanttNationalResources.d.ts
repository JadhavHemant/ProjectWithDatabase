import React from "react";
import { Task, EventOption, DisplayOption, StylingOption } from "../../types/public-types";
import { OptionalKeys } from "../../types/custom";
export declare const ROW_WIDTH = 320;
export declare type IProps = Partial<EventOption> & Partial<DisplayOption> & Partial<StylingOption> & {
    tasks: Task[];
    multiBarRowMode?: boolean;
    bodyStyle?: React.CSSProperties;
};
declare type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
declare type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;
export declare const defaultProps: TOptionalProps;
declare const GanttNationalResources: {
    (props: IProps & typeof defaultProps): JSX.Element;
    defaultProps: Required<Pick<IProps, TOptionalPropsKeys>>;
};
export default GanttNationalResources;
