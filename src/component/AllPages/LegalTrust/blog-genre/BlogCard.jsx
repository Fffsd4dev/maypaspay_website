import { Link } from "react-router-dom";
import { blogData } from "../../../../data/data";

import arrow from "../../../../assets/img/menu/arrow.svg";

export default function BlogCard() {
  return (
    <>
        {blogData.slice(0, 6).map((item, index)=>(
            <div className="" data-sttr-card key={index}>
                <div className="blog-card rounded-2xl overflow-hidden relative group block">
                    <Link to={`/blog-post-1/${item.id}/${item.title.replace(/\s+/g, '-').toLowerCase()}`}>
                        <img className="w-full h-full object-center aspect-410/520 duration-1000 group-hover:transform-[skew(-5deg,5deg)_scale(1.2)]" src={item.img} alt={item.title} />
                    </Link>
                    <div className="absolute z-3 bottom-0 left-0 w-full p-4">
                        <div className="px-4 py-5 duration-300 group-hover:pb-0! rounded-2xl group-hover:rounded-none bg-white/70 group-hover:bg-transparent backdrop-blur-[34px] group-hover:backdrop-blur-none">
                            <Link to="/blog-genre" className="text-sm leading-none font-semibold text-secondary duration-300 group-hover:text-primary hover:text-white">{item.tag}</Link>
                            <h3 className="mt-3 text-title_black text-xl md:text-2xl font-semibold duration-300 group-hover:text-white">
                                <Link className="text-inherit white-underline-single" to={`/blog-post-1/${item.id}/${item.title.replace(/\s+/g, '-').toLowerCase()}`}>{item.title}</Link>
                            </h3>
                        </div>
                    </div>
                    <Link to={`/blog-post-1/${item.id}/${item.title.replace(/\s+/g, '-').toLowerCase()}`} className="arrow-icon w-15 h-15 rounded-full flex items-center justify-center bg-primary absolute top-[35%] left-1/2 transform -translate-x-1/2 z-3 duration-500 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100">
                        <img src={arrow} alt="arrow" />
                    </Link>
                </div>			
            </div>
        ))}
    </>
  )
}
