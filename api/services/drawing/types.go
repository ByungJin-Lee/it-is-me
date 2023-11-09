package drawing

type Command struct {
	Type string `json:"type"`
	Data interface{} `json:"data"`
	From string `json:"from"`
}

var (
	TypeSendID = "id"
	FromServer = "server"
)