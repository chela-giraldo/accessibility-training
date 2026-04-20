import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { rdcUiTheme } from '@rdc-npm/rdc-ui'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(e) { return { error: e }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 32, fontFamily: 'monospace', color: 'red' }}>
          <strong>Render error:</strong><br />
          <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error?.stack || String(this.state.error)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider theme={rdcUiTheme}>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
)
