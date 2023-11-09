package drawing

type EventChannels struct {
	broadcast chan Command
	connections chan IClient
	disconnections chan IClient
}

func (e *EventChannels) Broadcast() chan Command {
	return e.broadcast
}

func (e *EventChannels) Connections() chan IClient {
	return e.connections
}

func (e *EventChannels) Disconnections() chan IClient {
	return e.disconnections
}

func newEventChannel() IEventChannels {
	return &EventChannels{
		broadcast: make(chan Command),
		connections: make(chan IClient),
		disconnections: make(chan IClient),
	}
}