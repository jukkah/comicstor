import 'regenerator-runtime/runtime'

// Polyfill fetch into the global namespace if required.
import 'isomorphic-fetch'

import injectTapEventPlugin from 'react-tap-event-plugin'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()
