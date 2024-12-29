import React, { SyntheticEvent } from "react";
import { OptionalKeys } from "../types/custom";
export interface IProps {
    scroll: number;
    onScroll: (event: SyntheticEvent<HTMLDivElement>) => void;
    rootStyle?: React.CSSProperties;
    bodyStyle?: React.CSSProperties;
}
declare type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
declare type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;
export declare const defaultProps: TOptionalProps;
declare const HorizontalScroll: {
    (props: IProps & typeof defaultProps): JSX.Element;
    defaultProps: Required<Pick<IProps, TOptionalPropsKeys>>;
};
export default HorizontalScroll;
