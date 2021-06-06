import Vue from 'vue'
import App from './App.vue'
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  Vue,
  dsn: "https://4be94c846626453a98bf72cb227a4895@o775953.ingest.sentry.io/5797233",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
