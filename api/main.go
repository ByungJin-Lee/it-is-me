package main

import (
	"flag"
	"os"

	"log"

	"byungjin.kr/api/controllers"
	"byungjin.kr/api/internal"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func loadEnvParams(isLocal bool) (internal.EnvParams, error) {
	if isLocal {
		godotenv.Load(".env.local")
	}
	// TODO: error handling
	params := internal.EnvParams{
		Port: os.Getenv("PORT"),
	}

	return params, nil
}

func printAppStatus(env *internal.Env) {
	log.Default().Printf("App is running on port %s", env.Params.Port)
}

func initializeApp(env *internal.Env) {
	app := fiber.New()
	controllers.Initialize(env, app)	
	app.Listen(":" + env.Params.Port)	
}

func main() {
	local := flag.Bool("local", false, "run app in local mode")
	flag.Parse()

	params, err := loadEnvParams(*local)	
	if err != nil {
		log.Fatal(err)
		return
	}
	env := &internal.Env {
		Params: params,
	}
	initializeApp(env)	
	printAppStatus(env)
}