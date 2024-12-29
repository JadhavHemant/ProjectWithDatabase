import React from "react";
import { OptionalKeys } from "../../../types/custom";
export declare type IProps = {
    progressPoint?: string;
    onMouseDown?: (event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => void;
    rootStyle?: React.CSSProperties;
};
declare type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
declare type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;
export declare const defaultProps: TOptionalProps;
declare const BarProgressHandle: {
    (props: IProps & typeof defaultProps): JSX.Element;
    defaultProps: Required<Pick<IProps, TOptionalPropsKeys>>;
};
export default BarProgressHandle;
