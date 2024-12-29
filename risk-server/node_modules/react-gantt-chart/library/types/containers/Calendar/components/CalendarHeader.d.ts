import React from "react";
import { OptionalKeys } from "../../../types/custom";
export declare type IProps = {
    value: string;
    x1Line: number;
    y1Line: number;
    y2Line: number;
    xText: number;
    yText: number;
    rootStyle?: React.CSSProperties;
    lineStyle?: React.CSSProperties;
    textStyle?: React.CSSProperties;
};
declare type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
declare type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;
export declare const defaultProps: TOptionalProps;
declare const CalendarHeader: {
    (props: IProps & typeof defaultProps): JSX.Element;
    defaultProps: Required<Pick<IProps, TOptionalPropsKeys>>;
};
export default CalendarHeader;
