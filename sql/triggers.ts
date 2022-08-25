export const updateModifiedTimestamp = `
CREATE OR REPLACE FUNCTION update_modified_timestamp() RETURNS TRIGGER 
LANGUAGE plpgsql
AS
$$
BEGIN
    NEW.modified = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;
`


export const setUpdateTriggerOnTable= (tableName: string) => `
CREATE OR REPLACE TRIGGER tg_update_modified
    AFTER UPDATE ON ${tableName}
    FOR EACH ROW
    WHEN (OLD.* IS DISTINCT FROM NEW.*)
    EXECUTE FUNCTION update_modified_timestamp();
`