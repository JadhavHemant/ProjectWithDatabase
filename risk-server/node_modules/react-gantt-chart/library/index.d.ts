/// <reference types="react" />
import React$1, { SyntheticEvent } from 'react';

declare type OptionalKeys<T extends object> = {
    [P in keyof T]: {} extends Pick<T, P> ? P : never;
}[keyof T];

type custom_d_OptionalKeys<T extends object> = OptionalKeys<T>;
declare namespace custom_d {
  export {
    custom_d_OptionalKeys as OptionalKeys,
  };
}

interface IProps$m {
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
    rootStyle?: React$1.CSSProperties;
}
declare type TOptionalPropsKeys$j = Exclude<OptionalKeys<IProps$m>, undefined>;
declare type TOptionalProps$j = Required<Pick<IProps$m, TOptionalPropsKeys$j>>;
declare const defaultProps$j: TOptionalProps$j;
declare const _default: React$1.MemoExoticComponent<{
    (props: IProps$m & Required<Pick<IProps$m, "rootStyle">>): JSX.Element;
    defaultProps: Required<Pick<IProps$m, "rootStyle">>;
}>;

interface IProps$l {
    scroll: number;
    onScroll: (event: SyntheticEvent<HTMLDivElement>) => void;
    rootStyle?: React$1.CSSProperties;
    bodyStyle?: React$1.CSSProperties;
}
declare type TOptionalPropsKeys$i = Exclude<OptionalKeys<IProps$l>, undefined>;
declare type TOptionalProps$i = Required<Pick<IProps$l, TOptionalPropsKeys$i>>;
declare const defaultProps$i: TOptionalProps$i;
declare const HorizontalScroll: {
    (props: IProps$l & typeof defaultProps$i): JSX.Element;
    defaultProps: Required<Pick<IProps$l, TOptionalPropsKeys$i>>;
};

declare enum ViewMode {
    QuarterDay = "Quarter Day",
    HalfDay = "Half Day",
    Day = "Day",
    /** ISO-8601 week */
    Week = "Week",
    Month = "Month"
}
declare type TaskType = "task" | "milestone" | "project";
interface Task {
    /**
     * By default all tasks shown by list index sequentially
     * So if you are going to use some other order or output multiple bars per row
     * You can define line number exactly and sequentially like so (0, 1, 2, 3, 3, 4, 5)
     */
    line?: number;
    id: string;
    type: TaskType;
    name: string;
    start: Date;
    end: Date;
    /**
     * From 0 to 100
     */
    progress: number;
    styles?: {
        backgroundColor?: string;
        backgroundSelectedColor?: string;
        progressColor?: string;
        progressSelectedColor?: string;
    };
    isDisabled?: boolean;
    project?: string;
    dependencies?: string[];
    hideChildren?: boolean;
}
interface EventOption {
    /**
     * Time step value for date changes.
     */
    timeStep?: number;
    /**
     * Invokes on bar select on unselect.
     */
    onSelect?: (task: Task, isSelected: boolean) => void;
    /**
     * Invokes on bar double click.
     */
    onDoubleClick?: (task: Task) => void;
    /**
     * Invokes on end and start time change. Chart undoes operation if method return false or error.
     */
    onDateChange?: (task: Task, children: Task[]) => void | boolean | Promise<void> | Promise<boolean>;
    /**
     * Invokes on progress change. Chart undoes operation if method return false or error.
     */
    onProgressChange?: (task: Task, children: Task[]) => void | boolean | Promise<void> | Promise<boolean>;
    /**
     * Invokes on delete selected task. Chart undoes operation if method return false or error.
     */
    onDelete?: (task: Task) => void | boolean | Promise<void> | Promise<boolean>;
    /**
     * Invokes on expander on task list
     */
    onExpanderClick?: (task: Task) => void;
}
interface DisplayOption {
    viewMode?: ViewMode;
    /**
     * Specifies the month name language. Able formats: ISO 639-2, Java Locale
     */
    locale?: string;
    rtl?: boolean;
}
interface StylingOption {
    headerHeight?: number;
    columnWidth?: number;
    listCellWidth?: string;
    rowHeight?: number;
    ganttHeight?: number;
    barCornerRadius?: number;
    handleWidth?: number;
    fontFamily?: string;
    fontSize?: string;
    /**
     * How many of row width can be taken by task.
     * From 0 to 100
     */
    barFill?: number;
    barProgressColor?: string;
    barProgressSelectedColor?: string;
    barBackgroundColor?: string;
    barBackgroundSelectedColor?: string;
    projectProgressColor?: string;
    projectProgressSelectedColor?: string;
    projectBackgroundColor?: string;
    projectBackgroundSelectedColor?: string;
    milestoneBackgroundColor?: string;
    milestoneBackgroundSelectedColor?: string;
    arrowColor?: string;
    arrowIndent?: number;
    todayColor?: string;
    TooltipContent?: React.FC<{
        task: Task;
        fontSize: string;
        fontFamily: string;
    }>;
}

type publicTypes_d_ViewMode = ViewMode;
declare const publicTypes_d_ViewMode: typeof ViewMode;
type publicTypes_d_TaskType = TaskType;
type publicTypes_d_Task = Task;
type publicTypes_d_EventOption = EventOption;
type publicTypes_d_DisplayOption = DisplayOption;
type publicTypes_d_StylingOption = StylingOption;
declare namespace publicTypes_d {
  export {
    publicTypes_d_ViewMode as ViewMode,
    publicTypes_d_TaskType as TaskType,
    publicTypes_d_Task as Task,
    publicTypes_d_EventOption as EventOption,
    publicTypes_d_DisplayOption as DisplayOption,
    publicTypes_d_StylingOption as StylingOption,
  };
}

