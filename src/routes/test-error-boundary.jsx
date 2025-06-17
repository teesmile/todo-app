export const Route = createFileRoute("/test-error")({
  component: ErrorTestPage,
});

function ErrorTestPage() {
  const throwError = () => {
    throw new Error("This is a test error for Error Boundary");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Error Boundary Test</h1>
      <button
        onClick={throwError}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Trigger Error
      </button>
    </div>
  );
}