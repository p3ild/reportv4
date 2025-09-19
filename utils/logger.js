class Logger {
    dev(...args) {
        if (import.meta.env.DEV) {
            console.log(...args)
        }
    }

    warn(...args) {
        console.warn(...args)
    }

    info(...args) {
        console.info(...args)
    }
}

export const logger = new Logger();