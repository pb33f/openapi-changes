// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package model

import "fmt"

type ProgressUpdate struct {
	Job       string
	Message   string
	Completed bool
	Warning   bool
}

type ProgressError struct {
	Job     string
	Message string
	Fatal   bool
}

func (p ProgressError) Error() string {
	return fmt.Sprintf("error: %s", p.Message)
}

func SendProgressUpdate(job, message string, completed bool, progressChan chan *ProgressUpdate) {
	progressChan <- &ProgressUpdate{
		Job:       job,
		Message:   message,
		Completed: completed,
	}
}

func SendProgressWarning(job, message string, progressChan chan *ProgressUpdate) {
	progressChan <- &ProgressUpdate{
		Job:       job,
		Message:   message,
		Warning:   true,
		Completed: false,
	}
}

func SendProgressError(job, message string, errorChan chan ProgressError) {
	errorChan <- ProgressError{
		Job:     job,
		Message: message,
	}
}

func SendFatalError(job, message string, errorChan chan ProgressError) {
	errorChan <- ProgressError{
		Job:     job,
		Message: message,
		Fatal:   true,
	}
}
