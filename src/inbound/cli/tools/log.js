module.exports = program => msg => {
    if (!program.quiet) console.log(msg);
    return msg;
};
