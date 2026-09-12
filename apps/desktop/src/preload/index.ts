import { contextBridge, ipcRenderer } from 'electron'

export type HousePayload =
  | { mode: 'black' }
  | { mode: 'verse'; reference: string; text: string }

const api = {
  openDisplay: (): Promise<{ ok: boolean }> => ipcRenderer.invoke('display:open'),
  black: (): Promise<{ ok: boolean }> => ipcRenderer.invoke('display:black'),
  present: (payload: { reference: string; text: string }): Promise<{ ok: boolean }> =>
    ipcRenderer.invoke('house:present', payload),
  onDisplayClosed: (cb: () => void): (() => void) => {
    const listener = (): void => cb()
    ipcRenderer.on('display:closed', listener)
    return () => ipcRenderer.removeListener('display:closed', listener)
  },
  onHouseSet: (cb: (payload: HousePayload) => void): (() => void) => {
    const listener = (_: Electron.IpcRendererEvent, payload: HousePayload): void => cb(payload)
    ipcRenderer.on('house:set', listener)
    return () => ipcRenderer.removeListener('house:set', listener)
  }
}

contextBridge.exposeInMainWorld('cuehouse', api)

export type CuehouseApi = typeof api