interface BarTask extends Task {
    index: number;
    typeInternal: TaskTypeInternal;
    x1: number;
    x2: number;
    y: number;
    height: number;
    progressX: number;
    progressWidth: number;
    barCornerRadius: number;
    handleWidth: number;
    barChildren: BarTask[];
    styles: {
        backgroundColor: string;
        backgroundSelectedColor: string;
        progressColor: string;
        progressSelectedColor: string;
    };
}
declare type TaskTypeInternal = TaskType | "smalltask";

type barTask_d_BarTask = BarTask;
type barTask_d_TaskTypeInternal = TaskTypeInternal;
declare namespace barTask_d {
  export {
    barTask_d_BarTask as BarTask,
    barTask_d_TaskTypeInternal as TaskTypeInternal,
  };
}

declare type IProps$k = {
    task: BarTask;
    rtl: boolean;
    children: JSX.Element | string;
    arrowIndent: number;
    scrollX: number;
    scrollY: number;
    svgContainerHeight: number;
    svgContainerWidth: number;
    headerHeight: number;
    rowHeight: number;
    taskListWidth: number;
    multiBarRowMode?: boolean;
    rootStyle?: React$1.CSSProperties;
};
declare type TOptionalPropsKeys$h = Exclude<OptionalKeys<IProps$k>, undefined>;
declare type TOptionalProps$h = Required<Pick<IProps$k, TOptionalPropsKeys$h>>;
declare const defaultProps$h: TOptionalProps$h;
declare const Tooltip: {
    (props: IProps$k & typeof defaultProps$h): JSX.Element;
    defaultProps: Required<Pick<IProps$k, TOptionalPropsKeys$h>>;
};

interface IProps$j {
    scroll: number;
    onScroll: (event: SyntheticEvent<HTMLDivElement>) => void;
    rootStyle?: React$1.CSSProperties;
    bodyStyle?: React$1.CSSProperties;
}
declare type TOptionalPropsKeys$g = Exclude<OptionalKeys<IProps$j>, undefined>;
declare type TOptionalProps$g = Required<Pick<IProps$j, TOptionalPropsKeys$g>>;
declare const defaultProps$g: TOptionalProps$g;
declare const VerticalScroll: {
    (props: IProps$j & typeof defaultProps$g): JSX.Element;
    defaultProps: Required<Pick<IProps$j, TOptionalPropsKeys$g>>;
};

declare const index_d$4_HorizontalScroll: typeof HorizontalScroll;
declare const index_d$4_Tooltip: typeof Tooltip;
declare const index_d$4_VerticalScroll: typeof VerticalScroll;
declare namespace index_d$4 {
  export {
    _default as Arrow,
    defaultProps$j as arrowDefaultProps,
    IProps$m as IArrowProps,
    index_d$4_HorizontalScroll as HorizontalScroll,
    defaultProps$i as horizontalScrollDefaultProps,
    IProps$l as IHorizontalScrollProps,
    index_d$4_Tooltip as Tooltip,
    defaultProps$h as tooltipDefaultProps,
    IProps$k as ITooltipProps,
    index_d$4_VerticalScroll as VerticalScroll,
    defaultProps$g as verticalScrollDefaultProps,
    IProps$j as IVerticalScrollProps,
  };
}

declare type BarMoveAction = "progress" | "end" | "start" | "move";
declare type GanttContentMoveAction = "mouseenter" | "mouseleave" | "delete" | "dblclick" | "select" | "" | BarMoveAction;
declare type GanttEvent = {
    changedTask?: BarTask;
    originalSelectedTask?: BarTask;
    action: GanttContentMoveAction;
};

type ganttTaskActions_d_BarMoveAction = BarMoveAction;
type ganttTaskActions_d_GanttContentMoveAction = GanttContentMoveAction;
type ganttTaskActions_d_GanttEvent = GanttEvent;
declare namespace ganttTaskActions_d {
  export {
    ganttTaskActions_d_BarMoveAction as BarMoveAction,
    ganttTaskActions_d_GanttContentMoveAction as GanttContentMoveAction,
    ganttTaskActions_d_GanttEvent as GanttEvent,
  };
}

declare type IProps$i = {
    task: BarTask;
    taskHeight: number;
    isDateChangeable: boolean;
    isProgressChangeable: boolean;
    arrowIndent: number;
    isDelete: boolean;
    isSelected: boolean;
    rtl: boolean;
    onEventStart: (action: GanttContentMoveAction, selectedTask: BarTask, event?: React$1.MouseEvent | React$1.KeyboardEvent) => any;
    taskItemTextStyle?: React$1.CSSProperties;
    taskItemTextOutsideStyle?: React$1.CSSProperties;
};
declare type TOptionalPropsKeys$f = Exclude<OptionalKeys<IProps$i>, undefined>;
declare type TOptionalProps$f = Required<Pick<IProps$i, TOptionalPropsKeys$f>>;
declare const defaultProps$f: TOptionalProps$f;
declare const TaskItemOriginal: {
    (props: IProps$i & typeof defaultProps$f): JSX.Element;
    defaultProps: Required<Pick<IProps$i, TOptionalPropsKeys$f>>;
};

