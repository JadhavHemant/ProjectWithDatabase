import React from "react";
import { IProps as TaskItemProps } from "../TaskItem/examples/TaskItemOriginal";
import { OptionalKeys } from "../../types/custom";
export declare type IProps = {
    rootStyle?: React.CSSProperties;
    backgroundStyle?: React.CSSProperties;
} & Pick<TaskItemProps, "task" | "isDateChangeable" | "isSelected" | "onEventStart">;
declare type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
declare type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;
export declare const defaultProps: TOptionalProps;
declare const MileStone: {
    (props: IProps & typeof defaultProps): JSX.Element;
    defaultProps: Required<Pick<IProps, TOptionalPropsKeys>>;
};
export default MileStone;
