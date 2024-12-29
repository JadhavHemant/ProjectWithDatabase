import React from "react";
import { Task, EventOption, DisplayOption, StylingOption } from "../../types/public-types";
import { OptionalKeys } from "../../types/custom";
export declare type IProps = Partial<EventOption> & Partial<DisplayOption> & Partial<StylingOption> & {
    tasks: Task[];
    bodyStyle?: React.CSSProperties;
};
declare type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
declare type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;
export declare const defaultProps: TOptionalProps;
declare const GanttOriginal: {
    (props: IProps & typeof defaultProps): JSX.Element;
    defaultProps: Required<Pick<IProps, TOptionalPropsKeys>>;
};
export default GanttOriginal;