declare type IProps$h = Pick<IProps$i, "rtl" | "isDateChangeable" | "isProgressChangeable"> & {
    rootStyle?: React$1.CSSProperties;
    barDisplay?: JSX.Element;
    leftBarDateHandle?: JSX.Element;
    rightBarDateHandle?: JSX.Element;
    barProgressHandle?: JSX.Element;
    onMouseEnter?: React$1.MouseEventHandler<SVGGElement>;
    onMouseLeave?: React$1.MouseEventHandler<SVGGElement>;
};
declare type TOptionalPropsKeys$e = Exclude<OptionalKeys<IProps$h>, undefined>;
declare type TOptionalProps$e = Required<Pick<IProps$h, TOptionalPropsKeys$e>>;
declare const defaultProps$e: TOptionalProps$e;
declare const Bar: {
    (props: IProps$h & typeof defaultProps$e): JSX.Element;
    defaultProps: Required<Pick<IProps$h, TOptionalPropsKeys$e>>;
};

declare type IProps$g = {
    rootStyle?: React$1.CSSProperties;
} & Pick<IProps$i, "task" | "isDateChangeable" | "isProgressChangeable" | "onEventStart">;
declare type TOptionalPropsKeys$d = Exclude<OptionalKeys<IProps$g>, undefined>;
declare type TOptionalProps$d = Required<Pick<IProps$g, TOptionalPropsKeys$d>>;
declare const defaultProps$d: TOptionalProps$d;
declare const BarSmall: {
    (props: IProps$g & typeof defaultProps$d): JSX.Element;
    defaultProps: Required<Pick<IProps$g, "rootStyle">>;
};

declare type IProps$f = {
    rootStyle?: React$1.CSSProperties;
    backgroundStyle?: React$1.CSSProperties;
} & Pick<IProps$i, "task" | "isDateChangeable" | "isSelected" | "onEventStart">;
declare type TOptionalPropsKeys$c = Exclude<OptionalKeys<IProps$f>, undefined>;
declare type TOptionalProps$c = Required<Pick<IProps$f, TOptionalPropsKeys$c>>;
declare const defaultProps$c: TOptionalProps$c;
declare const MileStone: {
    (props: IProps$f & typeof defaultProps$c): JSX.Element;
    defaultProps: Required<Pick<IProps$f, TOptionalPropsKeys$c>>;
};

declare type IProps$e = Pick<IProps$i, "task"> & {
    rootStyle?: React$1.CSSProperties;
    backgroundStyle?: React$1.CSSProperties;
    progressStyle?: React$1.CSSProperties;
};
declare type TOptionalPropsKeys$b = Exclude<OptionalKeys<IProps$e>, undefined>;
declare type TOptionalProps$b = Required<Pick<IProps$e, TOptionalPropsKeys$b>>;
declare const defaultProps$b: TOptionalProps$b;
declare const Project: {
    (props: IProps$e & typeof defaultProps$b): JSX.Element;
    defaultProps: Required<Pick<IProps$e, TOptionalPropsKeys$b>>;
};

declare type IProps$d = {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    barCornerRadius?: number;
    onMouseDown?: (event: React$1.MouseEvent<SVGRectElement, MouseEvent>) => void;
    rootStyle?: React$1.CSSProperties;
};
declare type TOptionalPropsKeys$a = Exclude<OptionalKeys<IProps$d>, undefined>;
declare type TOptionalProps$a = Required<Pick<IProps$d, TOptionalPropsKeys$a>>;
declare const defaultProps$a: TOptionalProps$a;
declare const BarDateHandle: {
    (props: IProps$d & typeof defaultProps$a): JSX.Element;
    defaultProps: Required<Pick<IProps$d, TOptionalPropsKeys$a>>;
};

interface IProps$c {
    x?: number;
    y?: number;
    progressX?: number;
    progressWidth?: number;
    barCornerRadius?: number;
    onMouseDown?: (event: React$1.MouseEvent<SVGPolygonElement, MouseEvent>) => void;
    rootStyle?: React$1.CSSProperties;
    barStyle?: React$1.CSSProperties;
    progressStyle?: React$1.CSSProperties;
}
declare type TOptionalPropsKeys$9 = Exclude<OptionalKeys<IProps$c>, undefined>;
declare type TOptionalProps$9 = Required<Pick<IProps$c, TOptionalPropsKeys$9>>;
declare const defaultProps$9: TOptionalProps$9;
declare const BarDisplay: {
    (props: IProps$c & typeof defaultProps$9): JSX.Element;
    defaultProps: Required<Pick<IProps$c, TOptionalPropsKeys$9>>;
};

declare type IProps$b = {
    progressPoint?: string;
    onMouseDown?: (event: React$1.MouseEvent<SVGPolygonElement, MouseEvent>) => void;
    rootStyle?: React$1.CSSProperties;
};
declare type TOptionalPropsKeys$8 = Exclude<OptionalKeys<IProps$b>, undefined>;
declare type TOptionalProps$8 = Required<Pick<IProps$b, TOptionalPropsKeys$8>>;
declare const defaultProps$8: TOptionalProps$8;
declare const BarProgressHandle: {
    (props: IProps$b & typeof defaultProps$8): JSX.Element;
    defaultProps: Required<Pick<IProps$b, TOptionalPropsKeys$8>>;
};

interface IProps$a {
    task: BarTask;
    rtl: boolean;
    isDateChangeable: boolean;
    isProgressChangeable: boolean;
    onEventStart: (action: GanttContentMoveAction, selectedTask: BarTask, event?: React$1.MouseEvent | React$1.KeyboardEvent) => any;
}
declare const BarOriginal: (props: IProps$a) => JSX.Element;

interface IProps$9 {
    task: BarTask;
    rtl: boolean;
    isDateChangeable: boolean;
    isProgressChangeable: boolean;
    onEventStart: (action: GanttContentMoveAction, selectedTask: BarTask, event?: React$1.MouseEvent | React$1.KeyboardEvent) => any;
}
declare const BarNationalResources: (props: IProps$9) => JSX.Element;

