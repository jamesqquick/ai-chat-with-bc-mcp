import Chat from '@/components/chat';

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto pt-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="font-mono text-4xl">Welcome to Ecomm Chat</h1>
        <p className="text-center font-body">
          Your one-stop solution for all e-commerce inquiries.
        </p>
        <Chat />
      </main>
    </div>
  );
}
