# 使用 puppeteer 进行网站截图 并返回

### 1.本地node环境直接使用

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

![json形式返回](https://github.com/rexhang/node-puppeteer-serve/assets/14832793/00c32646-a95e-4ba0-8b50-5cef3841a354)

>文件形式返回

`http://127.0.0.1:3000/screenshot?url=https://www.qq.com&w=2560&h=1440&m=file`

![文件形式返回](https://github.com/rexhang/node-puppeteer-serve/assets/14832793/a62a17dc-aeff-4292-865f-6e6f5c893cae)

### 2.docker环境使用(推荐)

使用我提供的image镜像，然后docker构建容器体验即可(注意的是映射端口，服务启动在容器的3000端口，需要映射到本地，具体查看 **[build-container.cmd](https://github.com/rexhang/node-puppeteer-serve/blob/main/build-container.cmd)** 文件)。

**[dockerHub](https://hub.docker.com/)** 中搜索 **`rexhang/docker-node-puppeteer`** pull image **[直达链接](https://hub.docker.com/r/rexhang/docker-node-puppeteer/tags)**

![results](https://github.com/rexhang/node-puppeteer-serve/assets/14832793/44d64ced-ac6b-44af-8fc0-a0011cd49cac)

![release_url](https://github.com/rexhang/node-puppeteer-serve/assets/14832793/982da7fa-5cdd-4bc2-8370-5f15e0430b1c)
