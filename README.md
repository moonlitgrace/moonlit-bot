# Moonlit Bot

> A GitHub App built with [Probot](https://github.com/probot/probot)

### Features:
 - Sync forks with `main` branch by creating PR.
 - soon...

###### screen shot-
![2024-09-15_18-39](https://github.com/user-attachments/assets/1116f2d8-b2d3-478b-ade0-7f432f372690)


## Development

```sh
# Clone and cd into project
git clone https://github.com/moonlitgrace/moonlit-bot && cd moonlit-bot

# Install dependencies
npm install

# Build tsc
npm run build

# Run bot locally
npm start
```

## Docker build

```sh
# 1. Build container
docker build -t moonlit-bot .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> moonlit-bot
```

## Contributing

If you have suggestions for how `moonlit-bot` could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2024 moonlitgrace
