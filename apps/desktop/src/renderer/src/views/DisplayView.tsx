import { useEffect, useState } from 'react'
import type { HousePayload } from '../../../preload/index'
import './display.css'

export function DisplayView(): React.JSX.Element {
  const [state, setState] = useState<HousePayload | { mode: 'empty' }>({ mode: 'empty' })

  useEffect(() => {
    if (!window.cuehouse) return
    return window.cuehouse.onHouseSet((payload) => setState(payload))
  }, [])

  if (state.mode === 'black' || state.mode === 'empty') {
    return <div className="display display--black" aria-label="House black" />
  }

  return (
    <div className="display display--verse">
      <p className="display__ref">{state.reference}</p>
      <p className="display__text">{state.text}</p>
    </div>
  )
}
