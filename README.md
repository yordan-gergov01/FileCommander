# File System Command Handler

## Overview

This is a simple Node.js application that interacts with the file system. It monitors a command file (command.txt) for changes and executes file system operations such as creating, deleting, renaming, and appending content to files based on the commands written in it.


## Features

- **Create a File:** Creates a new file if it does not already exist.

- **Delete a File:** Deletes a specified file if it exists.

- **Rename a File:** Renames an existing file to a new name.

- **Append Content to a File:** Adds content to the end of an existing file.

- **Real-time Monitoring:** Watches command.txt for changes and executes the appropriate file operation.


  ## Installation

  1. Ensure you have Node.js installed.
     
  2. Clone this repository:
     git clone https://github.com/yordan-gergov01/FileCommander.git

  3. Navigate to the project directory:
     cd file-system-command-handler


  ## Usage

  
  1. Create a command.txt file in the project directory.
     
  2. Run the script:
     node index.js

  3. Modify command.txt by adding one of the following commands:
     - **Create a file:**
       create a file example.txt

     - **Delete a file:**
       delete the file example.txt

     - **Rename a file:**
       rename the file example.txt to newfile.txt

     - **Append content to a file:**
       add to the file example.txt this content: Hello, world!

     4. The script detects changes in command.txt and executes the respective file operation automatically.

     
