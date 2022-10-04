export const tableNames = ["public.users", "public.payment_status"]

export const createUsersTable = `
CREATE TABLE public.users
(
    id serial NOT NULL,
    name text,
    email text NOT NULL,
    img text,
    pro boolean NOT NULL DEFAULT FALSE,
    created timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    trust user_trust NOT NULL DEFAULT 'trust',
    modified timestamp with time zone,
    deleted timestamp with time zone,
    PRIMARY KEY (id, email),
    CONSTRAINT unique_user_id UNIQUE (id)
        INCLUDE(id),
    CONSTRAINT unique_email UNIQUE (email)
        INCLUDE(email)
);

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;
`

export const paymentStatusTable = `
CREATE TABLE public.payment_status
(
    id text NOT NULL,
    userid integer NOT NULL,
    provider payment_provider NOT NULL,
    status current_payment_status NOT NULL DEFAULT 'pending',
    created timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified timestamp with time zone,
    token text NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT unique_token_id UNIQUE (id, token)
        INCLUDE(id, token)
);

ALTER TABLE IF EXISTS public.payment_status
    OWNER to postgres;
`

export const subscriptionsTable = `
CREATE TABLE public.subscriptions
(
    id serial NOT NULL,
    invoiceid text NOT NULL,
    userid integer NOT NULL,
    provider payment_provider NOT NULL,
    date timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    address text,
    price real NOT NULL,
    discount real,
    tax real,
    total real NOT NULL,
    modified timestamp with time zone,
    PRIMARY KEY (id, invoiceid, userid),
    CONSTRAINT unique_subscription_id UNIQUE (id)
        INCLUDE(id),
    CONSTRAINT unique_invoiceid UNIQUE (invoiceid)
        INCLUDE(invoiceid),
    CONSTRAINT foreign_invoiceid FOREIGN KEY (invoiceid)
        REFERENCES public.payment_status (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public.subscriptions
    OWNER to postgres;
`

export const createPaypalPaymentsTable = `
CREATE TABLE public.paypal_payments
(
    id text NOT NULL,
    status text NOT NULL,
    email text NOT NULL,
    accountid text NOT NULL,
    firstname text NOT NULL,
    lastname text NOT NULL,
    address text,
    currency text NOT NULL,
    gross real NOT NULL,
    paypalfee real NOT NULL,
    total real NOT NULL,
    invoiceid text NOT NULL,
    created text NOT NULL,
    payer text NOT NULL,
    PRIMARY KEY (id, invoiceid),
    CONSTRAINT unique_paypal_id UNIQUE (id)
        INCLUDE(id),
    CONSTRAINT unique_subscription_invoiceid UNIQUE (invoiceid)
        INCLUDE(invoiceid),
    CONSTRAINT invoiceid FOREIGN KEY (invoiceid)
        REFERENCES public.subscriptions (invoiceid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public.paypal_payments
    OWNER to postgres;
`

export const createAssetTable = `
CREATE TABLE public.asset
(
    id serial NOT NULL,
    title text NOT NULL,
    fname text NOT NULL,
    type asset_type NOT NULL,
    likes integer NOT NULL DEFAULT 0,
    views integer NOT NULL DEFAULT 0,
    tags text[] NOT NULL,
    size bigint NOT NULL,
    length integer NOT NULL,
    storage text NOT NULL,
    orientation asset_orientation NOT NULL,
    created timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified timestamp with time zone,
    related integer[],
    thumbnail text,
    PRIMARY KEY (id, storage),
    CONSTRAINT unique_asset_id UNIQUE (id)
        INCLUDE(id),
    CONSTRAINT unique_asset_storage UNIQUE (storage)
        INCLUDE(storage)
);

ALTER TABLE IF EXISTS public.asset
    OWNER to postgres;
`

export const createVideoEntryTable = `
-- Table: public.video_entry

-- DROP TABLE IF EXISTS public.video_entry;

CREATE TABLE IF NOT EXISTS public.video_entry
(
    id integer NOT NULL DEFAULT nextval('video_entry_id_seq'::regclass),
    title text COLLATE pg_catalog."default" NOT NULL,
    fname text COLLATE pg_catalog."default" NOT NULL,
    type asset_type NOT NULL,
    size integer NOT NULL,
    tags text[] COLLATE pg_catalog."default" NOT NULL,
    mime text COLLATE pg_catalog."default" NOT NULL,
    scale integer[] NOT NULL,
    duration integer NOT NULL,
    fps integer,
    bitrate integer,
    location text COLLATE pg_catalog."default",
    uri text COLLATE pg_catalog."default" NOT NULL,
    thumbnail text COLLATE pg_catalog."default" NOT NULL,
    rating integer NOT NULL,
    CONSTRAINT video_entry_pkey PRIMARY KEY (id, uri, thumbnail),
    CONSTRAINT unique_video_entry_id UNIQUE (id)
        INCLUDE(id)
    CONSTRAINT unique_video_entry_uri UNIQUE (uri)
        INCLUDE(uri)
    CONSTRAINT unique_video_entry_thumbnail UNIQUE (thumbnail)
        INCLUDE(thumbnail)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.video_entry
    OWNER to postgres;
`
