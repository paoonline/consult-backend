import { instanceToPlain } from "class-transformer";
import snakecaseKeys from "snakecase-keys";

export const formatSnakeCase = <T, R>(data: T): R => {
    const plainData = instanceToPlain(data);
    return snakecaseKeys(plainData) as R
 }
    
