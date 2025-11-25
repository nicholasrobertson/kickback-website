# Kickback Website
This repository contains the source code for the Kickback website, a youth-focused organisation committed to ending homelessness in New Zealand.

# Components
The website is built using the following components:
- JavaScript
- React
- Vite
- Pages CMS

# Getting Started
- Clone the repository to your local machine.
- Install the necessary dependencies using `npm install`
- Run the development server with `npm run dev`

# Deployment
The development website is currently hosted on Cloudflare Pages. Deployment is automated through Cloudflare Pages' integration with this GitHub repository.
- Commit changes to the `main` branch to trigger a deployment.
- Monitor the deployment status on the Cloudflare Pages dashboard.

The website is not yet deployed to production and the team are currently exploring options for this.

# CMS Integration
The website uses Pages CMS for non-technical content management. Content editors can log in to the Pages CMS dashboard to update website content without needing to modify the codebase.
- See `./.pages.yml` for configuration details.
- Media assets are stored in the `./public/` directory.
- Content files are located in the `./content/` directory.

# Contributing
Contributions to the Kickback website are welcome!

The site has evolved organically over time and there is currently renewed interest in getting this live as the organisation gains momentum and intends to seek further funding.

We are currently looking for help with web design and styling.

If this sounds like you, please reach out to Nick at nicholas.robertson@sparefish.co.nz

# User / Content Requirements
Persona’s:
- Corporate Funder
- Volunteer
- Rangatahi

Important Non Functional:
Needs to be performant for Rangatahi on bad network, can be achieved by
- Minmal Thirparty JS Packages (bundle size) ✅
- Landing page with minimal content rendered - avoid heavy image pdf loading ✅
- Minmal Custom font on landing page. ✅
Needs to be easy to update by non technical team members
- Use of Pages CMS for content management ✅

Content Requirements:
Landing/ home page
- Mission/ vision ✅ 
- Photos of the space ✅ 
- Testimonies ✅ 
- Need support? ✅
- Latest news/ media update ✅
- Donate ✅ 
Our community
- Board ✅ 
Services/ impact
- The front door ✅
- Safety net ✅
- Publications ✅ 

We discussed that the launch of the website could happen alongside our State of the Street event – early Nov to be confirmed/ discussed with Aaron.