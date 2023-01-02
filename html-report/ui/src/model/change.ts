export interface ChangeContext {
    newColumn: number;
    newLine: number;
    originalLine: number;
    originalColumn: number;
}

export interface Change {
    breaking: boolean;
    change: number;
    context: ChangeContext;
    new: string;
    original: string;
    property: string;
}