# Clone repository

```
git clone https://github.com/usermisterfive/tsRestApi
cd tsRestApi
```

# Build

```
npm install
npm run build
```

# Docker build

```
docker build . -t tsrestapi
```

# Run

```
node tsrestapi-1.11.0.js
```

# Docker run

```
docker run -p 7000:7000/udp -p 7000:7000/tcp tsrestapi
```

# Test

```
curl localhost:7000/products
```

# Release

![badge](https://github.com/usermisterfive/tsRestApi/actions/workflows/push.yml/badge.svg)
