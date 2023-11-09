import { ICommand } from ".";

export default class Translator {
  private id: string;

  constructor(id: string) {
    this.id = id;
  }

  static decode(message: string): ICommand {
    return JSON.parse(message);
  }

  decode(message: string): ICommand | undefined {
    const command = Translator.decode(message);
    if (command.from !== this.id) {
      return command;
    }
  }

  encode(command: ICommand): string {
    command.from = this.id;
    return JSON.stringify(command);
  }
}
