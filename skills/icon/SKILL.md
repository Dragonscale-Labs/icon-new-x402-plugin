# Icon Generator Skill (x402)

Generate AI-powered icons using icon.new with USDC payments on Base via the x402 protocol.

## Activation

This skill activates when the user:
- Uses the `/icon` command
- Asks to generate, create, or make an icon
- Requests icon design or illustration

## Prerequisites

Before generating icons, verify the environment is set up:

```bash
# Check if EVM_PRIVATE_KEY is configured
test -n "$EVM_PRIVATE_KEY" && echo "Wallet configured" || echo "ERROR: EVM_PRIVATE_KEY not set"
```

If the private key is not set, inform the user they need to:
1. Export their EVM private key: `export EVM_PRIVATE_KEY="0x..."`
2. Ensure the wallet has USDC on Base mainnet (at least $0.35 per icon)

## Icon Generation Process

### Step 1: Validate the prompt
- Ensure the description is provided and under 100 characters
- If too long, summarize while preserving key visual elements

### Step 2: Generate the icon using x402 payment

First, locate the plugin directory (where this skill file is located), then run the generation script:

```bash
# Find the plugin directory and run the script
PLUGIN_DIR="$(dirname "$(dirname "$(dirname "$0")")")" && node "$PLUGIN_DIR/scripts/generate-icon.js" "<PROMPT>" <COUNT>
```

Or if running from the plugin directory directly:

```bash
node scripts/generate-icon.js "<PROMPT>" <COUNT>
```

Replace:
- `<PROMPT>`: The icon description (in quotes)
- `<COUNT>`: Number of icons (1-4, default 1)

**Important**: Ensure `npm install` has been run in the plugin directory first.

### Step 3: Handle the response

The script outputs JSON with the results. Parse it and present to the user:

**On success:**
- Display the icon URL(s)
- Mention download formats available: SVG, PNG, ICO
- Example download URLs:
  - `https://icon.new/api/v1/icons/{id}.svg`
  - `https://icon.new/api/v1/icons/{id}.png`
  - `https://icon.new/api/v1/icons/{id}.ico`

**On error:**
- If 402 with insufficient funds: Tell user to add USDC to their wallet on Base
- If wallet not configured: Guide them to set EVM_PRIVATE_KEY
- Other errors: Show the error message

## Example Interaction

User: "Generate an icon of a rocket ship"

1. Validate: "rocket ship" is under 100 chars ✓
2. Run: `node scripts/generate-icon.js "rocket ship" 1`
3. Present: "Here's your rocket ship icon: [URL]. Download as SVG, PNG, or ICO."

## Pricing

- $0.35 USDC per icon generation
- Payment processed automatically via x402 protocol on Base mainnet
- No account or API key required

## Supported Output Formats

| Format | Use Case |
|--------|----------|
| SVG | Scalable graphics, web |
| PNG | General purpose, transparent background |
| ICO | Windows application icons, favicons |
