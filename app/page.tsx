import ThemeSwitch from "@/components/ThemeSwitch";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <h1 className="text-black dark:text-white">Hello, Next.js!</h1>
      <ThemeSwitch />
    </div>
  );
}
