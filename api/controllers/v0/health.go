package v0

import "github.com/gofiber/fiber/v2"

func (c *Controller) checkHealth (ctx *fiber.Ctx) error {
	return ctx.Send([]byte("ok"))
}