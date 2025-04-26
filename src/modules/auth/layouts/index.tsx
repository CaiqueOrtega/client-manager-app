export const metadata = {
  title: 'Autenticação – ClientManager',
  description: 'Acesse ou crie sua conta',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen items-center justify-center bg-gray-100 md:flex">
      <section className="flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-none bg-white shadow-none md:h-auto md:flex-row md:rounded-4xl md:shadow-2xl">
        {children}
      </section>
    </main>
  );
}
