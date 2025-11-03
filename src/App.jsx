import { useState } from 'react'
import './App.css'

function App() {
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);
  const buttonInnerText = isHeaderOpen ? '⬅️ Go Back 🙅' : '📞 Hit us up 💬';
  const modalDisplay = isHeaderOpen ? "flex" : "none";
  const textInnerText = isHeaderOpen ? "" : 'Are you safe tonight?';

  const handleHeader = () => {
    setIsHeaderOpen(!isHeaderOpen);
  }

  const scrollToId = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <main>
       <header>
        <div className="header" onClick={handleHeader}>
            <div id="hit-us-up-txt">{textInnerText}</div>
            <div id="hit-us-up-btn" className="btn cool green">{buttonInnerText}</div>
        </div>
        <div id="hit-us-up" className="modal" style={{ display: modalDisplay }}>
            <div className="modal-footer mc">
                <a className="call-icon btn" href="tel:0800-5425-2225">Call 0800 kick back 📞</a>
            </div>
            <div className="modal-image-container">
                <div className="modal-image-overlay">Go to 307 K-Road</div>
                <img className="modal-header-img" src="./images/frontdoor-sign.jpg" alt="Front Door Sign" onClick={() => window.open('https://maps.app.goo.gl/nmLaCAnuJk3yz1Z57')}/>
            </div>
            <div className="modal-body mc">
                <div className="messenger" onClick={() => window.open('https://m.me/121841164182718')}>
                    {/*<svg id="messenger"  fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 80 80"><path fill-rule="evenodd" clip-rule="evenodd" d="M40 .914C17.995.914.937 17.033.937 38.804c0 11.389 4.668 21.23 12.268 28.026a3.12 3.12 0 011.05 2.227l.212 6.95c.068 2.215 2.358 3.658 4.386 2.763l7.753-3.423a3.115 3.115 0 012.087-.153A42.602 42.602 0 0040 76.695c22.005 0 39.063-16.118 39.063-37.89C79.063 17.033 62.005.915 40 .915z" fill="url(#paint0_radial)"/><path fill-rule="evenodd" clip-rule="evenodd" d="M16.543 49.886L28.018 31.68a5.86 5.86 0 018.472-1.563l9.127 6.844c.837.628 1.989.625 2.823-.008L60.765 27.6c1.645-1.248 3.793.72 2.692 2.467L51.982 48.272a5.86 5.86 0 01-8.472 1.563l-9.127-6.845A2.344 2.344 0 0031.56 43l-12.325 9.354c-1.646 1.248-3.793-.72-2.692-2.467z" fill="#fff"/><defs><radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(-57.092 80.25 24.628) scale(85.1246)"><stop stop-color="#09F"/><stop offset=".61" stop-color="#A033FF"/><stop offset=".935" stop-color="#FF5280"/><stop offset="1" stop-color="#FF7061"/></radialGradient></defs></svg>*/}
                </div>
                <div className="messenger" onClick={() => window.open('https://ig.me/m/kick_back_make_change')}>
                    <img id="messenger" src="./images/logo-insta-full.png" alt="Instagram"/>
                </div>
            </div>
        </div>        
    </header>
    <main>
        <section className="hero">
            <h1><span>JOIN THE<br/></span><span id="movement" className="prom">MOVEMENT</span></h1>
            <img id="header-logo" src="./images/logo-kickback-dark.svg" alt="Kick Back Logo"/>
        </section>
        <section className="">
            <div className="end edo"><span style={{"color": "white"}}>End</span> Youth Homelessness!</div>
        </section>
        <section className="hero-btn">
            <div className="btn med cool" onClick={() => scrollToId('contact')}>🫱🏼‍🫲🏾 Partner 💼</div>
            <div className="btn med cool" onClick={() => scrollToId('contact')}>🧑🏽‍🤝‍🧑🏼 Volunteer 🦺</div>
        </section>
        <div className="img-hug full">
            {/*<svg id="img-hug" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" data-name="Layer 1" width="667.1889" height="648.09919" viewBox="0 0 667.1889 648.09919"><path d="M731.16,329.07779h0c-.99343-118.05925-96.9653-213.474-215.24736-213.539-119.30334-.065-215.54446,97.80088-215.54446,217.04852V723.62367a38.06566,38.06566,0,0,0,38.06565,38.06566H731.16c118.95982,0,215.39591-98.293,215.39591-217.25277S850.11982,329.07779,731.16,329.07779Z" transform="translate(-279.36708 -113.68188)" fill="#FB5DBD" fill-opacity="0.75"/><path d="M731.16,327.22093h0c-.99343-118.05925-96.9653-213.47406-215.24736-213.539-64.67448,0-122.55285,28.72564-162.02971,74.0609A213.10271,213.10271,0,0,1,484.346,143.39164c118.28208.065,214.254,95.47982,215.24733,213.539h0c118.95982,0,215.39591,96.43609,215.39591,215.39591a214.60667,214.60667,0,0,1-52.72556,141.18646,215.03379,215.03379,0,0,0,84.2922-170.89624C946.55591,423.657,850.11982,327.22093,731.16,327.22093Z" transform="translate(-279.36708 -113.68188)" opacity="0.1" style="isolation:isolate"/><path d="M530.21857,459.34959c-8.77835-27.97616-28.74047-53.63489-56.34769-63.09234C446.262,386.79978,405.83571,401.20658,385.08,421.892c-37.96615,37.83783-39.89895,176.50419-13.81463,217.58144,5.18824-.27463,23.09094-.47776,28.342-.67443l7.42834-24.7583V638.555c40.98648-1.26665,86.60616,32.44552,126.351.34661C537.21339,609.81844,538.99685,487.32575,530.21857,459.34959Z" transform="translate(-279.36708 -113.68188)" fill="#2f2e41"/><circle cx="191.01404" cy="374.23728" r="59.20984" fill="#dfb0a1"/><path d="M511.06536,410.81752c-22.61753-13.78871-52.76085-14.18618-75.73583-.99844-22.9732,13.18775-37.83151,39.41789-37.33189,65.90322,33.09658,1.522,67.427,32.6052,103.118,1.98674l8.33164-20.3911,4.912,20.40618q16.11316-.00159,32.28754-.04239C547.84636,451.21894,533.68453,424.60625,511.06536,410.81752Z" transform="translate(-279.36708 -113.68188)" fill="#2f2e41"/><path d="M524.284,450.9665c13.58777-25.98266,37.7731-47.70649,66.61777-52.13235a61.75329,61.75329,0,0,1,22.75765,1.14965c42.47177,9.5318,69.04236,51.86931,60.74091,94.5986-1.64669,8.476-3.5699,17.24491-4.94388,26.98169a24.4543,24.4543,0,0,1-29.43616,20.415l-.15774-.03429-7.268-1.554c-21.6-4.57421-46.31539.59487-69.7494.31242-34.92653-.421-59.47338-34.514-48.33735-67.62034A152.98331,152.98331,0,0,1,524.284,450.9665Z" transform="translate(-279.36708 -113.68188)" fill="#AAFE80"/><circle cx="298.75837" cy="375.98648" r="59.20984" fill="#dfb0a1"/><path d="M551.71845,406.58684c24.69963-9.5713,54.43809-4.63148,74.71856,12.41166,20.27873,17.04282,30.26386,45.48727,25.088,71.46674C618.681,486.11,579.39446,510.63158,549.68116,474.18359l-4.594-21.54317-8.44352,19.2158q-15.85887-2.85127-31.77107-5.752C508.372,439.84644,527.01721,416.15786,551.71845,406.58684Z" transform="translate(-279.36708 -113.68188)" fill="#AAFE80"/><path d="M720.07866,552.39292a24.1041,24.1041,0,0,0-36.19122,7.50282L516.75755,618.61481l16.58379,35.24532,161.79922-60.29989a24.23473,24.23473,0,0,0,24.9381-41.16732Z" transform="translate(-279.36708 -113.68188)" fill="#dfb0a1"/><path d="M541.48719,591.11274l-24.69011,10.68271-13.19589,5.7154-8.61029,3.71867a27.77552,27.77552,0,0,0-10.02981,4.99314A28.04031,28.04031,0,0,0,509.29943,665.449l50.53246-5.77367a10.09712,10.09712,0,0,0,7.16742-4.34957c1.66846-2.44022,17.26786-9.79112,16.514-12.64117l6.6755-3.06105,9.68765-3.03484L636.24783,619.856h0L630.748,599.51673h0l5.088-24.96751c-.76119-2.81572-83.28837,17.99318-85.9268,16.74873A10.04533,10.04533,0,0,0,541.48719,591.11274Z" transform="translate(-279.36708 -113.68188)" fill="#3f3d56"/><path d="M612.25806,758.70472H381.4177a36.11016,36.11016,0,0,1-36.11016-36.11016V637.60985a36.11016,36.11016,0,0,1,36.11016-36.11016l29.53-41.6077H514.02442l98.23364,41.6077a36.11015,36.11015,0,0,1,36.11015,36.11016v84.98471A36.11015,36.11015,0,0,1,612.25806,758.70472Z" transform="translate(-279.36708 -113.68188)" fill="#3f3d56"/><path d="M694.90021,758.70472H488.4362A36.11016,36.11016,0,0,1,452.326,722.59456V637.60985a36.11016,36.11016,0,0,1,36.11016-36.11016l54.36548-41.6077H645.87843l49.02178,41.6077a36.11016,36.11016,0,0,1,36.11016,36.11016v84.98471A36.11016,36.11016,0,0,1,694.90021,758.70472Z" transform="translate(-279.36708 -113.68188)" fill="#2f2e41"/><path d="M509.37885,748.16663a23.18264,23.18264,0,0,1-35.42065,3.0022L329.73933,755.832l-18.43991.59626h0c-18.96735.61328-29.89283-21.331-17.97144-36.09638L306.13706,704.467l45.81424,7.18573,16.56586.726,106.58868,4.671a23.30816,23.30816,0,0,1,34.27295,31.117Z" transform="translate(-279.36708 -113.68188)" fill="#dfb0a1"/><path d="M382.16322,568.41992s-27.49085-6.97525-40.521,15.46311c-10.43158,17.96362-45.91672,85.90365-53.283,113.78781-35.94223,86.61871,47.62448,52.125,45.28635,60.29578L361.603,712.07575c12.14765-6.07379-11.23529,1.76519-14.31555-2.59l21.43085-23.29205,24.29529-12.14765,8.91449-95.10583Z" transform="translate(-279.36708 -113.68188)" fill="#3f3d56"/><path d="M482.94351,751.78681a23.18264,23.18264,0,0,0,35.42066,3.00219L662.583,759.45221l18.43991.59625h0c18.96735.61328,29.89282-21.331,17.97143-36.09637L686.1853,708.08722,640.37106,715.273l-16.56585.726-106.58869,4.671a23.30816,23.30816,0,0,0-34.27295,31.117Z" transform="translate(-279.36708 -113.68188)" fill="#dfb0a1"/><path d="M610.15915,572.0401s27.49084-6.97525,40.521,15.46311c10.43157,17.96362,45.91671,85.90365,53.283,113.78781,35.94224,86.61871-47.62448,52.125-45.28634,60.29577l-27.9574-45.89087c-12.14764-6.07379,11.23529,1.7652,14.31555-2.59L623.6041,689.8139l-24.29529-12.14764-8.91449-95.10583Z" transform="translate(-279.36708 -113.68188)" fill="#2f2e41"/></svg>*/}
        </div>       
        <section className="project full" id="front-door-head">
            <div className="header-2">
                <h2 className="italic edo"><span className="prom-2">Our </span>Mahi</h2>
            </div>
        </section>
        <section className="project sidescroll full" id="front-door">
            <div className="project-card">
                <div className="modal-image-container">
                    <img className="p-header-img" src="./images/frontdoor-sign.jpg" alt="Front Door Sign" onClick={() => window.open('https://maps.app.goo.gl/nmLaCAnuJk3yz1Z57')}/>
                </div>
                <h2 className="center italic edo boxer">The Front Door</h2>
                <div className="p-header bold">Emergency Support <span className="italic">on K-road</span><br/></div>
                <div className="p-body italic">Our vision is to provide free emergency accommodation, GP consultations, and education to young people in need.<br/><br/>We've signed a commercial lease and we've moved in to our new place on K-Road!<br/><br/>Check out our socials for updates on our progress and to find out more about about getting involved<br/><br/></div>
                <div className="socials">
                    <div className="soc-item">
                        <a href="https://maps.app.goo.gl/uHECEc3TY1x3qQF28" target="_blank">
                            <span className="socicon socicon-maps"><img src="./images/logo-maps.svg"/></span>
                        </a>
                    </div>
                    <div className="soc-item">
                        <a href="https://www.instagram.com/kick_back_make_change/" target="_blank">
                            <span className="socicon socicon-instagram"><img src="./images/logo-insta.png"/></span>
                        </a>
                    </div>
                    <div className="soc-item">
                        <a href="https://www.facebook.com/p/Kick-Back-100091386001694/" target="_blank">
                            <span className="socicon socicon-facebook"><img src="./images/logo-facebook.png"/></span>
                        </a>
                    </div>
                    <div className="soc-item">
                        <a href="https://www.linkedin.com/company/kickbackmakechange/?originalSubdomain=nz" target="_blank">
                            <span className="socicon socicon-linkedin"><img src="./images/logo-linkedin.png"/></span>
                        </a>
                    </div>
                    <div className="btn give" onClick={() => window.open('https://givealittle.co.nz/cause/help-us-kick-back-against-youth-homelessness', '_blank')}>Give a Little!</div>
                </div>
            </div>
            <div className="project-card">
                <div className="modal-image-container">
                    <img className="p-header-img" src="./images/header-sn.png" alt="Front Door Sign" onClick={() => window.open('https://maps.app.goo.gl/nmLaCAnuJk3yz1Z57')}/>
                </div>
                <h2 className="center raleway">The Safety Net</h2>
                <div className="p-header bold">Short Term <span className="italic">free boarding community</span><br/></div>
                <div className="p-body italic">In partnership with Massey Community Trust, we've created a community of host homes who offer safe, temporary accommodation for rangatahi.<br/><br/>
                    Host homes provide a safe temporary space for a young person, while they reconnect with whanau or make decisions about other housing options.<br/><br/>
                    We match people in the community with the capacity to help provide temporary accommodation with those who need it.
                </div>
                <div className="socials">
                    <div className="soc-item">
                        <a href="https://www.instagram.com/thesafetynetprojectnz/?fbclid=IwAR1uFPhxR-x0fU6tfGbqLXQ8eK0tzVPAfCrlj0s7qxMADb7Be47_jMjxnfo" target="_blank">
                            <span className="socicon socicon-instagram"><img src="./images/logo-insta.png"/></span>
                        </a>
                    </div>
                    <div className="soc-item">
                        <a href="https://www.facebook.com/thesafetynetprojectnz" target="_blank">
                            <span className="socicon socicon-facebook"><img src="./images/logo-facebook.png"/></span>
                        </a>
                    </div>
                    <div className="soc-item">
                        <a href="https://www.linkedin.com/company/kickbackmakechange/?originalSubdomain=nz" target="_blank">
                            <span className="socicon socicon-linkedin"><img src="./images/logo-linkedin.png"/></span>
                        </a>
                    </div>
                    <div className="btn give" onClick={() => scrollToId('contact')}>Become a Host!</div>
                </div>
            </div>
            <div className="project-card">
                <div className="modal-image-container">
                    <img className="p-header-img" src="./images/header-ed.jpg" alt="Front Door Sign" onClick={() => window.open('https://maps.app.goo.gl/nmLaCAnuJk3yz1Z57')}/>
                </div>
                <h2 className="center bebas light">Education</h2>
                <div className="p-header bold">Long Term <span className="italic">consultation</span><br/></div>
                <div className="p-body italic">Our vision is a cohesive support system for young people that is owned and managed by local communities<br/><br/>
                    Our aim is to provide communities and organizations with effective tools for reducing and supporting youth homeless<br/><br/>
                    We actively train, support and consult to locals and entities who are wanting to implement similar programs. We have worked closely with Mana, Massey Community Trust, Lifewise ....
                </div>
                <div className="socials">
                    <div className="soc-item">
                        <a href="https://www.instagram.com/kick_back_make_change/" target="_blank">
                            <span className="socicon socicon-instagram"><img src="./images/logo-insta.png"/></span>
                        </a>
                    </div>
                    <div className="soc-item">
                        <a href="https://www.facebook.com/p/Kick-Back-100091386001694/" target="_blank">
                            <span className="socicon socicon-facebook"><img src="./images/logo-facebook.png"/></span>
                        </a>
                    </div>
                    <div className="soc-item">
                        <a href="https://www.linkedin.com/company/kickbackmakechange/?originalSubdomain=nz" target="_blank">
                            <span className="socicon socicon-linkedin"><img src="./images/logo-linkedin.png"/></span>
                        </a>
                    </div>
                    <div className="btn give" onClick={() => scrollToId('contact')}>Start the Conversation</div>
                </div>
            </div>
        </section>
        <section className="full">
            <div className="header-2">
                <h2 className="italic edo"><span className="prom-2">Progress </span>Update!</h2>
            </div>
            <div className="p-images">
                <a href="./images/fd-1.jpg" data-lightbox="gallery">
                    <img src="./images/fd-1.jpg" alt="Thumbnail" />
                </a>
                <a href="./images/fd-2.jpg" data-lightbox="gallery">
                    <img src="./images/fd-2.jpg" alt="Thumbnail" />
                </a>
                <a href="./images/fd-3.jpg" data-lightbox="gallery">
                    <img src="./images/fd-3.jpg" alt="Thumbnail" />
                </a>
                <a href="./images/fd-4.jpg" data-lightbox="gallery">
                    <img src="./images/fd-4.jpg" alt="Thumbnail" />
                </a>
                <a href="./images/fd-5.jpg" data-lightbox="gallery">
                    <img src="./images/fd-5.jpg" alt="Thumbnail" />
                </a>
                <a href="./images/fd-6.jpg" data-lightbox="gallery">
                    <img src="./images/fd-6.jpg" alt="Thumbnail" />
                </a>
                <a href="./images/fd-7.jpg" data-lightbox="gallery">
                    <img src="./images/fd-7.jpg" alt="Thumbnail" />
                </a>
                <a href="./images/fd-8.jpg" data-lightbox="gallery">
                    <img src="./images/fd-8.jpg" alt="Thumbnail" />
                </a>
            </div>
        </section>
        <section className="news">
            <div className="header-2">
                <h2 className="edo"><span className="italic prom-2">In the</span> News</h2>
        </div>
        <div className="news-cards">
            <div className="news-card" onClick={() => window.open('https://www.rnz.co.nz/news/national/505952/auckland-couple-going-without-to-help-homeless-youth','_blank')}>
                <div className="cd-logo"><img src="./images/logo-rnz.png" alt="News 1"/></div>
                <div className="cd-header">RNZ</div>
                <div className="italic">Auckland couple going without to help homeless youth</div>
            </div>
            <div className="news-card" onClick={() => window.open('https://www.nzherald.co.nz/nz/a-social-workers-novel-solution-for-homeless-youth-his-own-home/3HQMB5DRFFBL5D37DYA2KUAQY4/','_blank')}>
                <div className="cd-logo"><img src="./images/logo-herald.png" alt="News 2"/></div>
                <div className="cd-header">NZ Herald</div>
                <div className="italic">A youth worker came up with a novel solution for homeless teens: His own home</div>
            </div>
            <div className="news-card" onClick={() => window.open('https://www.odt.co.nz/news/national/couple-spend-savings-centre-homeless-youth','_blank')}>
                <div className="cd-logo"><img src="./images/logo-odt.png" alt="News 3"/></div>
                <div className="cd-header">ODT</div>
                <div className="italic">Couple spend savings on centre for homeless youth</div>
            </div>
        </div>
        <div className="videos">
            <div className="video-wrapper">
                <img className="video" src="./images/video_2.png" alt="Video 2"/>
                <div className="play-icon cambo" onClick={() => window.open('https://www.1news.co.nz/2019/09/11/national-response-to-youth-homelessness-problem-needed-frontline-worker-says/', '_blank')}>
                    {/*<svg id="play-icon" width="110" height="122" viewBox="0 0 110 122" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M102.5 48.0096C112.5 53.7831 112.5 68.2169 102.5 73.9904L23 119.89C13 125.663 0.499994 118.446 0.499994 106.899L0.499998 15.1006C0.499999 3.55364 13 -3.66324 23 2.11027L102.5 48.0096Z"
                            fill="var(--color-video-icon)" fill-opacity="0.9" />
                    </svg>*/}
                </div>
            </div>
             <div className="video-wrapper">
                <img className="video" src="./images/video_1.png" alt="Video 1"/>
                <div className="play-icon newshub" onClick={() => window.open('https://www.1news.co.nz/2024/02/21/sanctions-dont-work-hipkins-on-govts-benefit-changes', '_blank')}>
                    {/*<svg id="play-icon" width="110" height="122" viewBox="0 0 110 122" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M102.5 48.0096C112.5 53.7831 112.5 68.2169 102.5 73.9904L23 119.89C13 125.663 0.499994 118.446 0.499994 106.899L0.499998 15.1006C0.499999 3.55364 13 -3.66324 23 2.11027L102.5 48.0096Z"
                            fill="var(--color-video-icon)" fill-opacity="0.9" />
                    </svg>*/}
                </div>
            </div>
        </div>
        </section>
        <section className="partners full">
            <div className="header-2">
                <h2><span className="italic prom-2">Our </span>Partners</h2>
            </div>
            <div className="cd-header">Visionary Seed Funders</div>
            <div className="partner-cards">
                <div className="partner-card" >
                    <div className="cd-logo big"><img src="./images/logo-mana.png" alt="mana logo"/></div>
                </div>
                <div className="partner-card">
                    <div className="cd-logo big"><img className="huerotate" src="./images/logo-mct.png" alt="mct logo"/></div>
                </div>
            </div>
            <div className="cd-header">Corporate Supporters</div>
                <div className="partner-cards">
                    <div className="partner-card" >
                        <div className="cd-logo big"><img src="./images/logo-council.svg" alt="mana logo"/></div>
                    </div>
                    <div className="partner-card">
                        <div className="cd-logo big"><img src="./images/logo-skycity.svg" alt="mana logo"/></div>
                    </div>
                    <div className="partner-card">
                        <div className="cd-logo big"><img src="./images/logo-xx.svg" alt="logo"/></div>
                    </div>
                </div>
            <div className="cd-header">Local Socially Conscious Businesses</div>
                <div className="partner-cards">
                    <div className="partner-card" id="circleit">
                        <div className="cd-logo big"><img src="./images/logo-circle.png" alt="circle logo"/></div>
                    </div>
                    <div className="partner-card" id="edtech">
                        <div className="cd-logo big"><img id="ed" src="./images/logo-ed.jpg" alt="ed logo"/></div>
                    </div>
                    <div className="partner-card">
                        <div className="cd-logo big"><img src="./images/logo-unit" alt="logo"/></div>
                    </div>
                    <div className="partner-card">
                        <div className="cd-logo big"><img src="./images/logo-unit" alt="logo"/></div>
                    </div>
                </div>
        </section>
        <section className="partner-links full">
            <div className="partner-link">
                <div className="cd-header">Becoming a Partner</div>
                <div className="btn cool" onClick={() => scrollToId('contact')}>Contact us to find out more</div>
            </div>
        </section>
        <section className="project full" id="advocacy">
            <div className="header-2">
                <h2 className="italic"><span className="prom-2">Our </span>Advocacy</h2>
            </div>
                <div className="adv-cards">
                    <div className="news-card" onClick={() => window.open('https://www.rnz.co.nz/news/national/505952/auckland-couple-going-without-to-help-homeless-youth','_blank')}>
                        <div className="cd-logo"><img src="./images/logo-rnz.png" alt="News 1"/></div>
                        <div className="cd-header">RNZ</div>
                        <div className="italic">Auckland couple going without to help homeless youth</div>
                    </div>
                    <div className="news-card" onClick={() => window.open('https://www.nzherald.co.nz/nz/a-social-workers-novel-solution-for-homeless-youth-his-own-home/3HQMB5DRFFBL5D37DYA2KUAQY4/','_blank')}>
                        <div className="cd-logo"><img src="./images/logo-herald.png" alt="News 2"/></div>
                        <div className="cd-header">NZ Herald</div>
                        <div className="italic">A youth worker came up with a novel solution for homeless teens: His own home</div>
                    </div>
                    <div className="news-card" onClick={() => window.open('https://www.newshub.co.nz/home/politics/2024/03/advocate-accuses-government-of-failing-children-slams-military-style-boot-camps-but-minister-says-youth-crime-is-out-of-control.html','_blank')}>
                        <div className="cd-logo"><img src="./images/logo-newshub.svg" alt="News 9"/></div>
                        <div className="cd-header">Newshub</div>
                        <div className="italic">Advocate accuses Government of failing children, slams...</div>
                    </div>
                    <div className="news-card" onClick={() => window.open('https://www.odt.co.nz/news/national/couple-spend-savings-centre-homeless-youth','_blank')}>
                        <div className="cd-logo"><img src="./images/logo-odt.png" alt="News 3"/></div>
                        <div className="cd-header">ODT</div>
                        <div className="italic">Couple spend savings on centre for homeless youth</div>
                    </div>
                    <div className="news-card" onClick={() => window.open('https://www.1news.co.nz/2023/04/28/minister-defends-lack-of-spending-to-tackle-homelessness/','_blank')}>
                        <div className="cd-logo"><img src="./images/logo-1news.svg" alt="News 4"/></div>
                        <div className="cd-header">1 News</div>
                        <div className="italic">Minister defends lack of spending to tackle homelessness</div>
                    </div>
                    <div className="news-card" onClick={() => window.open('https://www.stuff.co.nz/national/128707393/homeless-rangatahi-missed-out-in-budget-lifewise-says','_blank')}>
                        <div className="cd-logo"><img src="./images/logo-stuff.svg" alt="News 6"/></div>
                        <div className="cd-header">Stuff</div>
                        <div className="italic">Homeless rangatahi missed out in budget, Lifewise says</div>
                    </div>
                    <div className="news-card" onClick={() => window.open('https://www.scoop.co.nz/stories/PO2402/S00116/kick-back-youth-organizations-fears-sanctions-will-increase-risks-for-homeless-youth.htm','_blank')}>
                        <div className="cd-logo"><img src="./images/logo-scoop.png" alt="News 7"/></div>
                        <div className="cd-header">Scoop</div>
                        <div className="italic">Kick Back youth organization's fears sanctions will increase risks for..</div>
                    </div>
                    <div className="news-card" onClick={() => window.open('https://www.newshub.co.nz/home/new-zealand/2024/01/young-auckland-couple-using-own-savings-to-build-new-zealand-s-first-24-hour-youth-emergency-centre.html','_blank')}>
                        <div className="cd-logo"><img src="./images/logo-newshub.svg" alt="News 8"/></div>
                        <div className="cd-header">Newshub</div>
                        <div className="italic">Young Auckland couple using own savings to build...</div>
                    </div>
                    <div className="news-card" onClick={() => window.open('https://www.1news.co.nz/2024/02/21/sanctions-dont-work-hipkins-on-govts-benefit-changes','_blank')}>
                        <div className="cd-logo"><img src="./images/logo-1news.svg" alt="News 10"/></div>
                        <div className="cd-header">1 News</div>
                        <div className="italic">Sanctions don't work: Hipkins on Govt's benefit changes</div>                        
                    </div>
                </div>
        </section>        
        <section className="people" id="contact">
            <div className="header-2">
                <h2><span className="italic prom-2">Contact </span>Us</h2>
            </div>
            <div className="people-cards">
                <div className="people-card">
                    <div className="pc-header">
                        <div>
                            <div className="edo name">Aaron Hendry</div>
                            <div className="italic prom-2 bold">Founder</div>
                        </div>
                        <div className="avatar-wrapper">
                            <div className="avatar"></div>
                        </div>
                    </div>         
                    <div className="pc-body">
                        <div className="pc-email">
                            <div className=""><span className="italic prom-2">e: </span><span className="email" onClick={() => window.open('mailto:ajhendry@kickbackmakechange.org')} >ajhendry@kickbackmakechange.org</span></div>
                        </div>
                        <div className="pc-phone">
                            <div className=""><span className="italic prom-2">m: </span><span className="">027 534 4417</span></div>
                        </div>
                    </div>
                    <div className="socials hundy">
                        <div className="soc-item">
                            <a href="https://www.instagram.com/a.j.hendry/" target="_blank">
                                <span className="socicon socicon-instagram"><img src="./images/logo-w-insta.png"/></span>
                            </a>
                        </div>
                        <div className="soc-item">
                            <a href="https://www.facebook.com/aejayhendry/" target="_blank">
                                <span className="socicon socicon-facebook"><img src="./images/logo-w-fb.png"/></span>
                            </a>
                        </div>
                        <div className="soc-item">
                            <a href="https://www.linkedin.com/in/aaron-hendry-2687929b/?trk=public_post_follow-view-profile&originalSubdomain=nz" target="_blank">
                                <span className="socicon socicon-linkedin"><img src="./images/logo-w-linkedin.png"/></span>
                            </a>
                        </div>
                        <div className="soc-item">
                            <a href="https://twitter.com/AeJayHendry" target="_blank">
                                <span className="socicon socicon-linkedin"><img src="./images/logo-w-x.png"/></span>
                            </a>
                        </div>
                        <div className="soc-item">
                            <a href="https://open.spotify.com/show/5bNyvdQuTlicXECh340j2U" target="_blank">
                                <span className="socicon socicon-linkedin"><img src="./images/logo-w-spotify.png"/></span>
                            </a>
                        </div>
                        <div className="soc-item">
                            <a href="https://www.tiktok.com/@a_j_hendry" target="_blank">
                                <span className="socicon socicon-linkedin"><img src="./images/logo-w-tiktok.webp"/></span>
                            </a>
                        </div>
                        <div className="btn give green" onClick={() => window.open('https://givealittle.co.nz/cause/help-us-kick-back-against-youth-homelessness', '_blank')} >Give a Little!</div>
                    </div>
                               
                </div>                
            </div>
        </section>
    </main>
    <footer>
        <div className="footer">website donated with 🩷 by <span className="prom bold sf" onClick={() => window.open('https://sparefish.co.nz', '_blank')}>SPAREFISH</span></div>
    </footer>
    </main>

  )
}

export default App
