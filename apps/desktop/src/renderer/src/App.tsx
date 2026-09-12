import { useEffect, useMemo, useState } from 'react'
import { DisplayView } from './views/DisplayView'
import { BoothShell } from './views/BoothShell'

export type InputMode = 'listen' | 'manual'
export type Phase = 'ready' | 'live'

export type HouseState =
  | { mode: 'empty' }
  | { mode: 'black' }
  | { mode: 'verse'; reference: string; text: string }

const SAMPLE = {
  reference: 'ROMANS 8:28',
  text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.'
}

export default function App(): React.JSX.Element {
  const isDisplay = useMemo(() => window.location.hash.includes('/display'), [])

  const [phase, setPhase] = useState<Phase>('ready')
  const [inputMode, setInputMode] = useState<InputMode>('listen')
  const [displayConnected, setDisplayConnected] = useState(false)
  const [listening, setListening] = useState(false)
  const [micError, setMicError] = useState<string | null>(null)
  const [house, setHouse] = useState<HouseState>({ mode: 'empty' })
  const [query, setQuery] = useState('Romans 8:28')

  useEffect(() => {
    if (!window.cuehouse) return
    const offClosed = window.cuehouse.onDisplayClosed(() => {
      setDisplayConnected(false)
    })
    return offClosed
  }, [])

  if (isDisplay) {
    return <DisplayView />
  }

  async function openDisplay(): Promise<void> {
    await window.cuehouse?.openDisplay()
    setDisplayConnected(true)
  }

  async function black(): Promise<void> {
    await window.cuehouse?.black()
    setHouse({ mode: 'black' })
  }

  async function present(reference: string, text: string): Promise<void> {
    if (!displayConnected) await openDisplay()
    await window.cuehouse?.present({ reference, text })
    setHouse({ mode: 'verse', reference, text })
  }

  function enterLive(mode: InputMode): void {
    setPhase('live')
    setInputMode(mode)
    setListening(mode === 'listen')
    setMicError(null)
    // Slice 1: no real STT — Present uses sample verse. Mic fail is simulated in UI.
  }

  function startListening(): void {
    enterLive('listen')
  }

  function startManual(): void {
    enterLive('manual')
  }

  function stopListening(): void {
    setListening(false)
  }

  function simulateMicFail(): void {
    setListening(false)
    setMicError('Mic not picking up — check input device or switch to Manual.')
  }

  return (
    <BoothShell
      phase={phase}
      inputMode={inputMode}
      onInputMode={setInputMode}
      displayConnected={displayConnected}
      listening={listening}
      micError={micError}
      house={house}
      query={query}
      onQuery={setQuery}
      sample={SAMPLE}
      onOpenDisplay={openDisplay}
      onStartListening={startListening}
      onStartManual={startManual}
      onStopListening={stopListening}
      onBlack={black}
      onPresent={() => present(SAMPLE.reference, SAMPLE.text)}
      onPresentManual={() => present(SAMPLE.reference, SAMPLE.text)}
      onSwitchToManual={() => {
        setMicError(null)
        setInputMode('manual')
        setListening(false)
      }}
      onSimulateMicFail={simulateMicFail}
      onBackReady={() => {
        setPhase('ready')
        setListening(false)
        setMicError(null)
      }}
    />
  )
}
