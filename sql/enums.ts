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

export const assetType = `
CREATE TYPE public.asset_type AS ENUM
    ('video', 'image', 'audio');

ALTER TYPE public.asset_type
    OWNER TO postgres;
`

export const assetOrientation = `
CREATE TYPE public.asset_orientation AS ENUM
    ('vertical', 'horizontal', '360');

ALTER TYPE public.asset_orientation
    OWNER TO postgres;
`
