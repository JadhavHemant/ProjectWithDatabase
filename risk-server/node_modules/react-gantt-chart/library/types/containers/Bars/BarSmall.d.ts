import React from "react";
import { IProps as TaskItemProps } from "../TaskItem/examples/TaskItemOriginal";
import { OptionalKeys } from "../../types/custom";
export declare type IProps = {
    rootStyle?: React.CSSProperties;
} & Pick<TaskItemProps, "task" | "isDateChangeable" | "isProgressChangeable" | "onEventStart">;
declare type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
declare type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;
export declare const defaultProps: TOptionalProps;
declare const BarSmall: {
    (props: IProps & typeof defaultProps): JSX.Element;
    defaultProps: Required<Pick<IProps, "rootStyle">>;
};
export default BarSmall;
