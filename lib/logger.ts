/**
 * Environment-aware logger utility
 * Logs messages only in development mode, silent in production
 */

type LogLevel = 'log' | 'error' | 'warn' | 'info';

interface Logger {
  log: (message: string, ...args: unknown[]) => void;
  error: (message: string, error?: unknown) => void;
  warn: (message: string, ...args: unknown[]) => void;
  info: (message: string, ...args: unknown[]) => void;
}

const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Logs a message to the console only in development mode
 * @param level - The log level (log, error, warn, info)
 * @param message - The message to log
 * @param args - Additional arguments to log
 */
function logMessage(level: LogLevel, message: string, ...args: unknown[]): void {
  if (isDevelopment) {
    console[level](message, ...args);
  }
  // In production, we could send to an error tracking service (e.g., Sentry)
  // if (level === 'error' && !isDevelopment) {
  //   // Send to error tracking service
  // }
}

/**
 * Logger instance with environment-aware logging
 * Only logs in development, silent in production
 */
export const logger: Logger = {
  /**
   * Log a general message (development only)
   */
  log: (message: string, ...args: unknown[]) => {
    logMessage('log', message, ...args);
  },

  /**
   * Log an error message (development only)
   * In production, you could integrate with error tracking services
   */
  error: (message: string, error?: unknown) => {
    logMessage('error', message, error);
  },

  /**
   * Log a warning message (development only)
   */
  warn: (message: string, ...args: unknown[]) => {
    logMessage('warn', message, ...args);
  },

  /**
   * Log an informational message (development only)
   */
  info: (message: string, ...args: unknown[]) => {
    logMessage('info', message, ...args);
  },
};
