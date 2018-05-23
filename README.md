# Requirements
- Node v8.10 or newer
# Setup

```
npm install
./node_modules/.bin/serverless dynamodb install
```

# Offline execution
```
./node_modules/.bin/serverless dynamodb start -d . -m true
(kill)
./node_modules/.bin/serverless offline start
```

# Deployment
```
./node_modules/.bin/serverless config credentials --provider aws --key xxx --secret xxx
./node_modules/.bin/serverless deploy
```