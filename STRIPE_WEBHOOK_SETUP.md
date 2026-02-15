# Stripe Webhook Setup

## Current Status
The `.env.local` file has a placeholder webhook secret: `STRIPE_WEBHOOK_SECRET="whsec_..."`

## Option 1: Stripe CLI (Recommended for Development)

1. **Install Stripe CLI** (installing now via Homebrew)
   ```bash
   brew install stripe/stripe-cli/stripe
   ```

2. **Login to Stripe**
   ```bash
   stripe login
   ```

3. **Start webhook listener** for development
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. **Copy the webhook signing secret** from the CLI output (starts with `whsec_`)

5. **Update .env.local**
   ```bash
   STRIPE_WEBHOOK_SECRET="whsec_[actual_secret_from_cli]"
   ```

## Option 2: Stripe Dashboard (Production)

1. Go to [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Set endpoint URL to: `https://openclaw.design/api/webhooks/stripe`
4. Select events to listen for:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the webhook signing secret (starts with `whsec_`)
6. Update production environment variables

## Required Events for the Marketplace

The webhook endpoint at `/api/webhooks/stripe` needs to handle:
- `checkout.session.completed` - Complete purchase in database
- `payment_intent.succeeded` - Confirm payment
- `payment_intent.payment_failed` - Handle failed payments

## Testing

Once configured, test with:
```bash
stripe trigger checkout.session.completed
```