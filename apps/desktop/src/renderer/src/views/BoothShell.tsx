import type { HouseState, InputMode, Phase } from '../App'
import './booth.css'

type Props = {
  phase: Phase
  inputMode: InputMode
  onInputMode: (m: InputMode) => void
  displayConnected: boolean
  listening: boolean
  micError: string | null
  house: HouseState
  query: string
  onQuery: (q: string) => void
  sample: { reference: string; text: string }
  onOpenDisplay: () => void
  onStartListening: () => void
  onStartManual: () => void
  onStopListening: () => void
  onBlack: () => void
  onPresent: () => void
  onPresentManual: () => void
  onSwitchToManual: () => void
  onSimulateMicFail: () => void
  onBackReady: () => void
}

export function BoothShell(props: Props): React.JSX.Element {
  const {
    phase,
    inputMode,
    onInputMode,
    displayConnected,
    listening,
    micError,
    house,
    query,
    onQuery,
    sample,
    onOpenDisplay,
    onStartListening,
    onStartManual,
    onStopListening,
    onBlack,
    onPresent,
    onPresentManual,
    onSwitchToManual,
    onSimulateMicFail,
    onBackReady
  } = props

  const status =
    phase === 'ready' ? 'READY' : listening ? 'LISTENING' : inputMode === 'manual' ? 'MANUAL' : 'LIVE'

  return (
    <div className="booth">
      <header className="booth__header">
        <div className="booth__header-left">
          <span className={`badge badge--${status.toLowerCase()}`}>{status}</span>
          <strong>CueHouse Live</strong>
          {phase === 'live' && (
            <div className="mode-switch" role="tablist" aria-label="Input mode">
              <button
                type="button"
                role="tab"
                aria-selected={inputMode === 'listen'}
                className={inputMode === 'listen' ? 'mode-switch__btn is-active' : 'mode-switch__btn'}
                onClick={() => onInputMode('listen')}
              >
                Listen
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={inputMode === 'manual'}
                className={inputMode === 'manual' ? 'mode-switch__btn is-active' : 'mode-switch__btn'}
                onClick={() => onInputMode('manual')}
              >
                Manual
              </button>
            </div>
          )}
        </div>
        <div className="booth__header-right">
          <span className="muted">{new Date().toLocaleTimeString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' })}</span>
          <button type="button" className="btn btn--secondary" onClick={onOpenDisplay}>
            {displayConnected ? 'Display connected' : 'Open Display'}
          </button>
        </div>
      </header>

      {phase === 'ready' ? (
        <main className="ready">
          <h1>Ready for service</h1>
          <p>
            Open Display on the house screen, then start listening — or jump to Manual if the mic
            path is unreliable tonight.
          </p>
          <div className="ready__actions">
            <button type="button" className="btn btn--primary btn--lg" onClick={onStartListening}>
              Start listening
            </button>
            <button type="button" className="btn btn--ghost btn--lg" onClick={onStartManual}>
              Start in Manual
            </button>
          </div>
        </main>
      ) : (
        <main className="live">
          <section className="live__input" aria-label="Input">
            {micError && (
              <div className="banner banner--warn" role="alert">
                <p>{micError}</p>
                <button type="button" className="btn btn--primary" onClick={onSwitchToManual}>
                  Switch to Manual
                </button>
              </div>
            )}

            {inputMode === 'listen' ? (
              <div className="pane">
                <div className="pane__label">Live transcript</div>
                <div className="transcript">
                  {listening
                    ? '…listening to pulpit. (STT stub — Present uses sample Romans 8:28)'
                    : 'Listening stopped. Resume or switch to Manual.'}
                </div>
                <div className="pane__label">Recent detections</div>
                <article className="card card--suggested">
                  <div className="card__meta">
                    <span className="chip">SUGGESTED</span>
                    <span className="conf">90%</span>
                  </div>
                  <h2>{sample.reference}</h2>
                  <p>{sample.text.slice(0, 72)}…</p>
                  <button type="button" className="btn btn--primary btn--block" onClick={onPresent}>
                    Present
                  </button>
                  <button type="button" className="btn btn--ghost btn--block">
                    Queue
                  </button>
                </article>
                <div className="row">
                  {listening ? (
                    <button type="button" className="btn btn--danger" onClick={onStopListening}>
                      Stop listening
                    </button>
                  ) : (
                    <button type="button" className="btn btn--primary" onClick={onStartListening}>
                      Resume listening
                    </button>
                  )}
                  <button type="button" className="btn btn--ghost" onClick={onSimulateMicFail}>
                    Simulate mic fail
                  </button>
                </div>
              </div>
            ) : (
              <div className="pane">
                <div className="pane__label">Manual scripture</div>
                <label className="field">
                  <span>Reference</span>
                  <input
                    value={query}
                    onChange={(e) => onQuery(e.target.value)}
                    placeholder="e.g. John 3:16"
                    autoFocus
                  />
                </label>
                <article className="card">
                  <h2>{sample.reference}</h2>
                  <p>{sample.text}</p>
                  <button
                    type="button"
                    className="btn btn--primary btn--block"
                    onClick={onPresentManual}
                  >
                    Present
                  </button>
                </article>
                <p className="hint">Traditional path — type or paste when listen misses.</p>
              </div>
            )}
          </section>

          <section className="live__house" aria-label="On house now">
            <div className="pane__label">On house now</div>
            <div className="preview">
              {house.mode === 'verse' ? (
                <>
                  <p className="preview__ref">{house.reference}</p>
                  <p className="preview__text">{house.text}</p>
                </>
              ) : house.mode === 'black' ? (
                <p className="muted">BLACK</p>
              ) : (
                <p className="muted">Nothing on house yet</p>
              )}
            </div>
            <p className="hint">One preview · Confirm mode</p>
          </section>
        </main>
      )}

      <footer className="booth__bar">
        <div className="row">
          <button type="button" className="btn btn--danger" onClick={onBlack}>
            BLACK
          </button>
          {phase === 'live' && (
            <button type="button" className="btn btn--ghost" onClick={onBackReady}>
              End live
            </button>
          )}
        </div>
        <span className="hint">
          Listen + Manual share one house · Present → display · Esc BLACK (soon)
        </span>
      </footer>
    </div>
  )
}
