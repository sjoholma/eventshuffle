# Requirements
- Node v8.10 or newer
# Setup

```
npm install
./node_modules/.bin/serverless dynamodb install
```

# Offline execution
```
./node_modules/.bin/serverless dynamodb start
(kill)
./node_modules/.bin/serverless offline start
```

# Tests
```
npm test
```

# Deployment
```
./node_modules/.bin/serverless config credentials --provider aws --key xxx --secret xxx
npm deploy
```