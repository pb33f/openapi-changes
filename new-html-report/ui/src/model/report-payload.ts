/**
 * ReportPayload is the versioned contract between Go bridge and TS frontend.
 * Types mirror Go structs in new-html-report/generator.go exactly.
 */

/** Matches Go GraphResponse from cowboy-components */
export interface GraphResponse {
    nodes: Node[];
    edges: Edge[];
    changes?: Change[];
    nodeChangeTree?: Node;
    graphMap?: { [key: number]: string };
    stripped?: boolean;
    strippedCount?: number;
}

export interface Node {
    id: string;
    idHash: string;
    nodePath: string;
    parentId: string;
    hash?: string;
    x?: number;
    y?: number;
    width: number;
    height: number;
    expanded?: boolean;
    treeExpanded?: boolean;
    active?: boolean;
    instance: any;
    label: string;
    nodes: string[];
    keyLine: number;
    valueLine: number;
    type: string;
    violationIds?: string[];
    isArray?: boolean;
    arrayValues?: number;
    propertyCount?: number;
    arrayIndex?: number;
    extensions?: number;
    numWarnings?: number;
    numErrors?: number;
    numInfos?: number;
    processed?: boolean;
    filtered?: boolean;
    dependency?: boolean;
    polyType?: string;
    isPoly?: boolean;
    searchMatch?: string;
    searchKey?: string;
    openapi?: boolean;
    origin?: string;
    path?: string;
    timeline: Change[];
}

export interface Change {
    breaking: boolean;
    change: number;
    changeText: string;
    context: ChangeContext;
    new: any;
    newEncoded?: string;
    original: any;
    originalEncoded?: string;
    property: string;
    reference?: string;
    type: string;
    path: string;
}

export interface ChangeContext {
    newColumn: number;
    newLine: number;
    originalColumn: number;
    originalLine: number;
}

export interface Edge {
    id: string;
    sources: string[];
    targets: string[];
    sections?: any[];
    visible?: boolean;
    ref: string;
    poly?: string;
    container?: string;
    dependency?: boolean;
}

export interface SpecSummary {
    changeId?: string;
    created: string;
    totalChanges?: number;
    breakingChanges?: number;
    additions?: number;
    removals?: number;
    modifications?: number;
    gitCommitSha?: string;
    gitAuthor?: string;
    gitMessage?: string;
}

export interface CommitInfo {
    hash: string;
    date: string;
    message: string;
    author: string;
    authorEmail: string;
}

export interface LineDataSet {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string[];
    pointStyle?: string;
    radius?: number;
    pointBorderColor?: string;
}

export interface ChartResult {
    labels: string[];
    datasets: LineDataSet[];
}

export interface HistoryData {
    qualityData: ChartResult | null;
    changeData: ChartResult | null;
    violationData: ChartResult | null;
    changeIds: string[];
}

export interface ReportItem {
    changeId: string;
    graph: GraphResponse;
    summary: SpecSummary;
    htmlReport: string;
    originalSpec: string;
    modifiedSpec: string;
    originalHighlighted?: Record<number, string>;
    modifiedHighlighted?: Record<number, string>;
    commit: CommitInfo;
}

export interface ReportPayload {
    version: number;
    dateGenerated: string;
    items: ReportItem[];
    history: HistoryData;
}
