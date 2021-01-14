import database from "../../database/index";
import {TypeDaily, TypeDailyInput} from "../../types/daily";

/**
 * Get daily data from database.
 */
export async function getDaily(userID: string): Promise<TypeDaily> {
    return database("daily").where({userID}).first();
}

/**
 * If user cooldown is not in the database, add it
 */
export async function initiateDaily(userID: string): Promise<TypeDaily> {
    const now = new Date();
    const input: TypeDailyInput = {
        userID,
        created_at: now,
        updated_at: now,
    };

    // Insert and return data
    const [id] = await database("daily").insert(input);
    return {...input, id: id};
}

/**
 * Updates updated_at to now
 */
export async function updateDaily(userID: string) {
    const daily = await getDaily(userID);

    const now = new Date();
    const newDaily = {
        ...daily,
        updated_at: now,
    };

    await database("daily").where({userID}).update(newDaily);

    return newDaily;
}
