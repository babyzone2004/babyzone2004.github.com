
import {observeScrollStop} from '../src/observeScrollStop.js';

observeScrollStop(window);
window.addEventListener('scrollStop', function() {
  console.log('scrollStop');
});