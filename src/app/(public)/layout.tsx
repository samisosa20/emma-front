'use client';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';

// Component
import useComponents from './components';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { Header, Footer } = useComponents();
  return (
    <div>
      <IonApp>
        <Header />
        {children}
        <Footer/>
      </IonApp>
    </div>
  );
}
