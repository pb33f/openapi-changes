// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

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

export interface ChangeStatistics {
    total: number,
    totalBreaking: number,
    added: number,
    modified: number,
    removed: number,
    breakingAdded: number,
    breakingModified: number,
    breakingRemoved: number
    commit: CommitStatistics;

}

export interface CommitStatistics {
    date: string;
    author: string;
    authorEmail: string;
    message: string;
    hash: string;
}
