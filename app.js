const fs = require("fs/promises");

(async () => {
  const createFile = async (path) => {
    try {
      const existingFileHandle = await fs.open(path, "r");
      existingFileHandle.close();

      return console.log(`The file ${path} already exists.`);
    } catch (error) {
      const newFileHandle = await fs.open(path, "w");
      console.log("A new file was successfully created.");
      newFileHandle.close();
    }
  };

  // commands
  const CREATE_FILE = "create a file";

  const commandFileHandler = await fs.open("./command.txt", "r");

  commandFileHandler.on("change", async () => {
    // get the size of the file
    const size = (await commandFileHandler.stat()).size;
    // allocate buffer with the size of the file
    const buff = Buffer.alloc(size);

    // the location at which want to start filling our buffer
    const offset = 0;
    // how many bytes want to read
    const length = buff.byteLength;
    // the position that want to start reading the file from
    const position = 0;

    // always want to read the whole content (from beginning to the end)
    await commandFileHandler.read(buff, offset, length, position);

    const command = buff.toString("utf8");

    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }
  });

  // watcher...
  const watcher = fs.watch("./command.txt");

  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFileHandler.emit("change");
    }
  }
})();
