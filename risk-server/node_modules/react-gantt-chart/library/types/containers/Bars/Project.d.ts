import React from "react";
import { IProps as TaskItemProps } from "../TaskItem/examples/TaskItemOriginal";
import { OptionalKeys } from "../../types/custom";
export declare type IProps = Pick<TaskItemProps, "task"> & {
    rootStyle?: React.CSSProperties;
    backgroundStyle?: React.CSSProperties;
    progressStyle?: React.CSSProperties;
};
declare type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
declare type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;
export declare const defaultProps: TOptionalProps;
declare const Project: {
    (props: IProps & typeof defaultProps): JSX.Element;
    defaultProps: Required<Pick<IProps, TOptionalPropsKeys>>;
};
export default Project;
