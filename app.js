const fs = require("fs/promises");

(async () => {
  const commandFileHandler = await fs.open("./command.txt", "r");

  const watcher = fs.watch("./command.txt");

  for await (const event of watcher) {
    if (event.eventType === "change") {
      const size = (await commandFileHandler.stat()).size;
      const buff = Buffer.alloc(size);

      const offset = 0;
      const length = buff.byteLength;
      const position = 0;

      const content = await commandFileHandler.read(
        buff,
        offset,
        length,
        position
      );
    }
  }
})();
