package main

import (
	"context"
	"fmt"
	"os"
	"path/filepath"

	rt "github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// SaveFile saves content to a file. If path is empty, shows a Save File dialog.
func (a *App) SaveFile(path string, content string) (string, error) {
	var err error
	if path == "" {
		// Ask user where to save
		path, err = rt.SaveFileDialog(a.ctx, rt.SaveDialogOptions{
			DefaultFilename:      "Untitled",
			CanCreateDirectories: true,
			Title:                "Save file",
			Filters: []rt.FileFilter{
				{DisplayName: "HTML Files", Pattern: "*.html"},
			},
		})
		if err != nil || path == "" {
			return "", err // user canceled
		}

		rt.WindowSetTitle(a.ctx, filepath.Base(path))
	}

	// Write file
	err = os.WriteFile(path, []byte(content), 0644)
	if err != nil {
		return "", err
	}

	return path, nil
}

func (a *App) OpenTextFile() (string, error) {
	file, err := rt.OpenFileDialog(a.ctx, rt.OpenDialogOptions{
		Title: "Open Text File",
		Filters: []rt.FileFilter{
			{DisplayName: "HTML Files", Pattern: "*.html"},
		},
	})

	if err != nil {
		return "", err
	}

	// User cancelled
	if file == "" {
		return "", nil
	}

	content, err := os.ReadFile(file)
	fmt.Println(string(content))
	if err != nil {
		return "", err
	}

	filename := filepath.Base(file)
	rt.WindowSetTitle(a.ctx, filename)

	return string(content), nil
}
