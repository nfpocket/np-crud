#!/usr/bin/env node

import chalk from "chalk";
import figlet from "figlet";
import fs from "fs";
import gradient from "gradient-string";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import path from "path";
import { getCreateContent, getDeleteContent, getGetContent, getListContent, getPutContent } from "./contents.js";

// Handle CTRL+C gracefully
process.on("SIGINT", () => {
  console.log(chalk.red("\nProcess interrupted. Exiting gracefully..."));
  process.exit(0);
});

async function getPath() {
  const pathResponse = await inquirer.prompt([
    {
      type: "input",
      name: "path",
      message: "Enter the path for the new model-CRUD",
      default: "/server/api",
    },
  ]);

  return pathResponse.path;
}

async function getModelName() {
  const modelNameResponse = await inquirer.prompt([
    {
      type: "input",
      name: "modelName",
      message: "Enter model name",
      required: true,
    },
  ]);

  return modelNameResponse.modelName;
}

async function getCrudTypes(modelName) {
  const crudTypesResponse = await inquirer.prompt([
    {
      type: "checkbox",
      name: "crudTypes",
      message: "Select the CRUD operations to create",
      choices: [
        {
          name: `${modelName}/index.get.ts    | Get all records`,
          value: "get",
          checked: true,
        },
        {
          name: `${modelName}/index.post.ts   | Create a new record`,
          value: "post",
          checked: true,
        },
        {
          name: `${modelName}/[id].delete.ts  | Delete a record`,
          value: "delete",
          checked: true,
        },
        {
          name: `${modelName}/[id].get.ts     | Get a record`,
          value: "getById",
          checked: true,
        },
        {
          name: `${modelName}/[id].put.ts     | Update a record`,
          value: "put",
          checked: true,
        },
      ],
      required: true,
    },
  ]);

  return crudTypesResponse.crudTypes;
}

const crudTypeToFileName = (crudType) => {
  switch (crudType) {
    case "get":
      return "index.get.ts";
    case "post":
      return "index.post.ts";
    case "delete":
      return "[id].delete.ts";
    case "getById":
      return "[id].get.ts";
    case "put":
      return "[id].put.ts";
  }
};

/**
 * @param {string} crudPath
 * @param {string} modelName
 * @param {string[]} crudTypes
 */
const generateCrud = async (crudPath, modelName, crudTypes) => {
  console.log(chalk.green(`Creating model-CRUD in ${crudPath}`));
  console.log(chalk.green(`Model name: ${modelName}`));
  console.log(chalk.green(`Crud Types: ${crudTypes}`));

  const spinner = createSpinner("Creating model-CRUD");
  spinner.start();

  for (const crudType of crudTypes) {
    spinner.update({
      text: `Creating ${modelName}/${crudType}.ts`,
    });

    let content = "";

    switch (crudType) {
      case "get":
        content = getListContent(modelName);
        break;
      case "post":
        content = getCreateContent(modelName);
        break;
      case "delete":
        content = getDeleteContent(modelName);
        break;
      case "getById":
        content = getGetContent(modelName);
        break;
      case "put":
        content = getPutContent(modelName);
        break;
    }

    if (!content) {
      spinner.fail({
        text: `Failed to create ${modelName}/${crudType}.ts`,
      });
      return;
    }

    const fileName = crudTypeToFileName(crudType);

    if (!fileName) {
      spinner.error({
        text: `[ERROR getting file name] Failed to create ${modelName}/${crudType}.ts`,
      });
      return;
    }

    try {
      const fullPath = `${crudPath}/${modelName}/${fileName}`;
      const absolutePath = path.join(process.cwd(), fullPath);

      if (!fs.existsSync(path.join(process.cwd(), crudPath, modelName))) {
        fs.mkdirSync(path.join(process.cwd(), crudPath, modelName), { recursive: true });
      }

      fs.writeFileSync(absolutePath, content);
    } catch (error) {
      console.log(error);
      spinner.error({
        text: `[ERROR writing file] Failed to create ${modelName}/${crudType}.ts`,
      });
      return;
    }
  }

  spinner.success({
    text: "Model-CRUD created successfully",
  });
};

try {
  console.log(gradient.pastel(figlet.textSync("NP-CRUD", { horizontalLayout: "full" })));

  console.log(chalk.yellow("This script will create a new model-CRUD in the specified path. (Nuxt + Prisma)"));

  const crudPath = await getPath();
  const modelName = await getModelName();
  const crudTypes = await getCrudTypes(modelName);

  await generateCrud(crudPath, modelName, crudTypes);
} catch (error) {
  console.log(chalk.red("\nPrompt interrupted. Exiting gracefully..."));
  process.exit(0);
}
