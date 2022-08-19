export const createUsersTable = `
CREATE TABLE public.users
(
    id serial NOT NULL,
    email text NOT NULL,
    name text,
    img text,
    pro boolean NOT NULL DEFAULT FALSE,
    created timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated timestamp with time zone,
    deleted timestamp with time zone,
    PRIMARY KEY (id, email)
);

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;
`
