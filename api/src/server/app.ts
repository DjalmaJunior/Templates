import 'express-async-errors';
import express, { Express } from 'express'
import setupMiddlewares from './middlewares'

export default class App {
  private static instance: Express;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getApp() {
    if (!App.instance) {
      App.instance = express();
      
      setupMiddlewares(App.instance);
    }

    return App.instance;
  }
}
