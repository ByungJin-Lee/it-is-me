package drawing

import (
	"golang.org/x/exp/maps"
)

type ConnectionPool struct {
	connections map[string]IClient
}

func (p *ConnectionPool) Add(c IClient) {
	p.connections[c.GetId()] = c
}

func (p *ConnectionPool) Remove(c IClient) {
	c.Close()
	delete(p.connections, c.GetId())
}

func (p *ConnectionPool) GetAll() []IClient {
	return maps.Values(p.connections)
}

func (p *ConnectionPool) Get(id string) (IClient, bool) {
	c, ok := p.connections[id]
	return c, ok
}

func newConnectionPool() IConnectionPool {
	return &ConnectionPool{
		connections: make(map[string]IClient),
	}
}