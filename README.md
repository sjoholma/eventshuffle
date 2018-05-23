# Requirements
- Node v8.10 or newer
# Setup

```
npm install
sls dynamodb install
```

# Offline execution
```
sls dynamodb start -d . -m true
(kill)
sls offline start
```

# Deployment
```
sls config credentials --provider aws --key xxx --secret xxx
sls deploy
```