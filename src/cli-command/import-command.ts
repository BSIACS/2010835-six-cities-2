import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import { createOffer, getErrorMessage } from '../utils/common.js';
import { CliCommandInterface } from './cli-command.interface.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
  }

  private onLine(line: string) {
    const offer = createOffer(line);
    console.log(offer);
  }

  public async execute(filename: string): Promise<void> {
    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch(err) {
      console.log(`Can't read the file: ${getErrorMessage(err)}`);
    }
  }

}
