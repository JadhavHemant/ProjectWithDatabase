import React from "react";
import { OptionalKeys } from "../types/custom";
export interface IProps {
    taskFromIndex: number;
    taskFromX1: number;
    taskFromX2: number;
    taskFromY: number;
    taskToIndex: number;
    taskToX1: number;
    taskToX2: number;
    taskToY: number;
    rowHeight: number;
    taskHeight: number;
    arrowIndent: number;
    rtl: boolean;
    rootStyle?: React.CSSProperties;
}
declare type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
declare type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;
export declare const defaultProps: TOptionalProps;
declare const _default: React.MemoExoticComponent<{
    (props: IProps & Required<Pick<IProps, "rootStyle">>): JSX.Element;
    defaultProps: Required<Pick<IProps, "rootStyle">>;
}>;
export default _default;
