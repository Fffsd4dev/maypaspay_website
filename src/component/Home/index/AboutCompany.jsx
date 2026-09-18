import icon01 from "../../../assets/img/home-v1/about/icon-01.svg";
import icon02 from "../../../assets/img/home-v1/about/icon-02.svg";
import icon03 from "../../../assets/img/home-v1/about/icon-03.svg";

export default function AboutCompany() {

    const abouts = [
        {
            img : icon01, 
            title : 'Integrity Trust', 
            desc : 'Security is our core foundation. We utilize multi-layer encryption, cold-storage custody, and biometrics to ensure your assets remain protected.',
        },
        {
            img : icon02, 
            title : 'Innovation Vision', 
            desc : 'We don"t just process transactions; we build ecosystems. From AI-driven automated savings tools to instant cross-border settlement.',
        },
        {
            img : icon03, 
            title : 'Collaboration Teamwork', 
            desc : 'Success is a shared journey. Our platform is designed to scale with you, providing the collaborative tools and 24/7 human support.',
        }
    ];

  return (
    <>
        {abouts.map((item, index)=>(
            <div className="" data-sttr-card key={index}>
                <img className="w-12.5 h-12.5"  src={item.img} alt={item.title} />
                <h3 className="mt-6 sm:mt-9 text-title_black text-xl md:text-2xl font-semibold leading-tight!">{item.title}</h3>
                <p className="mt-3 paragraph_black">{item.desc}</p>
            </div>
        ))}
    </>
  )
}
