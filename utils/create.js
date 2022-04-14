const path = require("path");
const fs = require("fs-extra");
const inquirer = require("inquirer");
const Generator = require("./generator");
const chalk = require("chalk");

module.exports = async function (name, options) {
  // 执行创建命令
  // 当前命令行选择的目录
  const cwd = process.cwd();
  // 需要创建的目录地址
  const targetAir = path.join(cwd, name);

  // 目录是否已经存在？
  if (fs.existsSync(targetAir)) {
    // 是否为强制创建？
    if (options.force) {
      await fs.remove(targetAir);
    } else {
      // 询问用户是否确定要覆盖
      let { action } = await inquirer.prompt([
        {
          name: "action",
          type: "list",
          message: "目标文件夹已存在，请选择一个操作：",
          choices: [
            {
              name: "覆盖",
              value: "overwrite",
            },
            {
              name: "取消",
              value: false,
            },
          ],
        },
      ]);

      if (!action) {
        return;
      } else if (action === "overwrite") {
        // 移除已存在的目录
        console.log(`\r\n${chalk.redBright("移除中...")}`);
        await fs.remove(targetAir);
      }
    }
  }

  // 创建项目
  const generator = new Generator(name, targetAir);

  // 开始创建项目
  generator.create();
};
