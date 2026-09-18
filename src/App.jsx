import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom"
import ComingSoon from "./pages/coming-soon.jsx";

const IndexTwo = lazy(() => import("./pages/index-two.jsx"));
const AboutUs = lazy(() => import("./pages/about-us.jsx"));
const Service = lazy(() => import("./pages/services.jsx"));
const Contact = lazy(() => import("./pages/contact.jsx"));
const Error = lazy(() => import("./pages/404.jsx"));
const SignIn = lazy(() => import("./pages/sign-in.jsx"));
const ResetPassword = lazy(() => import("./pages/reset-password.jsx"));
const Blog = lazy(() => import("./pages/blog.jsx"));
const BlogPost1 = lazy(() => import("./pages/blog-post-1.jsx"));
const BlogPost2 = lazy(() => import("./pages/blog-post-2.jsx"));
const BlogPost3 = lazy(() => import("./pages/blog-post-3.jsx"));
const BlogGenre = lazy(() => import("./pages/blog-genre.jsx"));
const BlogAuthor = lazy(() => import("./pages/blog-author.jsx"));
const Disclaimer = lazy(() => import("./pages/disclaimer.jsx"));


function App() {

  return (
    <>
      <Suspense>
        {/* ROUTES */}
        <Routes>
          <Route path='/' element={<IndexTwo /> } />

          <Route path='/about-us' element={<AboutUs /> } />
          <Route path='/services' element={<Service /> } />
          <Route path='/contact' element={<Contact /> } />

          <Route path='/404' element={<Error /> } />
          <Route path='/coming-soon' element={<ComingSoon /> } />

          <Route path='/sign-in' element={<SignIn /> } />
          <Route path='/reset-password' element={<ResetPassword /> } />
          

          <Route path='/blog' element={<Blog /> } />

          <Route path='/blog-post-1' element={<BlogPost1 /> } />
          <Route path="/blog-post-1/:id/:title" element={<BlogPost1 />} />

          <Route path='/blog-post-2' element={<BlogPost2 /> } />
          <Route path='/blog-post-3' element={<BlogPost3 /> } />
          <Route path='/blog-genre' element={<BlogGenre /> } />
          <Route path='/blog-author' element={<BlogAuthor /> } />


          <Route path='/privacy-policy' element={<Disclaimer /> } />

          {/* Catch-all: redirect any unmatched URL to /404 */}
          <Route path='*' element={<Navigate to="/404" replace />} />

        </Routes>
      </Suspense>
    </>
  )
}

export default App