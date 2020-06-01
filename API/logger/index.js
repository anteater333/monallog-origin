// 코드 분석 할것.
// Ref. https://lovemewithoutall.github.io/it/winston-example/

const { createLogger, format, transports } = require('winston')
require('winston-daily-rotate-file')
const fs = require('fs')

const env = process.env.NODE_ENV || 'development'
const logDir = "./_logs"

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir)
}

const dailyRotateFileTransport = new transports.DailyRotateFile({
    level: 'debug',
    filename: `${logDir}/%DATE%-monallog-server.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m', // 20mb
    maxFiles: '14d' // 14일
})

const logger = createLogger({
    level: env === 'development' ? 'debug' : 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DDS HH:mm:ss'
        }),
        format.json()
    ),
    transports: [
        new transports.Console({
            level: 'info',
            format: format.combine(
                format.colorize(),
                format.printf(
                    info => `${info.timestamp} ${info.level}: ${info.message}`
                )
            )
        }),
        dailyRotateFileTransport
    ]
})

module.exports = logger