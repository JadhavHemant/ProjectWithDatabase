import React from "react";
import { IProps as TaskItemProps } from "../TaskItem/examples/TaskItemOriginal";
import { OptionalKeys } from "../../types/custom";
export declare type IProps = Pick<TaskItemProps, "rtl" | "isDateChangeable" | "isProgressChangeable"> & {
    rootStyle?: React.CSSProperties;
    barDisplay?: JSX.Element;
    leftBarDateHandle?: JSX.Element;
    rightBarDateHandle?: JSX.Element;
    barProgressHandle?: JSX.Element;
    onMouseEnter?: React.MouseEventHandler<SVGGElement>;
    onMouseLeave?: React.MouseEventHandler<SVGGElement>;
};
declare type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
declare type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;
export declare const defaultProps: TOptionalProps;
declare const Bar: {
    (props: IProps & typeof defaultProps): JSX.Element;
    defaultProps: Required<Pick<IProps, TOptionalPropsKeys>>;
};
export default Bar;
