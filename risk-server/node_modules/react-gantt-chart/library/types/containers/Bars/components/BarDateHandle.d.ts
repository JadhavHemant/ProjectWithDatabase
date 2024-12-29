import React from "react";
import { OptionalKeys } from "../../../types/custom";
export declare type IProps = {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    barCornerRadius?: number;
    onMouseDown?: (event: React.MouseEvent<SVGRectElement, MouseEvent>) => void;
    rootStyle?: React.CSSProperties;
};
declare type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
declare type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;
export declare const defaultProps: TOptionalProps;
declare const BarDateHandle: {
    (props: IProps & typeof defaultProps): JSX.Element;
    defaultProps: Required<Pick<IProps, TOptionalPropsKeys>>;
};
export default BarDateHandle;
