import type { CuehouseApi } from '../../preload/index'

declare global {
  interface Window {
    cuehouse: CuehouseApi
  }
}

export {}