declare type IProps$8 = {
    value: string;
    x1Line: number;
    y1Line: number;
    y2Line: number;
    xText: number;
    yText: number;
    rootStyle?: React$1.CSSProperties;
    lineStyle?: React$1.CSSProperties;
    textStyle?: React$1.CSSProperties;
};
declare type TOptionalPropsKeys$7 = Exclude<OptionalKeys<IProps$8>, undefined>;
declare type TOptionalProps$7 = Required<Pick<IProps$8, TOptionalPropsKeys$7>>;
declare const defaultProps$7: TOptionalProps$7;
declare const CalendarHeader: {
    (props: IProps$8 & typeof defaultProps$7): JSX.Element;
    defaultProps: Required<Pick<IProps$8, TOptionalPropsKeys$7>>;
};

interface DateSetup {
    dates: Date[];
    viewMode: ViewMode;
}

type dateSetup_d_DateSetup = DateSetup;
declare namespace dateSetup_d {
  export {
    dateSetup_d_DateSetup as DateSetup,
  };
}

declare type IProps$7 = {
    dateSetup: DateSetup;
    locale: string;
    rtl: boolean;
    headerHeight: number;
    columnWidth: number;
    rootStyle?: React$1.CSSProperties;
    headerStyle?: React$1.CSSProperties;
    bottomTextStyle?: React$1.CSSProperties;
    calenderHeaderRootStyle?: typeof defaultProps$7.rootStyle;
    calenderHeaderLineStyle?: typeof defaultProps$7.lineStyle;
    calenderHeaderTextStyle?: typeof defaultProps$7.textStyle;
};
declare type TOptionalPropsKeys$6 = Exclude<OptionalKeys<IProps$7>, undefined>;
declare type TOptionalProps$6 = Required<Pick<IProps$7, TOptionalPropsKeys$6>>;
declare const defaultProps$6: TOptionalProps$6;
declare const Calendar: {
    (props: IProps$7 & typeof defaultProps$6): JSX.Element;
    defaultProps: Required<Pick<IProps$7, TOptionalPropsKeys$6>>;
};

declare type IProps$6 = {
    tasks: Task[];
    dates: Date[];
    svgWidth: number;
    rowHeight: number;
    columnWidth: number;
    todayColor: string;
    rtl: boolean;
    gridRowStyle?: React$1.CSSProperties;
    gridRowLineStyle?: React$1.CSSProperties;
    gridTickStyle?: React$1.CSSProperties;
};
declare type TOptionalPropsKeys$5 = Exclude<OptionalKeys<IProps$6>, undefined>;
declare type TOptionalProps$5 = Required<Pick<IProps$6, TOptionalPropsKeys$5>>;
declare const defaultProps$5: TOptionalProps$5;
declare const Grid: {
    (props: IProps$6 & typeof defaultProps$5): JSX.Element;
    defaultProps: Required<Pick<IProps$6, TOptionalPropsKeys$5>>;
};

declare type IProps$5 = {
    task: BarTask;
    arrowIndent: number;
    taskHeight: number;
    isProgressChangeable: boolean;
    isDateChangeable: boolean;
    isDelete: boolean;
    isSelected: boolean;
    rtl: boolean;
    onEventStart: (action: GanttContentMoveAction, selectedTask: BarTask, event?: React$1.MouseEvent | React$1.KeyboardEvent) => any;
    taskItemTextStyle?: React$1.CSSProperties;
    taskItemTextOutsideStyle?: React$1.CSSProperties;
};
declare type TOptionalPropsKeys$4 = Exclude<OptionalKeys<IProps$5>, undefined>;
declare type TOptionalProps$4 = Required<Pick<IProps$5, TOptionalPropsKeys$4>>;
declare const defaultProps$4: TOptionalProps$4;
declare const TaskItemNationalResources: {
    (props: IProps$5 & typeof defaultProps$4): JSX.Element;
    defaultProps: Required<Pick<IProps$5, TOptionalPropsKeys$4>>;
};

interface IProps$4 {
    columns?: (JSX.Element | string)[];
    rootStyle?: React$1.CSSProperties;
    headerStyle?: React$1.CSSProperties;
    columnStyle?: React$1.CSSProperties;
    columnSeparatorStyle?: React$1.CSSProperties;
}
declare type TOptionalPropsKeys$3 = Exclude<OptionalKeys<IProps$4>, undefined>;
declare type TOptionalProps$3 = Required<Pick<IProps$4, TOptionalPropsKeys$3>>;
declare const defaultProps$3: TOptionalProps$3;
declare const TaskListHeader: {
    (props: IProps$4 & typeof defaultProps$3): JSX.Element;
    defaultProps: Required<Pick<IProps$4, TOptionalPropsKeys$3>>;
};

interface IProps$3 {
    tasks: Task[];
    locale: string;
    expanderSymbolOpen?: JSX.Element | string;
    expanderSymbolClose?: JSX.Element | string;
    expanderSymbolEmpty?: JSX.Element | string;
    onExpanderClick: (task: Task) => void;
    showStartDateColumn?: boolean;
    showEndDateColumn?: boolean;
    rootStyle?: React$1.CSSProperties;
    tableRowStyle?: React$1.CSSProperties;
    tableRowStyleProject?: React$1.CSSProperties;
    tableCellStyle?: React$1.CSSProperties;
    tableCellStyleProject?: React$1.CSSProperties;
    tableCellStyleTask?: React$1.CSSProperties;
    tableCellStyleMileStone?: React$1.CSSProperties;
    tableCellWrapperStyle?: React$1.CSSProperties;
    expanderStyle?: React$1.CSSProperties;
    expanderEmptyStyle?: React$1.CSSProperties;
}
declare type TOptionalPropsKeys$2 = Exclude<OptionalKeys<IProps$3>, undefined>;
declare type TOptionalProps$2 = Required<Pick<IProps$3, TOptionalPropsKeys$2>>;
declare const defaultProps$2: TOptionalProps$2;
declare const TaskListTable: {
    (props: IProps$3 & typeof defaultProps$2): JSX.Element;
    defaultProps: Required<Pick<IProps$3, TOptionalPropsKeys$2>>;
};

