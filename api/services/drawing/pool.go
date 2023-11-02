package drawing

import (
	"golang.org/x/exp/maps"
)

type ConnectionPool struct {
	connections map[IClient]bool
}

func (p *ConnectionPool) Add(c IClient) {
	p.connections[c] = true
}

func (p *ConnectionPool) Remove(c IClient) {
	c.Close()
	delete(p.connections, c)
}

func (p *ConnectionPool) GetAll() []IClient {
	return maps.Keys(p.connections)
}

func newConnectionPool() IConnectionPool {
	return &ConnectionPool{
		connections: make(map[IClient]bool),
	}
}