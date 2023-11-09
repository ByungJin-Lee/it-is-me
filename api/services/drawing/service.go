package drawing

import (
	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

type DrawingService struct {
	pool IConnectionPool
	eventChannels IEventChannels
}



func (s *DrawingService) NewWSHandler() func(c *fiber.Ctx) error {
	return websocket.New(func (c *websocket.Conn) {
		client := NewClient(s, c)
		client.Start()
	})
}

func (s *DrawingService) EventChannels() IEventChannels {
	return s.eventChannels
}

func (s *DrawingService) Run() {

	var (
		connections = s.eventChannels.Connections()
		disconnections = s.eventChannels.Disconnections()
		broadcast = s.eventChannels.Broadcast()
	)

	for {
		select {
		case client := <-connections:
			s.pool.Add(client)
			s.SendJsonFromServer(client.GetId(), Command{
				Type: TypeSendID,
				Data: client.GetId(),
			})
		case client := <-disconnections:
			s.pool.Remove(client)
		case command := <-broadcast:
			for _, client := range s.pool.GetAll() {
				select {
				case client.SendCommandChannel() <- command:
				}
			}
		}
	}
}

func (s *DrawingService) SendJsonFromServer(id string, command Command) {
	if c, ok := s.pool.Get(id); ok {
		command.From = FromServer
		c.SendCommand(command)
	}
}