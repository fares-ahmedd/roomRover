function NoteMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md my-3">
      <p className="text-gray-700 dark:text-gray-300 font-medium">
        <span className="text-blue-600 dark:text-blue-400 font-semibold">
          (Note){" "}
        </span>
        {children}
      </p>
    </div>
  );
}

export default NoteMessage;
