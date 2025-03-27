const fs = require("fs/promises");

(async () => {
  // commands
  const CREATE_FILE = "create a file";
  const DELETE_FILE = "delete the file";
  const RENAME_FILE = "rename the file";
  const ADD_TO_FILE = "add to the file";

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

  const deleteFile = async (path) => {
    try {
      await fs.access(path);
      await fs.unlink(path);
      console.log(`The file ${path} was successfully deleted.`);
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log(`The file ${path} does not exist.`);
      } else {
        console.error(`Error deleting file ${path}:`, error);
      }
    }
  };

  const renameFile = (oldPath, newPath) => {};
  const addToFile = (path, content) => {};

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

    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1);
      deleteFile(filePath);
    }

    if (command.includes(RENAME_FILE)) {
      const index = command.indexOf(" to ");
      const oldFilePath = command.substring(RENAME_FILE.length + 1, index);
      const newFilePath = command.substring(index + 4);

      renameFile(oldFilePath, newFilePath);
    }

    if (command.includes(ADD_TO_FILE)) {
      const index = command.indexOf(" this content: ");
      const filePath = command.substring(ADD_TO_FILE.length + 1, index);
      const content = command.substring(index + 15);

      addToFile(filePath, content);
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
