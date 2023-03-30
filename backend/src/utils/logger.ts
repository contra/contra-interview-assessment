import winston from 'winston';

const logger = winston.createLogger({
  defaultMeta: { service: 'cool-feature-flag' },
  format: winston.format.json(),
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export default logger;
