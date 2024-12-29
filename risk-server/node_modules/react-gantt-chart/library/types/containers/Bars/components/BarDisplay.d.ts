import React from "react";
import { OptionalKeys } from "../../../types/custom";
export interface IProps {
    x?: number;
    y?: number;
    progressX?: number;
    progressWidth?: number;
    barCornerRadius?: number;
    onMouseDown?: (event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => void;
    rootStyle?: React.CSSProperties;
    barStyle?: React.CSSProperties;
    progressStyle?: React.CSSProperties;
}
declare type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
declare type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;
export declare const defaultProps: TOptionalProps;
declare const BarDisplay: {
    (props: IProps & typeof defaultProps): JSX.Element;
    defaultProps: Required<Pick<IProps, TOptionalPropsKeys>>;
};
export default BarDisplay;
