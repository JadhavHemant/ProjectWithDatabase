import React from "react";
import { defaultProps as calendarHeaderDefaultProps } from "./components/CalendarHeader";
import { DateSetup } from "../../types/date-setup";
import { OptionalKeys } from "../../types/custom";
export declare type IProps = {
    dateSetup: DateSetup;
    locale: string;
    rtl: boolean;
    headerHeight: number;
    columnWidth: number;
    rootStyle?: React.CSSProperties;
    headerStyle?: React.CSSProperties;
    bottomTextStyle?: React.CSSProperties;
    calenderHeaderRootStyle?: typeof calendarHeaderDefaultProps.rootStyle;
    calenderHeaderLineStyle?: typeof calendarHeaderDefaultProps.lineStyle;
    calenderHeaderTextStyle?: typeof calendarHeaderDefaultProps.textStyle;
};
declare type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
declare type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;
export declare const defaultProps: TOptionalProps;
declare const Calendar: {
    (props: IProps & typeof defaultProps): JSX.Element;
    defaultProps: Required<Pick<IProps, TOptionalPropsKeys>>;
};
export default Calendar;
