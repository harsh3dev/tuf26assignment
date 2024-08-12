"use client";
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import Link from 'next/link';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { ModeToggle } from './ModeToggle';
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);

    
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const cookies = parseCookies();
                const token = cookies.authToken;
                // console.log(token);
                console.log(cookies);
                
                if (!token) {
                router.push('/login');
                return;
                }
                const decoded: any = jwt.decode(token);
        
                if (decoded?.admin) {
                    setIsAdmin(true);
                } 

                const response = await axios.get('/api/verify-token', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                });        
                if (response.status === 200) {
                setIsAuthenticated(true);
                } else {
                router.push('/login');
                }
            } catch (error) {
                console.error('Error checking authentication', error);
                router.push('/login');
            }
            };        
            checkAuth();
        }, [router]);

    return (
        <header className="min-h-[5rem] w-full bg-background flex justify-between items-center p-4 px-6 border border-b border-primary border-t-0 border-l-0 border-r-0 ">
            <Link href={'/'} className=" grid place-items-center " >
                <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#D41F30"></circle><g clipPath="url(#clip0_494_919)"><path d="M4 41.9294H14.2462L10.3554 62H18.5579L22.1417 41.9294H32.1674L32.9421 38H4.7811L4 41.9294Z" fill="white"></path><path d="M35.5295 38L32.3408 55.9626L37.3233 62H59.2493L63.4351 38H55.4127L51.8748 58.0054H41.9079L40.3136 56.0618L43.403 38H35.5295Z" fill="white"></path><path d="M61.9521 62H69.8523L71.1324 53.9767H91.1276L91.9216 49.9995H71.8832L72.8094 43.9575L75.1491 41.8825H85.3456L84.5508 45.9874H92.54L93.9524 38H72.1037L65.0857 44.0016L61.9521 62Z" fill="white"></path></g><defs><clipPath id="clip0_494_919"><rect width="89.9521" height="24" fill="white" transform="translate(4 38)"></rect></clipPath></defs></svg>
            </Link>
            <div className='flex justify-center items-center gap-4'>


                <Link target='_blank' href="https://github.com/harsh3dev/tuf26assignment" className='text-2xl' >
                <FaGithub />
                </Link>
                <ModeToggle />

                {
                    isAuthenticated && isAdmin ? <Button onClick={()=>router.push('/admin')} variant="default" className="bg-primary hover:bg-secondary text-white text-lg font-semibold " >Admin Dashboard</Button> :
                    <Button onClick={()=>router.push('/login')} variant="default" className="bg-primary hover:bg-secondary text-white text-lg font-semibold " >Admin Login</Button>
                }
                
                
            </div>
        </header>
    )
}

export default Navbar
