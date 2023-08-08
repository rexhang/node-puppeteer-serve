/**
 * @fileoverview 一个简单的node调用无头浏览器进行截图的服务
 * @author rexhang
 * @contact rexhang_work@outlook.com
 * @date 2023/08/08 16:00
 * @addons ['puppeteer', 'express', '...']
 */

const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const util = require('util');

const app = express();

const port = 3000;

// 将 fs.mkdir() 转换为返回 Promise 的函数
const mkdir = util.promisify(fs.mkdir);

app.get('/screenshot', async (req, res) => {
  try {
    // 获取UA
    const userAgent = req.headers['user-agent'];

    // 启动浏览器
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox'],
    });

    // m 支持 = file 直接返回截图文件
    const { url = 'https://www.qq.com', w: width = 1920, h: height = 1080, m = 'json' } = req.query;

    // 创建一个新页面
    const page = await browser.newPage();

    // 导航到指定网址
    await page.goto(url);

    // 等待页面加载完成
    await page.waitForSelector('body');

    // 设置视口大小为全屏
    await page.setViewport({ width: +width, height: +height }); // 根据需要调整

    // 生成不重复的文件名
    const filename = `screenshot_${Date.now()}.png`;

    const baseDir = 'screenshot';

    // 不存在则新建
    if(!(fs.existsSync(baseDir) && fs.statSync(baseDir).isDirectory())) {
      // 使用 await 调用返回 Promise 的 mkdir 函数
      await mkdir(baseDir);
    }

    // 截图文件的路径
    const imagePath = path.join(__dirname, 'screenshot', filename);

    // 进行页面截图 放到根目录 screenshot 文件夹下
    const screenshotBuffer = await page.screenshot();

    // 指定保存路径并将截图保存为文件
    fs.writeFileSync(imagePath, screenshotBuffer);

    // 关闭浏览器
    await browser.close();

    // 直接返回文件
    if (m === 'file') {
      res.sendFile(imagePath);
      return;
    }
    // 默认返回json
    res.json({ screenshot_path: imagePath, userAgent, resolution: `${width}x${height}`, screenshot: screenshotBuffer.toString('base64') });
  } catch (error) {
    console.debug(error);
    res.status(500).send(`Error capturing screenshot, ${error.toString()}`);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