declare type IProps$2 = {
    scrollY: number;
    TaskListHeader: typeof TaskListHeader;
    TaskListTable: typeof TaskListTable;
    taskListHeaderProps: IProps$4;
    taskListTableProps: IProps$3;
    taskListTableWrapperStyles?: React$1.CSSProperties;
    taskListRef: React$1.RefObject<HTMLDivElement>;
};
declare const TaskList: (props: IProps$2) => JSX.Element;

declare const index_d$3_Bar: typeof Bar;
declare const index_d$3_BarSmall: typeof BarSmall;
declare const index_d$3_MileStone: typeof MileStone;
declare const index_d$3_Project: typeof Project;
declare const index_d$3_BarDateHandle: typeof BarDateHandle;
declare const index_d$3_BarDisplay: typeof BarDisplay;
declare const index_d$3_BarProgressHandle: typeof BarProgressHandle;
declare const index_d$3_BarOriginal: typeof BarOriginal;
declare const index_d$3_BarNationalResources: typeof BarNationalResources;
declare const index_d$3_Calendar: typeof Calendar;
declare const index_d$3_CalendarHeader: typeof CalendarHeader;
declare const index_d$3_Grid: typeof Grid;
declare const index_d$3_TaskItemNationalResources: typeof TaskItemNationalResources;
declare const index_d$3_TaskItemOriginal: typeof TaskItemOriginal;
declare const index_d$3_TaskList: typeof TaskList;
declare const index_d$3_TaskListHeader: typeof TaskListHeader;
declare const index_d$3_TaskListTable: typeof TaskListTable;
declare namespace index_d$3 {
  export {
    index_d$3_Bar as Bar,
    defaultProps$e as barDefaultProps,
    IProps$h as IBarProps,
    index_d$3_BarSmall as BarSmall,
    defaultProps$d as barSmallDefaultProps,
    IProps$g as IBarSmallProps,
    index_d$3_MileStone as MileStone,
    defaultProps$c as mileStoneDefaultProps,
    IProps$f as IMileStoneProps,
    index_d$3_Project as Project,
    defaultProps$b as projectDefaultProps,
    IProps$e as IProjectProps,
    index_d$3_BarDateHandle as BarDateHandle,
    defaultProps$a as barDateHandleDefaultProps,
    IProps$d as IBarDateHandleProps,
    index_d$3_BarDisplay as BarDisplay,
    defaultProps$9 as barDisplayDefaultProps,
    IProps$c as IBarDisplayProps,
    index_d$3_BarProgressHandle as BarProgressHandle,
    defaultProps$8 as barProgressHandleDefaultProps,
    IProps$b as IBarProgressHandleProps,
    index_d$3_BarOriginal as BarOriginal,
    IProps$a as IBarOriginalProps,
    index_d$3_BarNationalResources as BarNationalResources,
    IProps$9 as IBarNationalResourcesProps,
    index_d$3_Calendar as Calendar,
    defaultProps$6 as calendarDefaultProps,
    IProps$7 as ICalendarProps,
    index_d$3_CalendarHeader as CalendarHeader,
    defaultProps$7 as calendarHeaderDefaultProps,
    IProps$8 as ICalendarHeaderProps,
    index_d$3_Grid as Grid,
    IProps$6 as IGridProps,
    index_d$3_TaskItemNationalResources as TaskItemNationalResources,
    defaultProps$4 as taskItemNationalResourcesDefaultProps,
    IProps$5 as ITaskItemNationalResourcesProps,
    index_d$3_TaskItemOriginal as TaskItemOriginal,
    defaultProps$f as taskItemOriginalDefaultProps,
    IProps$i as ITaskItemOriginalProps,
    index_d$3_TaskList as TaskList,
    IProps$2 as ITaskListProps,
    index_d$3_TaskListHeader as TaskListHeader,
    defaultProps$3 as taskListHeaderDefaultProps,
    IProps$4 as ITaskListHeaderProps,
    index_d$3_TaskListTable as TaskListTable,
    defaultProps$2 as taskListTableDefaultProps,
    IProps$3 as ITaskListTableHeaderProps,
  };
}

type index_d$2_BarTask = BarTask;
type index_d$2_TaskTypeInternal = TaskTypeInternal;
type index_d$2_OptionalKeys<T extends object> = OptionalKeys<T>;
type index_d$2_DateSetup = DateSetup;
type index_d$2_BarMoveAction = BarMoveAction;
type index_d$2_GanttContentMoveAction = GanttContentMoveAction;
type index_d$2_GanttEvent = GanttEvent;
type index_d$2_ViewMode = ViewMode;
declare const index_d$2_ViewMode: typeof ViewMode;
type index_d$2_TaskType = TaskType;
type index_d$2_Task = Task;
type index_d$2_EventOption = EventOption;
type index_d$2_DisplayOption = DisplayOption;
type index_d$2_StylingOption = StylingOption;
declare namespace index_d$2 {
  export {
    barTask_d as barTask,
    custom_d as custom,
    dateSetup_d as dateSetup,
    ganttTaskActions_d as ganttTaskActions,
    publicTypes_d as publicTypes,
    index_d$2_BarTask as BarTask,
    index_d$2_TaskTypeInternal as TaskTypeInternal,
    index_d$2_OptionalKeys as OptionalKeys,
    index_d$2_DateSetup as DateSetup,
    index_d$2_BarMoveAction as BarMoveAction,
    index_d$2_GanttContentMoveAction as GanttContentMoveAction,
    index_d$2_GanttEvent as GanttEvent,
    index_d$2_ViewMode as ViewMode,
    index_d$2_TaskType as TaskType,
    index_d$2_Task as Task,
    index_d$2_EventOption as EventOption,
    index_d$2_DisplayOption as DisplayOption,
    index_d$2_StylingOption as StylingOption,
  };
}

