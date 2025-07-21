export const ERROR_TYPE = {
    ORG_NOT_SUPPORT : "Đơn vị không được hỗ trợ xem báo cáo này",
    BAD_REQUEST : "Lỗi API"
}

export class BaseError extends Error {
    constructor({ msg, description }) {
        super(msg)
        Object.setPrototypeOf(this, new.target.prototype)
        this.description = description
        Error.captureStackTrace(this);
    }
}