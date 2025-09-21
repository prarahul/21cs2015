// Frontend logger utility that uses the logging middleware
import { Log } from '../../../middleware/src/logger.js';

/**
 * Frontend logger wrapper that provides a simple interface for frontend logging
 */
export const logger = {
  /**
   * Log informational messages
   * @param {string} message - The log message
   * @param {Object} context - Additional context data
   */
  info: async (message, context = {}) => {
    await Log('frontend', 'info', 'frontend-app', message, context);
  },
  
  /**
   * Log warning messages
   * @param {string} message - The log message
   * @param {Object} context - Additional context data
   */
  warn: async (message, context = {}) => {
    await Log('frontend', 'warn', 'frontend-app', message, context);
  },
  
  /**
   * Log error messages
   * @param {string} message - The log message
   * @param {Object} context - Additional context data
   */
  error: async (message, context = {}) => {
    await Log('frontend', 'error', 'frontend-app', message, context);
  },

  /**
   * Log debug messages
   * @param {string} message - The log message
   * @param {Object} context - Additional context data
   */
  debug: async (message, context = {}) => {
    await Log('frontend', 'debug', 'frontend-app', message, context);
  },

  /**
   * Log fatal messages
   * @param {string} message - The log message
   * @param {Object} context - Additional context data
   */
  fatal: async (message, context = {}) => {
    await Log('frontend', 'fatal', 'frontend-app', message, context);
  }
};