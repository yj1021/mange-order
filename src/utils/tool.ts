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

export const getRandomNum = (min, max) => {
    return Math.floor(Math.random()* (max - min + 1) + min) 
}

export const getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}

export const getVal = (val) => (val > 9 ? val : '0' + val)

export const getTime = (num) => {
    if(!num) return
    let h = getVal(Math.round(num / 60 / 60))
    let m = getVal(Math.round(num / 60 % 60))
    let s = getVal(Math.round(num % 60))
    return h + '小时' + m + '分钟' + s + '秒'
}