interface IConvertToBarTasksArgs {
    tasks: Task[];
    dates: Date[];
    rtl: boolean;
    multiBarRowMode?: boolean;
    columnWidth: number;
    rowHeight: number;
    taskHeight: number;
    barCornerRadius: number;
    handleWidth: number;
    barProgressColor: string;
    barProgressSelectedColor: string;
    barBackgroundColor: string;
    barBackgroundSelectedColor: string;
    projectProgressColor: string;
    projectProgressSelectedColor: string;
    projectBackgroundColor: string;
    projectBackgroundSelectedColor: string;
    milestoneBackgroundColor: string;
    milestoneBackgroundSelectedColor: string;
}
declare type IConvertToBarTaskArgs = {
    task: Task;
    taskIndex: number;
    dateDelta: number;
} & Exclude<IConvertToBarTasksArgs, "tasks">;
declare const convertToBarTasks: (args: IConvertToBarTasksArgs, conversion?: (args: IConvertToBarTaskArgs) => BarTask) => BarTask[];
declare const convertToBarTask: (args: IConvertToBarTaskArgs) => BarTask;
declare const convertToBarTaskNR: (args: IConvertToBarTaskArgs) => BarTask;
declare const convertToBar: (args: IConvertToBarTaskArgs) => BarTask;
declare const convertToProject: (args: IConvertToBarTaskArgs) => BarTask;
declare const convertToMilestone: (args: IConvertToBarTaskArgs) => BarTask;
declare const progressWithByParams: (taskX1: number, taskX2: number, progress: number, rtl: boolean) => number[];
declare const progressByProgressWidth: (progressWidth: number, barTask: BarTask) => number;
declare const getProgressPoint: (progressX: number, taskY: number, taskHeight: number) => string;
/**
 * Method handles event in real time(mousemove) and on finish(mouseup)
 */
declare const handleTaskBySVGMouseEvent: (svgX: number, action: BarMoveAction, selectedTask: BarTask, xStep: number, timeStep: number, initEventX1Delta: number, rtl: boolean) => {
    isChanged: boolean;
    changedTask: BarTask;
};

type barHelper_d_IConvertToBarTasksArgs = IConvertToBarTasksArgs;
type barHelper_d_IConvertToBarTaskArgs = IConvertToBarTaskArgs;
declare const barHelper_d_convertToBarTasks: typeof convertToBarTasks;
declare const barHelper_d_convertToBarTask: typeof convertToBarTask;
declare const barHelper_d_convertToBarTaskNR: typeof convertToBarTaskNR;
declare const barHelper_d_convertToBar: typeof convertToBar;
declare const barHelper_d_convertToProject: typeof convertToProject;
declare const barHelper_d_convertToMilestone: typeof convertToMilestone;
declare const barHelper_d_progressWithByParams: typeof progressWithByParams;
declare const barHelper_d_progressByProgressWidth: typeof progressByProgressWidth;
declare const barHelper_d_getProgressPoint: typeof getProgressPoint;
declare const barHelper_d_handleTaskBySVGMouseEvent: typeof handleTaskBySVGMouseEvent;
declare namespace barHelper_d {
  export {
    barHelper_d_IConvertToBarTasksArgs as IConvertToBarTasksArgs,
    barHelper_d_IConvertToBarTaskArgs as IConvertToBarTaskArgs,
    barHelper_d_convertToBarTasks as convertToBarTasks,
    barHelper_d_convertToBarTask as convertToBarTask,
    barHelper_d_convertToBarTaskNR as convertToBarTaskNR,
    barHelper_d_convertToBar as convertToBar,
    barHelper_d_convertToProject as convertToProject,
    barHelper_d_convertToMilestone as convertToMilestone,
    barHelper_d_progressWithByParams as progressWithByParams,
    barHelper_d_progressByProgressWidth as progressByProgressWidth,
    barHelper_d_getProgressPoint as getProgressPoint,
    barHelper_d_handleTaskBySVGMouseEvent as handleTaskBySVGMouseEvent,
  };
}

declare type DateTimeFormatOptions = Intl.DateTimeFormatOptions;
declare type DateTimeFormat = Intl.DateTimeFormat;
declare type DateHelperScales = "year" | "month" | "day" | "hour" | "minute" | "second" | "millisecond";
declare const getCachedDateTimeFormat: (locString: string | string[], opts?: DateTimeFormatOptions) => DateTimeFormat;
declare const addToDate: (date: Date, quantity: number, scale: DateHelperScales) => Date;
declare const startOfDate: (date: Date, scale: DateHelperScales) => Date;
declare const ganttDateRange: (tasks: Task[], viewMode: ViewMode) => Date[];
declare const seedDates: (startDate: Date, endDate: Date, viewMode: ViewMode) => Date[];
declare const getLocaleMonth: (date: Date, locale: string) => string;
declare const getWeekNumberISO8601: (date: Date) => string;
declare const getDaysInMonth: (month: number, year: number) => number;

