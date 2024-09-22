# np-crud

`np-crud` is a CLI tool to create CRUD endpoints for a Nuxt.js and Prisma project.

## Installation

To install the dependencies, run:

```sh
npm install -g
```

## Usage

To start the CLI, run:

```sh
np-crud
```

The CLI will prompt you to enter the model name, select the CRUD operations to create, and specify the path for the new model-CRUD.

## Prompts

1. **Model Name**: Enter the name of the model for which you want to create CRUD endpoints.
2. **CRUD Operations**: Select the CRUD operations you want to create. The options are:
   - Get all records
   - Create a new record
   - Delete a record
   - Get a record by ID
   - Update a record
3. **Path**: Enter the path where the new model-CRUD files should be created. The default path is `/server/api`.

## Example

```sh
npm start
```

Follow the prompts to generate the desired CRUD endpoints.

## Dependencies

- [chalk](https://www.npmjs.com/package/chalk)
- [chalk-animation](https://www.npmjs.com/package/chalk-animation)
- [figlet](https://www.npmjs.com/package/figlet)
- [fs-extra](https://www.npmjs.com/package/fs-extra)
- [gradient-string](https://www.npmjs.com/package/gradient-string)
- [inquirer](https://www.npmjs.com/package/inquirer)
- [nanospinner](https://www.npmjs.com/package/nanospinner)

## License

This project is licensed under the ISC License.
