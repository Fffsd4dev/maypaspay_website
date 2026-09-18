import { useEffect } from "react";
import { Link } from "react-router-dom";

import case2 from "../../../../assets/img/case-study-post/case-2.webp";
import case3 from "../../../../assets/img/case-study-post/case-3.webp";
import case4 from "../../../../assets/img/case-study-post/case-4.webp";
import case6 from "../../../../assets/img/case-study-post/case-6.webp";

export default function CaseProblems() {

    // For fslightbox
    useEffect(() => {
        if (typeof window.refreshFsLightbox === "function") {
            window.refreshFsLightbox();
        }
    }, []);

  return (
    <>
        <div className="pt-14 md:pt-20 lg:pt-24 xl:pt-25">
            <div className="container">
                <article className="prose prose-headings:my-5 mx-auto md:max-w-225 prose-p:text-paragraph_black prose-p:text-base md:prose-p:text-lg prose-li:text-paragraph_black prose-li:text-base md:prose-li:text-lg prose-h5:text-xl md:prose-h5:text-2xl prose-headings:text-title_black prose-headings:font-semibold prose-strong:font-semibold prose-strong:text-paragraph_black prose-strong:text-base md:prose-strong:text-lg prose-img:rounded-2xl prose-img:object-cover prose-content prose-p:leading-[1.5] prose-headings:leading-[1.4] prose-img:aspect-900/410">
                    <h2 className="hidden">For SEO</h2>
                    <h3 className="hidden">For SEO</h3>
                    <h4 className="hidden">For SEO</h4>
                    <h5>Problems</h5>
                    <p>While working on this project, I faced several key challenges that required creative problem-solving. One a the main issues was finding the right balance between visual appeal and usability, ensuring the design looked modern but remained easy to navigate for all users. Another challenge was organizing complex content in a way that felt intuitive and engaging. I also needed make sure the website performed smoothly across different devices and screen sizes, which involved careful testing and optimization.</p>
                    <strong>Key Benefits</strong>
                    <ul>
                        <li>Felis ut ultricies lacinia.</li>
                        <li>Mauris nec eros at ex luctus.</li>
                        <li>Suspendisse fringilla.</li>
                        <li>Lacinia porta vel eget erat.</li>
                    </ul>
                    <p>AI allows teams to make faster, smarter, and more informed decisions â€” turning data into actionable results.</p>
                    <Link to={case2} data-fslightbox="gallery">
                        <img src={case2} alt="blog-details" />
                    </Link>
                    <h5>Solutions</h5>
                    <p>To overcome these challenges, I focused on a user-centered design approach, prioritizing both aesthetics and a functionality. I created wireframes and prototypes to test different layouts, ensuring the final design was both visually appealing and easy to use. I implemented a clear content structure, using intuitive navigation and visual hierarchy to guide users through the site. Responsive design techniques were applied to guarantee smooth performance on all devices, and I conducted multiple rounds of testing to identify and fix any usability issues.</p>
                    <div className="grid sm:grid-cols-2 gap-7 md:gap-5 lg:gap-7 not-prose">
                        <div>
                            <Link to={case3} data-fslightbox="gallery">
                                <img src={case3} alt="blog-details" className="rounded-2xl object-cover w-full aspect-460/380 sm:aspect-460/500" />
                            </Link>
                        </div>
                        <div>
                            <Link to={case4} data-fslightbox="gallery">
                                <img src={case4} alt="blog-details" className="rounded-2xl object-cover w-full aspect-460/380 sm:aspect-460/500" />
                            </Link>
                        </div>
                    </div>
                    <h5>The Future Ahead</h5>
                    <p>AI is not a trend â€” itâ€™s a transformation that will define the next decade of innovation. From creative industries to scientific research, the collaboration between human talent and intelligent systems will unlock new possibilities.</p>
                    <strong>Ways Humans and AI Collaborate</strong>
                    <ul>
                        <li>Humans define goals â†’ AI accelerates execution.</li>
                        <li>AI analyzes data â†’ humans interpret context.</li>
                        <li>AI provides insights â†’ humans make ethical choices.</li>
                        <li>AI automates tasks â†’ humans innovate beyond them.</li>
                    </ul>
                    <p>The future is not humans versus AI, but humans plus AI â€” a partnership built on trust and shared progress.</p>
                    <Link to={case6} data-fslightbox="gallery">
                        <img src={case6} alt="blog-details" />
                    </Link>
                    <h6 className="hidden">For SEO</h6>
                </article>
            </div>
        </div>
    </>
  )
}
