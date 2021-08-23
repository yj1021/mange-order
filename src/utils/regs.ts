export const usernameRegs = { 
    rules: /^[a-zA-Z0-9_-]{4,16}$/, 
    farmat: '请输入4到16位（字母，数字，下划线，减号）' 
};

export const pwdRegs = {
  rules: /^[a-zA-Z0-9]{4,16}$/,
  farmat: '请输入任意4-16位字符',
};

export const telregs = {
    rules: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/,
    farmat: '请输入正确的手机号'
}

export const requiredRegs = {
  required: true,
  message: '',
};

export const IDRegs = {
  rules: /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  message: '请输入合法的身份证号码'
}
