import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

import Home from "./Home"
import About from "./About"
import Contact from "./Contact"
import Todos from "./Todos"
import Table from "./Table"

export default function Index() {
    return (
        <>
            <Header />
            <main>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='about' element={<About />} />
                <Route path='contact' element={<Contact />} />
                <Route path='todos' element={<Todos />} />
                <Route path='table' element={<Table />} />
                <Route path="*" element={<h1>404</h1>} />
            </Routes>
            </main>
            <Footer />
        </>
    )
}
