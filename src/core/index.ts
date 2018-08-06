import Koa from 'koa';
import Loader from './loader';
import Service from './base/service';
import Controller from './base/controller';

class Core extends Koa {
  loader;
  constructor() {
    super();
    this.loader = new Loader(this);
    this.init();
  }
  init() {
    // 初始化负责挂载service extend
    this.loader.load();
  }
}

export { Core, Service, Controller };
