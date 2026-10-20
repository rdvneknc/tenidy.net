import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import { AdminAuthProvider } from './admin/AdminAuth'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import AdminLayout from './admin/AdminLayout'
import AdminLogin from './admin/Login'
import AdminDashboard from './admin/Dashboard'
import AdminVideos from './admin/Videos'
import AdminMessages from './admin/Messages'
import BlogAdmin from './admin/BlogAdmin'

export default function App() {
  return (
    <LanguageProvider>
      <AdminAuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
            </Route>

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="videos" element={<AdminVideos />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="blog" element={<BlogAdmin />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
    </LanguageProvider>
  )
}
