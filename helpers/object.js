module.exports = {
    printKeys(obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const element = obj[key];
                console.log(key, typeof element)
            }
        }

    }
}