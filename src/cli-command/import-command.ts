import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import { ConsoleColorLogger } from '../logger/console-logger.js';
import { CliCommandInterface } from './cli-command.interface.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  public execute(filename: string): void {

    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      const dataToLog = fileReader.toArray();
      new ConsoleColorLogger(dataToLog).log();
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.log(`Не удалось импортировать данные из файла по причине: «${err.message}»`);
    }
  }
}
