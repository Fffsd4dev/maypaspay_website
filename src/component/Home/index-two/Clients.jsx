import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

import 'swiper/css'

import clientReviews1 from "../../../assets/img/services/client-reviews-1.webp";
import clientReviews2 from "../../../assets/img/services/client-reviews-2.webp";
import clientReviews3 from "../../../assets/img/services/client-reviews-3.webp";
import testimonialLogo1 from "../../../assets/img/services/testimonial-logo-1.svg";
import testimonialLogo2 from "../../../assets/img/services/testimonial-logo-2.svg";
import testimonialLogo3 from "../../../assets/img/services/testimonial-logo-3.svg";

export default function Clients() {

    const clients = [
        {
            img : clientReviews1, 
            img2 : testimonialLogo1, 
            name : 'Paula Irving', 
            title : 'Co Founder', 
            desc : 'Scaling global payouts used to be our biggest headache. Now, we manage multi-currency distributions with a single click. It"s transformed how we handle international royalties.',
        },
        {
            img : clientReviews2, 
            img2 : testimonialLogo2, 
            name : 'Harleen Quinze', 
            title : 'Business Owner', 
            desc : 'The integration was seamless. Our merchants needed a banking solution that understood high-velocity sales, and this platform delivered exactly that with zero downtime.',
        },
        {
            img : clientReviews3, 
            img2 : testimonialLogo3, 
            name : 'Brendan Carroll', 
            title : 'Founder CEO', 
            desc : 'Financial security at scale is non-negotiable for us. This platform"s institutional-grade encryption and real-time fraud detection provide the peace of mind our board requires.',
        },
        {
            img : clientReviews2, 
            img2 : testimonialLogo2, 
            name : 'Harleen Quinze', 
            title : 'Business Owner', 
            desc : 'The integration was seamless. Our merchants needed a banking solution that understood high-velocity sales, and this platform delivered exactly that with zero downtime.',
        },
        {
            img : clientReviews3, 
            img2 : testimonialLogo3, 
            name : 'Brendan Carroll', 
            title : 'Founder CEO', 
            desc : 'Financial security at scale is non-negotiable for us. This platform"s institutional-grade encryption and real-time fraud detection provide the peace of mind our board requires.',
        }
    ];

  return (
    <>
        <div className="overflow-hidden">
            <div className="client-review-slider max-w-225 mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-20">
                <Swiper
                    className="overflow-v"
                    modules={[Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    loopAdditionalSlides={2}
                    centeredSlides={true}
                    autoHeight={true}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 1.1 },
                        1024: { slidesPerView: 1 },
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    speed={650}
                    onSlideChange={(swiper) => swiper.updateAutoHeight()}
                    onImagesReady={(swiper) => swiper.updateAutoHeight()}
                >
                    
                    {clients.map((item, index)=>(
                        <SwiperSlide key={index}>
                            <div className="flex flex-col-reverse sm:flex-row max-w-185 mx-auto bg-background rounded-2xl border border-border overflow-hidden client-review-card">
                                <div className="client-review-card-img-wrap">
                                    <img className="client-review-card-img" src={item.img} alt="profile image" />
                                </div>
                                <div className="px-4 py-5 sm:p-6 lg:p-9 w-full sm:max-w-105">
                                    <div>
                                        <img src={item.img2} alt="testimonial logo" />
                                        <h3 className="mt-7 md:mt-10.5 leading-[1.3] text-lg md:text-xl font-semibold">{item.desc}</h3>
                                    </div>
                                    <div className=" mt-7 md:mt-10.5 flex items-center justify-between gap-3 px-3 pt-3.75 border-t-[1.33px] border-border">
                                        <div className="flex flex-col gap-2">
                                            <p className="text-lg font-semibold leading-none text-title_black">{item.name}</p>
                                            <p className="paragraph_black text-sm font-normal leading-none">{item.title}</p>
                                        </div>
                                        <div className="flex gap-1.25 items-center py-1.75 px-4 bg-primary rounded-full">
                                            <div className="text-sm font-semibold leading-none text-title_black">5</div>
                                            <div className="">
                                                <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.67139 0.416125L9.17564 3.47092L12.5776 3.95691C12.8861 4.03405 13.079 4.20376 13.1561 4.46604C13.2487 4.74375 13.187 4.99831 12.971 5.22974L10.5179 7.59026L11.0965 10.969C11.1427 11.2776 11.0502 11.5167 10.8187 11.6865C10.5873 11.8562 10.325 11.8716 10.0319 11.7327L7.00026 10.1822L3.96861 11.7559C3.67547 11.8947 3.41319 11.8793 3.18177 11.7096C2.95035 11.5399 2.85778 11.3007 2.90406 10.9922L3.48262 7.6134L1.02953 5.22974C0.813534 4.99831 0.751821 4.74375 0.844391 4.46604C0.921532 4.20376 1.11438 4.04176 1.42295 3.98005L4.82488 3.47092L6.32913 0.416125C6.49884 0.138417 6.72255 -0.000436783 7.00026 -0.000436783C7.2934 -0.000436783 7.5171 0.138417 7.67139 0.416125Z" fill="#0D0D0D"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>            
                        </SwiperSlide>
                    ))}
                    
                </Swiper>
            </div>
        </div>
    </>
  )
}
