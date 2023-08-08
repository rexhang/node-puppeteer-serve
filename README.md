# 使用 puppeteer 进行网站截图 并返回

```bash
npm install
node app.js
```

服务启动后 访问 <YOUR_IP>:3000/screenshot?url=https://www.qq.com&w=2560&h=1440&w=1920&h=1080

```javascript
url: 要进行截图的网站地址
w: 截图视口的宽度
h: 截图视口的高度
m: json | file 默认json 返回的形式可以是json形式或者直接是图片
```

例如:

>json形式返回
`http://127.0.0.1:3000/screenshot?url=https://www.qq.com&w=2560&h=1440`

>文件形式返回
`http://127.0.0.1:3000/screenshot?url=https://www.qq.com&w=2560&h=1440&m=file`
