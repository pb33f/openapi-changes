// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package html_report

//func TestBuildReport(t *testing.T) {
//
//	//cwd, _ := os.Getwd()
//	//dir, _ := filepath.Split(cwd)
//
//	//history, _ := git.ExtractHistoryFromFile(dir, "sample-specs/petstorev3.json")
//	//assert.NotNil(t, history)
//	//assert.Equal(t, "And now it's generally wrecked. But what a fun journey.", history[0].Message)
//
//	// build out the commit change log and ensure everything is in the right place.
//	//commitHistory, errors := git.PopulateHistoryWithChanges(history, nil)
//	//https://github.com/stripe/openapi/blob/master/openapi/spec3.json
//
//	githubCommits, err := git.GetCommitsForGithubFile("OAI", "OpenAPI-Specification", "examples/v3.0/petstore.yaml")
//	//githubCommits, err := git.GetCommitsForGithubFile("stripe", "openapi", "openapi/spec3.json")
//	assert.NoError(t, err)
//	history, errs := git.ConvertGithubCommitsIntoModel(githubCommits)
//	assert.Len(t, errs, 0)
//	for x := range history {
//		if x != len(history)-1 { // last item is first commit, it can't be diffed.
//			assert.NotNil(t, history[x].Changes)
//			assert.NotNil(t, history[x].OldData)
//		}
//	}
//
//	var reports []*model.Report
//	for r := range history {
//		if history[r].Changes != nil {
//			report := wchreports.CreateOverallReport(history[r].Changes)
//			rpt := &model.Report{Summary: report.ChangeReport, Commit: history[r]}
//			reports = append(reports, rpt)
//		}
//	}
//
//	generator := NewHTMLReport(false, time.Now(), history)
//	htmlReportData := generator.GetHTMLReport()
//	rendered, _ := json.MarshalIndent(htmlReportData, "", " ")
//	os.WriteFile("../html-report/ui/data.json", rendered, 0664)
//}
