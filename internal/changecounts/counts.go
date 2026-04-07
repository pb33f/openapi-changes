// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package changecounts

import whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"

type Counts struct {
	Total                 int
	Breaking              int
	Additions             int
	Modifications         int
	Removals              int
	BreakingAdditions     int
	BreakingModifications int
	BreakingRemovals      int
}

func FromChanges(changes []*whatChangedModel.Change) Counts {
	var counts Counts

	for _, ch := range changes {
		if ch == nil {
			continue
		}

		if ch.Breaking {
			counts.Breaking++
		}

		switch ch.ChangeType {
		case whatChangedModel.PropertyAdded, whatChangedModel.ObjectAdded:
			counts.Total++
			counts.Additions++
			if ch.Breaking {
				counts.BreakingAdditions++
			}
		case whatChangedModel.Modified:
			counts.Total++
			counts.Modifications++
			if ch.Breaking {
				counts.BreakingModifications++
			}
		case whatChangedModel.PropertyRemoved, whatChangedModel.ObjectRemoved:
			counts.Total++
			counts.Removals++
			if ch.Breaking {
				counts.BreakingRemovals++
			}
		default:
			counts.Total++
		}
	}

	return counts
}
