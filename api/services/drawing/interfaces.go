package drawing

import (
	"github.com/gofiber/fiber/v2"
)


type IDrawingService interface {
	NewWSHandler() func(*fiber.Ctx) error
	Run()
	EventChannels() IEventChannels
}

type IClient interface {
	Close()
	SendChannel() chan []byte
	Service() IDrawingService
	Start()
}

type IEventChannels interface {
	Broadcast() chan []byte
	Connections() chan IClient
	Disconnections() chan IClient
}

type IConnectionPool interface {
	Add(c IClient)
	Remove(c IClient)
	GetAll() []IClient 
}