import { ICommand } from ".";

export default class Translator {
  static decode(message: string): ICommand {
    return JSON.parse(message);
  }

  static encode(command: ICommand): string {
    return JSON.stringify(command);
  }
}
