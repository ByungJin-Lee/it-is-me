package v0

import (
	"byungjin.kr/api/internal"
	"github.com/gofiber/fiber/v2"
)

type Controller struct {
	env *internal.Env
}

func RegisterRouter (env *internal.Env, app *fiber.App) {
	controller := Controller {
		env: env,
	}
	group := app.Group("/v0")
	
	group.Get("/health", controller.checkHealth)
}