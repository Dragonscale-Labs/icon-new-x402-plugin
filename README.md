# icon-x402

A Claude Code plugin that generates AI icons using [icon.new](https://icon.new) with x402 USDC payments on Base.

## Features

- Generate AI-powered icons from text descriptions
- Pay-per-use with USDC on Base mainnet ($0.35/icon)
- No account or API key required
- Download icons as SVG, PNG, or ICO

## Installation

### 1. Clone and install dependencies

```bash
git clone https://github.com/your-repo/icon-x402.git
cd icon-x402
npm install
```

### 2. Configure your wallet

Export your EVM private key (with USDC on Base):

```bash
export EVM_PRIVATE_KEY="0x..."
```

Or create a `.env` file:

```bash
cp .env.example .env
# Edit .env and add your private key
```

### 3. Install the plugin in Claude Code

```bash
claude --plugin-dir /path/to/icon-x402
```

## Usage

### Via slash command

```
/icon rocket ship launching into space
/icon minimalist shopping cart
/icon abstract geometric pattern
```

### Via natural language

Just ask Claude to generate an icon:

```
"Generate an icon of a coffee cup"
"Create an icon for a settings gear"
"Make me a download arrow icon"
```

## Requirements

- Node.js 18+
- EVM wallet with USDC on Base mainnet
- At least $0.35 USDC per icon generation

## How it works

1. You request an icon with a text description
2. The plugin calls the icon.new API
3. x402 protocol handles the USDC payment automatically
4. You receive the generated icon URL

## Pricing

| Item | Cost |
|------|------|
| Icon generation | $0.35 USDC |
| Network | Base mainnet |
| Token | USDC |

## Output formats

Generated icons can be downloaded in multiple formats:

- **SVG**: `https://icon.new/api/v1/icons/{id}.svg`
- **PNG**: `https://icon.new/api/v1/icons/{id}.png`
- **ICO**: `https://icon.new/api/v1/icons/{id}.ico`

## Troubleshooting

### "EVM_PRIVATE_KEY not set"

Make sure your private key is exported:

```bash
export EVM_PRIVATE_KEY="0x..."
```

### "Insufficient funds"

Ensure your wallet has USDC on Base mainnet. You can bridge USDC to Base via:
- [Coinbase](https://coinbase.com)
- [Base Bridge](https://bridge.base.org)

### "Prompt too long"

Keep your icon description under 100 characters.

## Links

- [icon.new](https://icon.new) - Icon generation service
- [x402 Protocol](https://x402.gitbook.io) - Payment protocol documentation
- [Base](https://base.org) - L2 network

## License

MIT
