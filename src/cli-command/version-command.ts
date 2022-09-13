import { readFileSync } from 'fs';
import { CliCommandInterface } from './cli-command.interface';

export default class VersionCommand implements CliCommandInterface{
  readonly name: string;

  constructor(){
    this.name = '--version';
  }

  private readVersion() : string {
    const contentPageJSON = readFileSync('./package.json', 'utf-8');
    const content = JSON.parse(contentPageJSON);

    return content.version;
  }

  async execute(): Promise<void> {
    const version = this.readVersion();
    console.log(version);
  }

}
