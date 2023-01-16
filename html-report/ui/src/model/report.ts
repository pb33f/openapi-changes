import {BeefyTreeNode} from "@/model/beefy-tree-node";
import {GraphData} from "@/model/graph";
import {ChangeStatistics} from "@/model/change";

export interface Report {
    dateGenerated: string;
    reportItems: ReportItem[];
}

export interface ReportItem {
    originalSpec: string;
    modifiedSpec: string;
    tree?: BeefyTreeNode[];
    graph?: GraphData
    statistics: ChangeStatistics;
}

