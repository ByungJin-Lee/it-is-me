package drawing

import (
	"bytes"

	"github.com/gofiber/contrib/websocket"
)



type Client struct {
	send chan []byte
	conn *websocket.Conn
	service IDrawingService
}

func (c *Client) Close() {
	c.conn.Close()
	close(c.send)
}

func (c *Client) SendChannel() chan []byte {
	return c.send
}

func (c *Client) Service() IDrawingService {
	return c.service
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

		_, message, err := c.conn.ReadMessage()
		if err != nil {
			break
		}

		message = bytes.TrimSpace(bytes.Replace(message, newline, space, -1))
		c.service.EventChannels().Broadcast() <- message
	}

}


func (c *Client) write() {

	for {

		select {
			case message, ok := <-c.send:
				if !ok {
					c.conn.WriteMessage(websocket.CloseMessage, []byte{})
					return
				}

				w, err := c.conn.NextWriter(websocket.TextMessage)
				if err != nil {
					return
				}
				w.Write(message)

				n := len(c.send)
				for i := 0; i < n; i++ {
					w.Write(newline)
					w.Write(<-c.send)
				}

				if err := w.Close(); err != nil {
					return	
				}
		}

	}
}

func NewClient(s IDrawingService, c *websocket.Conn) IClient {
	return &Client{
		send: make(chan []byte, 256),
		conn: c,
		service: s,
	}
}