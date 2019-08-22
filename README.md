# vscode-extension-json-helper
JSON Helper utilities

## Commands

### JSON Sanitize

Will use selected text if found, otherwise will use the entire active tab's text.

If the JSON is invalid a message will appear indicating this.

If the JSON is valid the command recursively traverses the object deleting null, empty object and empty array properties.


## Setup

I am using docker to contain node, so I don't need to install anything specific locally. 

### If you do not have docker and have node installed locally

open the terminal navigate to the root of the project folder then try a `npm install`

### If you have docker / docker-compose / docker vscode extension

* In vscode right click the *docker-compose.yml* then select *Open in Terminal*. This will open a terminal window in vscode. 
* Execute `docker-compose run --rm node` which will run the container and keep it running.
* Open the Docker extension in vscode, right click the *vscode-extension-json-helper* container then select *Attach Shell*. This will open a new terminal window in vscode where you are in the shell of the containers file system
* Execute `cd project/`
* Execute `npm install`

## Debug / Run

Now that the setup is complete lets test/run our extension. Open *extension.js* in vscode, then hit the **F5** key which will open a debug window.

Next open the command pallette **Ctrl+Shift+P** then run the JSON Sanitize command

## Publish

For this you will need to terminal into the docker container's shell.

If you do not have a publisher run the following, then answer the questions. This requires a personal acces token to be created at *dev.azure.com*

`npx vsce create-publisher <publisher name>`


