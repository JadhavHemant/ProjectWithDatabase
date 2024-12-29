import React from "react";
import { OptionalKeys } from "../../../types/custom";
export interface IProps {
    columns?: (JSX.Element | string)[];
    rootStyle?: React.CSSProperties;
    headerStyle?: React.CSSProperties;
    columnStyle?: React.CSSProperties;
    columnSeparatorStyle?: React.CSSProperties;
}
declare type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
declare type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;
export declare const defaultProps: TOptionalProps;
declare const TaskListHeader: {
    (props: IProps & typeof defaultProps): JSX.Element;
    defaultProps: Required<Pick<IProps, TOptionalPropsKeys>>;
};
export default TaskListHeader;
