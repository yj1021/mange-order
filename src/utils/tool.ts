export const validator = (rule, value, callback, regs) => {
    // if(!value) return
    let { rules, farmat } = regs
    if(rules.test(value)) {
        // return Promise.resolve()
        callback()
    }else{
        // return Promise.reject(farmat)
        callback(farmat)
    }
}