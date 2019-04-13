# Eventshuffle

## Requirements

- Node v8.10 or newer
- AWS credentials

## Setup

```bash
npm install
./node_modules/.bin/serverless dynamodb install
./node_modules/.bin/serverless config credentials --provider aws --key xxx --secret xxx
```

## Offline execution

```bash
./node_modules/.bin/serverless dynamodb start
(kill)
./node_modules/.bin/serverless offline start
```

## Tests

```bash
npm test
```

## Deployment

```bash
npm deploy
```
