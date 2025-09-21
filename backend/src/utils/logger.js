// Backend logger utility that uses the logging middleware
import { Log } from '../../middleware/src/logger.js';

/**
 * Backend logger wrapper that provides a simple interface for backend logging
 */
export const logger = {
  /**
   * Log informational messages
   * @param {string} message - The log message
   * @param {Object} context - Additional context data
   */
  info: async (message, context = {}) => {
    await Log('backend', 'info', 'shortener-api', message, context);
  },

  /**
   * Log warning messages
   * @param {string} message - The log message
   * @param {Object} context - Additional context data
   */
  warn: async (message, context = {}) => {
    await Log('backend', 'warn', 'shortener-api', message, context);
  },

  /**
   * Log error messages
   * @param {string} message - The log message
   * @param {Object} context - Additional context data
   */
  error: async (message, context = {}) => {
    await Log('backend', 'error', 'shortener-api', message, context);
  },

  /**
   * Log debug messages
   * @param {string} message - The log message
   * @param {Object} context - Additional context data
   */
  debug: async (message, context = {}) => {
    await Log('backend', 'debug', 'shortener-api', message, context);
  },

  /**
   * Log fatal messages
   * @param {string} message - The log message
   * @param {Object} context - Additional context data
   */
  fatal: async (message, context = {}) => {
    await Log('backend', 'fatal', 'shortener-api', message, context);
  }
};