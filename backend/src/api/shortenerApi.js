
// URL Shortener API with comprehensive logging
import { logger } from '../utils/logger.js';

const API_BASE_URL = 'http://localhost:8080/api'; 

/**
 * Shortens multiple URLs using the backend API
 * @param {Array<{originalUrl: string, validityMinutes?: number, shortcode?: string}>} urlsData
 * @returns {Promise<Array<Object>>} 
 */
export const shortenUrls = async (urlsData) => {
  // Log the start of the operation with context
  await logger.info('URL shortening operation initiated', { 
    urlCount: urlsData.length,
    operation: 'shortenUrls',
    apiEndpoint: `${API_BASE_URL}/shorten`
  });

  try {
    // Validate input data
    if (!Array.isArray(urlsData) || urlsData.length === 0) {
      await logger.warn('Invalid input data for URL shortening', {
        inputType: typeof urlsData,
        isArray: Array.isArray(urlsData),
        length: urlsData?.length
      });
      throw new Error('URL data must be a non-empty array');
    }

    await logger.debug('Making API request to shorten URLs', {
      requestBody: urlsData,
      method: 'POST',
      contentType: 'application/json'
    });

    const response = await fetch(`${API_BASE_URL}/shorten`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(urlsData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      await logger.error('URL shortening API request failed', { 
        httpStatus: response.status,
        statusText: response.statusText,
        errorResponse: errorData,
        requestData: urlsData
      });
      throw new Error(errorData.message || `HTTP ${response.status}: Failed to shorten URLs`);
    }

    const results = await response.json();
    
    await logger.info('URLs shortened successfully', { 
      inputUrlCount: urlsData.length,
      resultCount: results.length,
      operation: 'shortenUrls',
      success: true
    });

    return results;
  } catch (error) {
    // Check if it's a network error vs API error
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      await logger.fatal('Network connectivity issue during URL shortening', {
        operation: 'shortenUrls',
        errorType: 'NetworkError',
        errorMessage: error.message,
        apiUrl: `${API_BASE_URL}/shorten`
      });
    } else {
      await logger.error('Unexpected error during URL shortening operation', {
        operation: 'shortenUrls', 
        errorType: error.name,
        errorMessage: error.message,
        stack: error.stack
      });
    }
    throw error;
  }
};

/**
 * Fetches URL statistics from the backend API
 * @returns {Promise<Array<Object>>} 
 */
export const getStatistics = async () => {
  await logger.info('Statistics retrieval operation initiated', {
    operation: 'getStatistics',
    apiEndpoint: `${API_BASE_URL}/stats`
  });

  try {
    await logger.debug('Making API request to fetch statistics', {
      method: 'GET',
      endpoint: '/stats'
    });

    const response = await fetch(`${API_BASE_URL}/stats`);

    if (!response.ok) {
      const errorData = await response.json();
      await logger.error('Statistics API request failed', { 
        httpStatus: response.status,
        statusText: response.statusText,
        errorResponse: errorData
      });
      throw new Error(errorData.message || `HTTP ${response.status}: Failed to fetch statistics`);
    }

    const stats = await response.json();
    
    await logger.info('Statistics fetched successfully', { 
      operation: 'getStatistics',
      statisticsCount: Array.isArray(stats) ? stats.length : 'N/A',
      dataType: typeof stats,
      success: true
    });

    return stats;
  } catch (error) {
    // Check if it's a network error vs API error
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      await logger.fatal('Network connectivity issue during statistics fetch', {
        operation: 'getStatistics',
        errorType: 'NetworkError',
        errorMessage: error.message,
        apiUrl: `${API_BASE_URL}/stats`
      });
    } else {
      await logger.error('Unexpected error during statistics fetch operation', {
        operation: 'getStatistics',
        errorType: error.name,
        errorMessage: error.message,
        stack: error.stack
      });
    }
    throw error;
  }
};