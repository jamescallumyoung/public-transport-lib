module.exports = log => (items = []) => {
    if (items.length) log(`👍 Found ${items.length}:`);
    else log(`👎 None found`);

    return items;
};
