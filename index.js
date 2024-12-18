const {diag, DiagConsoleLogger, DiagLogLevel, trace} = require("@opentelemetry/api");
const {NodeTracerProvider, SimpleSpanProcessor} = require("@opentelemetry/sdk-trace-node");
const {OTLPTraceExporter} = require("@opentelemetry/exporter-trace-otlp-proto");

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const provider = new NodeTracerProvider({
    spanProcessors: [new SimpleSpanProcessor(new OTLPTraceExporter({
        timeoutMillis: 100000000
    }))]
});
provider.register();

trace.getTracer('test').startSpan('foo').end();

async function shutdown() {
    try {
        await provider.shutdown();
        diag.debug('OpenTelemetry SDK terminated');
    } catch (error) {
        diag.error('Error terminating OpenTelemetry SDK', error);
    }
}

// Gracefully shutdown SDK if a SIGTERM is received
process.on('SIGTERM', shutdown);
// Gracefully shutdown SDK if Node.js is exiting normally
process.once('beforeExit', shutdown);

setTimeout(() => { console.log('Completed.'); }, 5000);
