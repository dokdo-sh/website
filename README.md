# quest.solar.org

Requires:

Install Node:

```
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Install PM2

```
npm install -g pm2
```

Install packages

```
yarn install
```

Start the program:

```
pm2 start quest-solar.js
```
