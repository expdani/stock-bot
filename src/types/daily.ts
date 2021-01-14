/**
 * @type with a single daily item from the database.
 */
export type TypeDaily = {
    id: number;
    userID: string;
    updated_at: Date;
    created_at: Date;
};

/**
 * @type with the input for a new daily entry in the database
 */
export type TypeDailyInput = {
    userID: string;
    created_at: Date;
    updated_at: Date;
};
