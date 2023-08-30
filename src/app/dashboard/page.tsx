import Image from 'next/image';

import imgLogo from '../../../public/img/logo.png';

export default function Home() {
  return (
    <div className="grid grid-cols-[200px_1fr] h-screen">
    {/* Barra de navegación en el lado izquierdo */}
    <aside className="bg-primary p-4">
      <Image src={imgLogo} alt='Logo fiona' />
      <ul className="mt-4 text-white">
        <li className="mb-2">Movimientos</li>
        <li className="mb-2">Cuentas</li>
        <li className="mb-2">Eventos</li>
      </ul>
    </aside>

    {/* Contenido en el lado derecho */}
    <main className="p-4">
      <h1 className="text-2xl font-semibold">Contenido Principal</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
    </main>
  </div>
  );
}
