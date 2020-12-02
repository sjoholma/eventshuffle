# Eventshuffle

## Requirements

- Node v12 or newer
- AWS credentials

## Setup

```bash
npm install -g serverless
sls config credentials --provider aws --key xxx --secret xxx
npm install
sls dynamodb install
```

## Execute offline

```bash
sls offline start
```

## Test offline

```bash
npm test
```

## Deployment

```bash
npm deploy
```
