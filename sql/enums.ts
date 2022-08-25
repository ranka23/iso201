export const paymentStatus = `
CREATE TYPE public.current_payment_status AS ENUM
    ('pending', 'completed', 'canceled', 'errored');

ALTER TYPE public.current_payment_status
    OWNER TO postgres;
`

export const paymentProvider = `
CREATE TYPE public.payment_provider AS ENUM
    ('paypal', 'solana');

ALTER TYPE public.payment_provider
    OWNER TO postgres;
`