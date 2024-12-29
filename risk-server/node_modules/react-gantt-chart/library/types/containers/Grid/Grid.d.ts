import React from "react";
import { Task } from "../../types/public-types";
import { OptionalKeys } from "../../types/custom";
export declare type IProps = {
    tasks: Task[];
    dates: Date[];
    svgWidth: number;
    rowHeight: number;
    columnWidth: number;
    todayColor: string;
    rtl: boolean;
    gridRowStyle?: React.CSSProperties;
    gridRowLineStyle?: React.CSSProperties;
    gridTickStyle?: React.CSSProperties;
};
declare type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
declare type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;
export declare const defaultProps: TOptionalProps;
declare const Grid: {
    (props: IProps & typeof defaultProps): JSX.Element;
    defaultProps: Required<Pick<IProps, TOptionalPropsKeys>>;
};
export default Grid;
