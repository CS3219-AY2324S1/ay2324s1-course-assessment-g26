'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  // temporary
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);
  useEffect(() => {
    const setupProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setupProviders();
  }, []);

  return (
    <nav className="flex justify-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-5 flex-center">
        <Image className="object-contain" src="/logo.svg" width={50} height={50}/>
        <p className="logo_txt">PeerPrep</p>
      </Link>
      {/* Show signin and signout */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3">
            <Link href="/create-question" className="black_btn">Create Question</Link>
            <button type="button" onClick={signOut}>Sign Out</button>
            <Link href="/profile">
              <Image src="/logo.svg" width={50} height={50} className="rounded-full"/>
            </Link>
          </div>
        ) : (
          <>
            {providers && 
              Object.values(providers).map((provider) => (
                <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="outline_btn">
                  Sign In
                </button>
              ))}
          </>
        )
        }
      </div>
    </nav>
  );
}

export default Nav;