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
    CONSTRAINT unique_id UNIQUE (id)
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
    CONSTRAINT unqiue_id UNIQUE (id)
        INCLUDE(id),
    CONSTRAINT unique_userid UNIQUE (userid)
        INCLUDE(userid),
    CONSTRAINT unique_invoiceid UNIQUE (invoiceid)
        INCLUDE(invoiceid),
    CONSTRAINT foreign_userid FOREIGN KEY (userid)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT foreign_invoiceid FOREIGN KEY (invoiceid)
        REFERENCES public.payment_status (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public.subscriptions
    OWNER to postgres;
`
