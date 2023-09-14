/**
 * It simplifies communication with APIs by offering methods for common HTTP verbs (GET, POST, PUT, DELETE).
 *
 * @module HttpService
 */

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class HttpService {
  private instance: AxiosInstance;

  /**
   * Creates an instance of HttpService with a given base URL.
   *
   * @constructor
   * @param {string} baseURL - The base URL for API requests.
   */
  constructor(baseURL: string, customConfig?: AxiosRequestConfig) {
    this.instance = axios.create({
      baseURL,
      ...customConfig, // Merge user-provided configuration
    });
  }

  /**
   * Performs a GET request to the specified URL.
   *
   * @param {string} url - The URL to send the GET request to.
   * @returns {Promise<any>} The response data.
   */
  async get<T>(url: string): Promise<T | { error: boolean; message: string }> {
    try {
      const response = await this.instance.get<T>(url);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return {
          ...error.response.data,
          error: true,
          status: error.response.status,
        };
      } else {
        return { error: true, message: "Error desconocido" };
      }
    }
  }

  /**
   * Performs a POST request to the specified URL with data.
   *
   * @param {string} url - The URL to send the POST request to.
   * @param {any} data - The data to be sent in the request body.
   * @returns {Promise<any>} The response data.
   */
  async post<T>(
    url: string,
    data: any
  ): Promise<T | { error: boolean; message: string }> {
    try {
      const response = await this.instance.post<T>(url, data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return { ...error.response.data, error: true };
      } else {
        return { error: true, message: "Error desconocido" };
      }
    }
  }

  /**
   * Performs a PUT request to the specified URL with data.
   *
   * @param {string} url - The URL to send the PUT request to.
   * @param {any} data - The data to be sent in the request body.
   * @returns {Promise<any>} The response data.
   */
  async put<T>(
    url: string,
    data: any
  ): Promise<T | { error: boolean; message: string }> {
    try {
      const response = await this.instance.put<T>(url, data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return { ...error.response.data, error: true };
      } else {
        return { error: true, message: "Error desconocido" };
      }
    }
  }

  /**
   * Performs a DELETE request to the specified URL.
   *
   * @param {string} url - The URL to send the DELETE request to.
   */
  async delete(url: string): Promise<{ error: boolean; message: string }> {
    try {
      const response = await this.instance.delete(url);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return { ...error.response.data, error: true };
      } else {
        return { error: true, message: "Error desconocido" };
      }
    }
  }
}

export default HttpService;
