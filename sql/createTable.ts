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
