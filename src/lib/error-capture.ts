// Captures unhandled errors for SSR error reporting

let lastCapturedError: unknown = undefined;

export function captureError(error: unknown) {
  lastCapturedError = error;
}

export function consumeLastCapturedError(): unknown {
  const error = lastCapturedError;
  lastCapturedError = undefined;
  return error;
}

// Attach global error handler
if (typeof globalThis !== "undefined") {
  const originalConsoleError = console.error;
  console.error = (...args: unknown[]) => {
    if (args[0] instanceof Error) {
      captureError(args[0]);
    }
    originalConsoleError.apply(console, args);
  };
}
