export default function addBulkInsertPlaceholders(
    baseQuery: string, 
    placeholdersPerItem: number, 
    itemsLength: number
) {
    const placeholders: string[] = [];
    const totalPlaceholders = itemsLength * placeholdersPerItem;
    let placeholder = "";

    for(let i = 1; i <= totalPlaceholders; i++) {
        placeholder += `$${i}`;

        if(i % placeholdersPerItem === 0) {
            placeholders.push(`(${placeholder})`);
            placeholder = "";
        }
    }

    return `${baseQuery} ${placeholders.join(",")};`;
}