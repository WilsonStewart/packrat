package main

import (
	"fmt"
	"runtime"

	"github.com/wailsapp/wails/v2/pkg/menu"
	"github.com/wailsapp/wails/v2/pkg/menu/keys"
)

func CreateMenu(app *App) *menu.Menu {
	AppMenu := menu.NewMenu()
	if runtime.GOOS == "darwin" {
		AppMenu.Append(menu.AppMenu()) // On macOS platform, this must be done right after `NewMenu()`
	}

	AppMenu.AddText("Bob", keys.CmdOrCtrl("o"), func(_ *menu.CallbackData) {
		fmt.Println("boo")
	})

	FileMenu := AppMenu.AddSubmenu("File")
	FileMenu.AddText("Open rat", keys.CmdOrCtrl("r"), func(_ *menu.CallbackData) {
		// todo
	})
	FileMenu.AddText("Open file", keys.CmdOrCtrl("o"), func(_ *menu.CallbackData) {
		// todo
	})

	if runtime.GOOS == "darwin" {
		AppMenu.Append(menu.EditMenu()) // On macOS platform, EditMenu should be appended to enable Cmd+C, Cmd+V, Cmd+Z... shortcuts
	}

	return AppMenu
}
