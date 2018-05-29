# Requirements
- Node v8.10 or newer
- AWS credentials

# Setup
```
npm install
./node_modules/.bin/serverless dynamodb install
./node_modules/.bin/serverless config credentials --provider aws --key xxx --secret xxx
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
npm deploy
```
