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
	SendCommandChannel() chan Command
	Service() IDrawingService
	Start()
	GetId() string
	SendCommand(command Command)
}

type IEventChannels interface {
	Broadcast() chan Command
	Connections() chan IClient
	Disconnections() chan IClient
}

type IConnectionPool interface {
	Add(c IClient)
	Remove(c IClient)
	Get(id string) (IClient, bool)
	GetAll() []IClient 
}