declare const dateHelper_d_getCachedDateTimeFormat: typeof getCachedDateTimeFormat;
declare const dateHelper_d_addToDate: typeof addToDate;
declare const dateHelper_d_startOfDate: typeof startOfDate;
declare const dateHelper_d_ganttDateRange: typeof ganttDateRange;
declare const dateHelper_d_seedDates: typeof seedDates;
declare const dateHelper_d_getLocaleMonth: typeof getLocaleMonth;
declare const dateHelper_d_getWeekNumberISO8601: typeof getWeekNumberISO8601;
declare const dateHelper_d_getDaysInMonth: typeof getDaysInMonth;
declare namespace dateHelper_d {
  export {
    dateHelper_d_getCachedDateTimeFormat as getCachedDateTimeFormat,
    dateHelper_d_addToDate as addToDate,
    dateHelper_d_startOfDate as startOfDate,
    dateHelper_d_ganttDateRange as ganttDateRange,
    dateHelper_d_seedDates as seedDates,
    dateHelper_d_getLocaleMonth as getLocaleMonth,
    dateHelper_d_getWeekNumberISO8601 as getWeekNumberISO8601,
    dateHelper_d_getDaysInMonth as getDaysInMonth,
  };
}

declare function isKeyboardEvent(event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent): event is React.KeyboardEvent;
declare function isMouseEvent(event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent): event is React.MouseEvent;
declare function isBarTask(task: Task | BarTask): task is BarTask;
declare function removeHiddenTasks(tasks: Task[]): Task[];

declare const otherHelper_d_isKeyboardEvent: typeof isKeyboardEvent;
declare const otherHelper_d_isMouseEvent: typeof isMouseEvent;
declare const otherHelper_d_isBarTask: typeof isBarTask;
declare const otherHelper_d_removeHiddenTasks: typeof removeHiddenTasks;
declare namespace otherHelper_d {
  export {
    otherHelper_d_isKeyboardEvent as isKeyboardEvent,
    otherHelper_d_isMouseEvent as isMouseEvent,
    otherHelper_d_isBarTask as isBarTask,
    otherHelper_d_removeHiddenTasks as removeHiddenTasks,
  };
}

type index_d$1_IConvertToBarTasksArgs = IConvertToBarTasksArgs;
type index_d$1_IConvertToBarTaskArgs = IConvertToBarTaskArgs;
declare const index_d$1_convertToBarTasks: typeof convertToBarTasks;
declare const index_d$1_convertToBarTask: typeof convertToBarTask;
declare const index_d$1_convertToBarTaskNR: typeof convertToBarTaskNR;
declare const index_d$1_convertToBar: typeof convertToBar;
declare const index_d$1_convertToProject: typeof convertToProject;
declare const index_d$1_convertToMilestone: typeof convertToMilestone;
declare const index_d$1_progressWithByParams: typeof progressWithByParams;
declare const index_d$1_progressByProgressWidth: typeof progressByProgressWidth;
declare const index_d$1_getProgressPoint: typeof getProgressPoint;
declare const index_d$1_handleTaskBySVGMouseEvent: typeof handleTaskBySVGMouseEvent;
declare const index_d$1_getCachedDateTimeFormat: typeof getCachedDateTimeFormat;
declare const index_d$1_addToDate: typeof addToDate;
declare const index_d$1_startOfDate: typeof startOfDate;
declare const index_d$1_ganttDateRange: typeof ganttDateRange;
declare const index_d$1_seedDates: typeof seedDates;
declare const index_d$1_getLocaleMonth: typeof getLocaleMonth;
declare const index_d$1_getWeekNumberISO8601: typeof getWeekNumberISO8601;
declare const index_d$1_getDaysInMonth: typeof getDaysInMonth;
declare const index_d$1_isKeyboardEvent: typeof isKeyboardEvent;
declare const index_d$1_isMouseEvent: typeof isMouseEvent;
declare const index_d$1_isBarTask: typeof isBarTask;
declare const index_d$1_removeHiddenTasks: typeof removeHiddenTasks;
declare namespace index_d$1 {
  export {
    barHelper_d as barHelper,
    dateHelper_d as dateHelper,
    otherHelper_d as otherHelper,
    index_d$1_IConvertToBarTasksArgs as IConvertToBarTasksArgs,
    index_d$1_IConvertToBarTaskArgs as IConvertToBarTaskArgs,
    index_d$1_convertToBarTasks as convertToBarTasks,
    index_d$1_convertToBarTask as convertToBarTask,
    index_d$1_convertToBarTaskNR as convertToBarTaskNR,
    index_d$1_convertToBar as convertToBar,
    index_d$1_convertToProject as convertToProject,
    index_d$1_convertToMilestone as convertToMilestone,
    index_d$1_progressWithByParams as progressWithByParams,
    index_d$1_progressByProgressWidth as progressByProgressWidth,
    index_d$1_getProgressPoint as getProgressPoint,
    index_d$1_handleTaskBySVGMouseEvent as handleTaskBySVGMouseEvent,
    index_d$1_getCachedDateTimeFormat as getCachedDateTimeFormat,
    index_d$1_addToDate as addToDate,
    index_d$1_startOfDate as startOfDate,
    index_d$1_ganttDateRange as ganttDateRange,
    index_d$1_seedDates as seedDates,
    index_d$1_getLocaleMonth as getLocaleMonth,
    index_d$1_getWeekNumberISO8601 as getWeekNumberISO8601,
    index_d$1_getDaysInMonth as getDaysInMonth,
    index_d$1_isKeyboardEvent as isKeyboardEvent,
    index_d$1_isMouseEvent as isMouseEvent,
    index_d$1_isBarTask as isBarTask,
    index_d$1_removeHiddenTasks as removeHiddenTasks,
  };
}

