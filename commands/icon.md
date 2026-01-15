# /icon Command

Generate AI-powered icons using the icon.new service with x402 USDC payments on Base.

## Usage

```
/icon [description]
```

## Examples

```
/icon rocket ship launching into space
/icon shopping cart with sparkles
/icon minimalist mountain landscape
/icon abstract geometric pattern
```

## Parameters

- **description**: A text description of the icon you want to generate (max 100 characters)

## Payment

This command uses x402 protocol to pay $0.35 USDC per icon on Base mainnet. Ensure your `EVM_PRIVATE_KEY` environment variable is set with a wallet containing USDC on Base.

## Output

Returns the generated icon URL which can be downloaded in SVG, PNG, or ICO format.
