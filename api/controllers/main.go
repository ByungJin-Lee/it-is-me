package controllers

import (
	v0 "byungjin.kr/api/controllers/v0"
	ws "byungjin.kr/api/controllers/ws"
	"byungjin.kr/api/internal"
	"github.com/gofiber/fiber/v2"
)

func Initialize (env *internal.Env, app *fiber.App) {
	
	v0.RegisterRouter(env, app)
	ws.RegisterRouter(env, app)
}