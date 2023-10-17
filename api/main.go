package main

import (
	"fmt"

	"log"

	"github.com/gofiber/fiber/v2"
)

func main() {
	// Init 
	fmt.Println("Hello World")
	
	app := fiber.New()
	log.Default().Println("Hello World")
}