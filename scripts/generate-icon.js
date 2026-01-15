#!/usr/bin/env node

/**
 * Icon Generator with x402 Payment
 *
 * Generates icons using icon.new API with USDC payments on Base via x402 protocol.
 *
 * Usage: node generate-icon.js "<prompt>" [count]
 *
 * Environment: EVM_PRIVATE_KEY - Your wallet private key (with USDC on Base)
 */

import { wrapFetchWithPayment } from "@x402/fetch";
import { x402Client } from "@x402/fetch";
import { registerExactEvmScheme } from "@x402/evm/exact/client";
import { privateKeyToAccount } from "viem/accounts";

const ICON_API_URL = "https://icon.new/api/v1/generate";

async function generateIcon(prompt, count = 1) {
  // Validate environment
  const privateKey = process.env.EVM_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("EVM_PRIVATE_KEY environment variable not set. Please set it with your wallet private key.");
  }

  // Validate inputs
  if (!prompt || prompt.trim().length === 0) {
    throw new Error("Prompt is required");
  }
  if (prompt.length > 100) {
    throw new Error(`Prompt too long (${prompt.length} chars). Maximum is 100 characters.`);
  }
  if (count < 1 || count > 4) {
    throw new Error("Count must be between 1 and 4");
  }

  // Create signer from private key
  const formattedKey = privateKey.startsWith("0x") ? privateKey : `0x${privateKey}`;
  const signer = privateKeyToAccount(formattedKey);

  // Set up x402 client with EVM payment scheme
  const client = new x402Client();
  registerExactEvmScheme(client, { signer });

  // Wrap fetch with x402 payment handling
  const fetchWithPayment = wrapFetchWithPayment(fetch, client);

  // Make the API request
  const response = await fetchWithPayment(ICON_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt.trim(),
      count: count,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data;
}

// Main execution
const args = process.argv.slice(2);
const prompt = args[0];
const count = parseInt(args[1]) || 1;

if (!prompt) {
  console.error(JSON.stringify({
    success: false,
    error: "Usage: node generate-icon.js \"<prompt>\" [count]"
  }));
  process.exit(1);
}

generateIcon(prompt, count)
  .then((result) => {
    console.log(JSON.stringify({
      success: true,
      data: result
    }, null, 2));
  })
  .catch((error) => {
    console.error(JSON.stringify({
      success: false,
      error: error.message
    }));
    process.exit(1);
  });
