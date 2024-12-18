# Reproducer for [#5260](https://github.com/open-telemetry/opentelemetry-js/issues/5260)

How to run:
- `npm ci`
- `npm run otelcol` (starts collector)
- `npm run bun` (export times out immediately)
  - check collector logs, nothing was exported
- `npm run node` (export does not time out and completes successfully)
  - check collector logs, span was exported correctly