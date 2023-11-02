package ws_drawing

import (
	"byungjin.kr/api/internal"
	"byungjin.kr/api/services/drawing"
	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

type Controller struct {
	env *internal.Env
	service drawing.IDrawingService
}

func CreateRouterGroup (env *internal.Env, app *fiber.App, router fiber.Router) {
	controller := Controller {
		env: env,
		service: drawing.CreateDrawingService(),
	}

	group := router.Group("/drawing")

	group.Use(func (ctx *fiber.Ctx) error {
		if websocket.IsWebSocketUpgrade(ctx) {
			ctx.Locals("allowed", true)
			return ctx.Next()
		} 
		return fiber.ErrUpgradeRequired
	})

	go controller.service.Run()

	group.Get("/connect", controller.service.NewWSHandler())
}