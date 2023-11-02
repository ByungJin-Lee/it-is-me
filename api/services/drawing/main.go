package drawing

func CreateDrawingService() IDrawingService {
	return &DrawingService{
		pool: newConnectionPool(),
		eventChannels: newEventChannel(),
	}
}