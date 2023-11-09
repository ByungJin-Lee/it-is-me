package drawing

import (
	"github.com/gofiber/contrib/websocket"
	"github.com/google/uuid"
)



type Client struct {
	send chan Command
	conn *websocket.Conn
	service IDrawingService
	id string
}

func (c *Client) Close() {
	c.conn.Close()
	close(c.send)
}

func (c *Client) SendCommandChannel() chan Command {
	return c.send
}

func (c *Client) Service() IDrawingService {
	return c.service
}

func (c *Client) SendCommand(command Command) {
	c.conn.WriteJSON(command)
}

func (c *Client) Start() {
	// Register new Client
	c.service.EventChannels().Connections() <- c
	// go
	go c.read()
	c.write()
}

var (
	newline = []byte{'\n'}
	space   = []byte{' '}
)

func (c *Client) read() {
	defer func() {
		c.service.EventChannels().Disconnections() <- c
	}()

	for {
		command := new(Command)
		err := c.conn.ReadJSON(command)
		if err != nil {
			break
		}
		c.service.EventChannels().Broadcast() <- *command
	}

}


func (c *Client) write() {

	for {

		select {
			case command, ok := <-c.send:
				if !ok {
					c.conn.WriteMessage(websocket.CloseMessage, []byte{})
					return
				}

				if err := c.conn.WriteJSON(command); err != nil {
					return	
				}
		}

	}
}

func (c *Client) GetId() string {
	return c.id
}

func NewClient(s IDrawingService, c *websocket.Conn) IClient {
	return &Client{
		send: make(chan Command),
		conn: c,
		service: s,
		id: uuid.NewString(),
	}
}