declare type IProps$1 = Partial<EventOption> & Partial<DisplayOption> & Partial<StylingOption> & {
    tasks: Task[];
    bodyStyle?: React$1.CSSProperties;
};
declare type TOptionalPropsKeys$1 = Exclude<OptionalKeys<IProps$1>, undefined>;
declare type TOptionalProps$1 = Required<Pick<IProps$1, TOptionalPropsKeys$1>>;
declare const defaultProps$1: TOptionalProps$1;
declare const GanttOriginal: {
    (props: IProps$1 & typeof defaultProps$1): JSX.Element;
    defaultProps: Required<Pick<IProps$1, TOptionalPropsKeys$1>>;
};

declare type IProps = Partial<EventOption> & Partial<DisplayOption> & Partial<StylingOption> & {
    tasks: Task[];
    multiBarRowMode?: boolean;
    bodyStyle?: React$1.CSSProperties;
};
declare type TOptionalPropsKeys = Exclude<OptionalKeys<IProps>, undefined>;
declare type TOptionalProps = Required<Pick<IProps, TOptionalPropsKeys>>;
declare const defaultProps: TOptionalProps;
declare const GanttNationalResources: {
    (props: IProps & typeof defaultProps): JSX.Element;
    defaultProps: Required<Pick<IProps, TOptionalPropsKeys>>;
};

declare const index_d_GanttOriginal: typeof GanttOriginal;
declare const index_d_GanttNationalResources: typeof GanttNationalResources;
declare namespace index_d {
  export {
    index_d_GanttOriginal as GanttOriginal,
    IProps$1 as IGanttOriginalProps,
    defaultProps$1 as ganttOriginalDefaultProps,
    index_d_GanttNationalResources as GanttNationalResources,
    IProps as IGanttNationalResources,
    defaultProps as ganttNationalResourcesDefaultProps,
  };
}

export { _default as Arrow, Bar, BarDateHandle, BarDisplay, BarMoveAction, BarNationalResources, BarOriginal, BarProgressHandle, BarSmall, BarTask, Calendar, CalendarHeader, DateSetup, DisplayOption, EventOption, GanttContentMoveAction, GanttEvent, GanttNationalResources, GanttOriginal, Grid, HorizontalScroll, IProps$m as IArrowProps, IProps$d as IBarDateHandleProps, IProps$c as IBarDisplayProps, IProps$9 as IBarNationalResourcesProps, IProps$a as IBarOriginalProps, IProps$b as IBarProgressHandleProps, IProps$h as IBarProps, IProps$g as IBarSmallProps, IProps$8 as ICalendarHeaderProps, IProps$7 as ICalendarProps, IConvertToBarTaskArgs, IConvertToBarTasksArgs, IProps as IGanttNationalResources, IProps$1 as IGanttOriginalProps, IProps$6 as IGridProps, IProps$l as IHorizontalScrollProps, IProps$f as IMileStoneProps, IProps$e as IProjectProps, IProps$5 as ITaskItemNationalResourcesProps, IProps$i as ITaskItemOriginalProps, IProps$4 as ITaskListHeaderProps, IProps$2 as ITaskListProps, IProps$3 as ITaskListTableHeaderProps, IProps$k as ITooltipProps, IProps$j as IVerticalScrollProps, MileStone, OptionalKeys, Project, StylingOption, Task, TaskItemNationalResources, TaskItemOriginal, TaskList, TaskListHeader, TaskListTable, TaskType, TaskTypeInternal, Tooltip, VerticalScroll, ViewMode, addToDate, defaultProps$j as arrowDefaultProps, defaultProps$a as barDateHandleDefaultProps, defaultProps$e as barDefaultProps, defaultProps$9 as barDisplayDefaultProps, barHelper_d as barHelper, defaultProps$8 as barProgressHandleDefaultProps, defaultProps$d as barSmallDefaultProps, barTask_d as barTask, defaultProps$6 as calendarDefaultProps, defaultProps$7 as calendarHeaderDefaultProps, index_d$4 as components, index_d$3 as containers, convertToBar, convertToBarTask, convertToBarTaskNR, convertToBarTasks, convertToMilestone, convertToProject, custom_d as custom, dateHelper_d as dateHelper, dateSetup_d as dateSetup, index_d as examples, ganttDateRange, defaultProps as ganttNationalResourcesDefaultProps, defaultProps$1 as ganttOriginalDefaultProps, ganttTaskActions_d as ganttTaskActions, getCachedDateTimeFormat, getDaysInMonth, getLocaleMonth, getProgressPoint, getWeekNumberISO8601, handleTaskBySVGMouseEvent, index_d$1 as helpers, defaultProps$i as horizontalScrollDefaultProps, isBarTask, isKeyboardEvent, isMouseEvent, defaultProps$c as mileStoneDefaultProps, otherHelper_d as otherHelper, progressByProgressWidth, progressWithByParams, defaultProps$b as projectDefaultProps, publicTypes_d as publicTypes, removeHiddenTasks, seedDates, startOfDate, defaultProps$4 as taskItemNationalResourcesDefaultProps, defaultProps$f as taskItemOriginalDefaultProps, defaultProps$3 as taskListHeaderDefaultProps, defaultProps$2 as taskListTableDefaultProps, defaultProps$h as tooltipDefaultProps, index_d$2 as types, defaultProps$g as verticalScrollDefaultProps };
