// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package builder

import (
    vacuumModel "github.com/daveshanley/vacuum/model"
    "github.com/daveshanley/vacuum/motor"
    "github.com/daveshanley/vacuum/rulesets"
    "github.com/daveshanley/vacuum/statistics"
    vacuumReport "github.com/daveshanley/vacuum/vacuum-report"
    "github.com/pb33f/libopenapi/datamodel"
    "time"
)

func CheckStats(info *datamodel.SpecInfo) *vacuumReport.VacuumReport {

    // build and store built-in vacuum default RuleSets.
    defaultRS := rulesets.BuildDefaultRuleSets()

    // generate the 'recommended' RuleSet
    recommendedRS := defaultRS.GenerateOpenAPIRecommendedRuleSet()

    // apply the rules in the ruleset to the specification
    lintingResults := motor.ApplyRulesToRuleSet(
        &motor.RuleSetExecution{
            RuleSet: recommendedRS,
            //Spec:    specBytes,
            SpecInfo: info,
        })

    // create a new whatChanged.RuleResultSet from the results.
    // structure allows categorization, sorting and searching
    // in a simple and consistent way.
    resultSet := vacuumModel.NewRuleResultSet(lintingResults.Results)

    // sort results by line number (so they are not all jumbled)
    resultSet.SortResultsByLineNumber()

    stats := statistics.CreateReportStatistics(lintingResults.Index, info, resultSet)

    // create vacuum report
    return &vacuumReport.VacuumReport{
        Generated:  time.Now(),
        SpecInfo:   info,
        ResultSet:  resultSet,
        Statistics: stats,
    }

}
