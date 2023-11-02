package ws

import (
	ws_drawing "byungjin.kr/api/controllers/ws/drawing"
	"byungjin.kr/api/internal"
	"github.com/gofiber/fiber/v2"
)

type Controller struct {
	env *internal.Env
	
}

func RegisterRouter (env *internal.Env, app *fiber.App) {
	group := app.Group("/api/ws")
	
	ws_drawing.CreateRouterGroup(env, app, group)
}