#! /usr/bin/env node
const { program } = require("commander");
const chalk = require("chalk");
const figlet = require("figlet");
const create = require("./utils/create");
const checkUpdate = require('./utils/checkUpdate')

program
  .command("init <project-name>")
  .description("创建一个新的项目")
  .option("-f, --force", "如果存在该目标文件夹，则覆盖目标文件夹")
  .action((name, options) => {
    // 获取的项目名，和选项参数
    // console.log("name: ", name, " options: ", options);

    // 创建项目
    create(name, options);
  });

program
  .command("update")
  .description("更新最新脚手架版本")
  .action(async () => {
    await checkUpdate();
  });

// 配置版本号信息
program
  .version(`v${require("./package.json").version}`)
  .usage("<command> [option]");

program.on("--help", () => {
  // 绘制 Logo
  console.log(
    "\r\n" +
      figlet.textSync("lw-cli", {
        font: "Ghost",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 160,
        whitespaceBreak: true,
      })
  );
  // 新增说明信息
  console.log(`\r\nRun ${chalk.cyan(`lw <command> --help`)} show details\r\n`);
});

// 解析用户执行命令的参数
program.parse(process.argv);
