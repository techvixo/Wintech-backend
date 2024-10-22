const IdGenerator = {
    generateUserId: () => {
        return Math.floor(1000 + Math.random() * 9000)
    },
    generateCode: () => {
        return Math.floor(100000 + Math.random() * 900000)
    }
}


module.exports = IdGenerator;