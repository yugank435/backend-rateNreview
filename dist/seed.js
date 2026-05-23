"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Company_1 = require("./models/Company");
const Review_1 = require("./models/Review");
const User_1 = require("./models/User");
const userNames = [
    "Demo Reviewer",
    "Aarav Sharma",
    "Ananya Verma",
    "Rohan Mehta",
    "Priya Nair",
    "Kabir Malhotra",
    "Meera Iyer",
    "Ishaan Kapoor",
    "Nisha Gupta",
    "Arjun Rao",
    "Sara Khan",
    "Vikram Sethi",
    "Tanya Bansal",
    "Aditya Joshi",
    "Kavya Menon",
    "Rahul Chawla",
    "Neha Saxena",
    "Dev Patel",
    "Pooja Singh",
    "Manav Bhatia",
    "Shreya Kulkarni",
    "Nikhil Jain",
    "Ira Bose",
    "Yash Agarwal",
    "Ritika Ghosh",
    "Amit Trivedi",
    "Sneha Reddy",
    "Karan Arora",
    "Maya Thomas",
    "Varun Sood",
    "Alisha Fernandes",
    "Harsh Vardhan",
    "Simran Kaur",
    "Om Prakash",
    "Rhea Mukherjee",
    "Siddharth Roy",
    "Tara Desai",
    "Neil Dsouza",
    "Pallavi Shah",
    "Abhinav Batra",
    "Jiya Mehra",
    "Ethan Carter",
    "Olivia Brooks",
    "Noah Bennett",
    "Emma Reed",
    "Liam Sullivan",
    "Sophia Hayes",
    "Mason Cooper",
    "Ava Mitchell",
    "Lucas Morgan"
];
const companies = [
    {
        name: "Graffersid Web and App Development",
        description: "Product engineering company building web apps, mobile apps, and reliable digital products.",
        logoText: "G",
        logoColor: "#08133a",
        foundedOn: "2016-01-01",
        location: {
            city: "Indore",
            state: "Madhya Pradesh",
            country: "India",
            address: "816, Shekhar Central, Manorama Ganj, AB road, New Palasia"
        }
    },
    {
        name: "Code Tech Company",
        description: "A software studio focused on ecommerce platforms, SaaS dashboards, and integrations.",
        logoText: "<CT>",
        logoColor: "#008a25",
        foundedOn: "2016-01-01",
        location: {
            city: "Indore",
            state: "Madhya Pradesh",
            country: "India",
            address: "414, Kanha Apartment, Bhawarkua"
        }
    },
    {
        name: "Innogent Pvt. Ltd.",
        description: "Technology consulting partner for business automation, app modernization, and cloud software.",
        logoText: "!",
        logoColor: "#ff7600",
        foundedOn: "2016-01-01",
        location: {
            city: "Indore",
            state: "Madhya Pradesh",
            country: "India",
            address: "910, Shekhar Central, Manorama Ganj, AB road, New Palasia"
        }
    },
    {
        name: "Delhi Digital Labs",
        description: "Full-cycle digital product team for enterprise dashboards, internal portals, and customer apps.",
        logoText: "DL",
        logoColor: "#4f46e5",
        foundedOn: "2018-03-12",
        location: { city: "Delhi", state: "Delhi", country: "India", address: "Connaught Place, Barakhamba Road" }
    },
    {
        name: "Capital Cloud Works",
        description: "Cloud migration and DevOps consulting company helping teams modernize infrastructure.",
        logoText: "CC",
        logoColor: "#0f766e",
        foundedOn: "2017-07-20",
        location: { city: "Delhi", state: "Delhi", country: "India", address: "Netaji Subhash Place, Pitampura" }
    },
    {
        name: "Northstar Analytics",
        description: "Analytics and business intelligence partner for sales, finance, and operations teams.",
        logoText: "NA",
        logoColor: "#7c2d12",
        foundedOn: "2019-11-05",
        location: { city: "Delhi", state: "Delhi", country: "India", address: "Okhla Industrial Estate Phase III" }
    },
    {
        name: "Axis Product Studio",
        description: "UX-led product studio building marketplace, fintech, and workflow automation software.",
        logoText: "AX",
        logoColor: "#be123c",
        foundedOn: "2015-04-18",
        location: { city: "Delhi", state: "Delhi", country: "India", address: "Saket District Centre" }
    },
    {
        name: "Gurugram Growth Labs",
        description: "Growth technology partner specializing in CRM, marketing automation, and lead systems.",
        logoText: "GG",
        logoColor: "#2563eb",
        foundedOn: "2020-02-10",
        location: { city: "Gurugram", state: "Haryana", country: "India", address: "Cyber City, DLF Phase 2" }
    },
    {
        name: "Cyber Hub Systems",
        description: "Enterprise software firm delivering scalable web platforms and integration middleware.",
        logoText: "CH",
        logoColor: "#9333ea",
        foundedOn: "2016-09-22",
        location: { city: "Gurugram", state: "Haryana", country: "India", address: "Golf Course Road, Sector 43" }
    },
    {
        name: "Horizon SaaS Partners",
        description: "SaaS engineering partner for subscription products, admin consoles, and billing workflows.",
        logoText: "HS",
        logoColor: "#0891b2",
        foundedOn: "2018-06-14",
        location: { city: "Gurugram", state: "Haryana", country: "India", address: "Udyog Vihar Phase V" }
    },
    {
        name: "SprintOps Technologies",
        description: "Operations technology company building logistics, workforce, and field service applications.",
        logoText: "SO",
        logoColor: "#ca8a04",
        foundedOn: "2021-01-08",
        location: { city: "Gurugram", state: "Haryana", country: "India", address: "Sohna Road, Sector 48" }
    },
    {
        name: "Malwa Mobility Labs",
        description: "Mobile application development company focused on startups and regional business platforms.",
        logoText: "MM",
        logoColor: "#15803d",
        foundedOn: "2019-05-27",
        location: { city: "Indore", state: "Madhya Pradesh", country: "India", address: "Vijay Nagar, Scheme 54" }
    },
    {
        name: "Indore InfraTech",
        description: "Software and IoT solutions provider for manufacturing, warehousing, and facility operations.",
        logoText: "II",
        logoColor: "#334155",
        foundedOn: "2014-12-01",
        location: { city: "Indore", state: "Madhya Pradesh", country: "India", address: "Sanwer Road Industrial Area" }
    },
    {
        name: "Central Stack Studio",
        description: "Modern web development team creating React, Node.js, and cloud-native business apps.",
        logoText: "CS",
        logoColor: "#a21caf",
        foundedOn: "2022-08-09",
        location: { city: "Indore", state: "Madhya Pradesh", country: "India", address: "Rau Circle, AB Road" }
    },
    {
        name: "Bengaluru ByteWorks",
        description: "Engineering studio building developer tools, data products, and mobile-first platforms.",
        logoText: "BB",
        logoColor: "#1d4ed8",
        foundedOn: "2013-10-16",
        location: { city: "Bengaluru", state: "Karnataka", country: "India", address: "Koramangala 5th Block" }
    },
    {
        name: "Cubbon Cloud Labs",
        description: "Cloud-native app development company with strong backend, observability, and security practices.",
        logoText: "CB",
        logoColor: "#047857",
        foundedOn: "2016-05-30",
        location: { city: "Bengaluru", state: "Karnataka", country: "India", address: "MG Road, Ashok Nagar" }
    },
    {
        name: "Namma Data Systems",
        description: "Data platform consultancy for warehouses, reporting layers, and machine learning workflows.",
        logoText: "ND",
        logoColor: "#dc2626",
        foundedOn: "2017-02-03",
        location: { city: "Bengaluru", state: "Karnataka", country: "India", address: "Indiranagar 100 Feet Road" }
    },
    {
        name: "Kaveri App Foundry",
        description: "App foundry delivering consumer apps, booking platforms, and service marketplaces.",
        logoText: "KF",
        logoColor: "#7e22ce",
        foundedOn: "2020-10-11",
        location: { city: "Bengaluru", state: "Karnataka", country: "India", address: "HSR Layout Sector 2" }
    },
    {
        name: "New York Product Group",
        description: "Product strategy and engineering company serving media, commerce, and finance clients.",
        logoText: "NY",
        logoColor: "#111827",
        foundedOn: "2012-04-24",
        location: { city: "New York", state: "New York", country: "United States", address: "Broadway, Manhattan" }
    },
    {
        name: "Hudson Software Co.",
        description: "Custom software firm building web applications, analytics portals, and internal tools.",
        logoText: "HS",
        logoColor: "#0e7490",
        foundedOn: "2015-09-07",
        location: { city: "New York", state: "New York", country: "United States", address: "Hudson Street, Tribeca" }
    },
    {
        name: "Manhattan Metrics",
        description: "Data visualization and analytics studio for executive reporting and operational intelligence.",
        logoText: "M",
        logoColor: "#b45309",
        foundedOn: "2018-12-19",
        location: { city: "New York", state: "New York", country: "United States", address: "Madison Avenue, Midtown" }
    },
    {
        name: "Brooklyn App House",
        description: "Creative engineering shop for ecommerce storefronts, mobile apps, and brand platforms.",
        logoText: "BA",
        logoColor: "#be185d",
        foundedOn: "2021-03-06",
        location: { city: "New York", state: "New York", country: "United States", address: "Dumbo, Brooklyn" }
    },
    {
        name: "Pune Platform Works",
        description: "Platform engineering company for SaaS backends, API products, and workflow orchestration.",
        logoText: "PP",
        logoColor: "#4338ca",
        foundedOn: "2017-06-25",
        location: { city: "Pune", state: "Maharashtra", country: "India", address: "Baner Road, Pune" }
    },
    {
        name: "Mumbai MarketStack",
        description: "Commerce technology firm building retail platforms, payments flows, and partner integrations.",
        logoText: "MS",
        logoColor: "#0369a1",
        foundedOn: "2014-01-17",
        location: { city: "Mumbai", state: "Maharashtra", country: "India", address: "Andheri East, MIDC" }
    },
    {
        name: "Hyderabad Cloud Forge",
        description: "Cloud and application modernization partner for healthcare, fintech, and logistics teams.",
        logoText: "HF",
        logoColor: "#65a30d",
        foundedOn: "2019-08-21",
        location: { city: "Hyderabad", state: "Telangana", country: "India", address: "HITEC City, Madhapur" }
    }
];
const subjects = [
    "Reliable delivery team",
    "Clear communication",
    "Strong technical ownership",
    "Good product thinking",
    "Useful long-term partner",
    "Responsive and practical"
];
const reviewTexts = [
    "The team understood the business context quickly and converted the requirements into a clean, usable product. Communication stayed consistent through planning, delivery, and release.",
    "We appreciated their structured approach and regular updates. The application was delivered with sensible tradeoffs and the team handled feedback without creating delays.",
    "Their engineers were thoughtful, direct, and easy to collaborate with. The final product felt stable, polished, and aligned with the workflow our internal team needed.",
    "The project moved at a steady pace and the team made technical decisions that were easy to maintain. They were especially helpful during QA and launch support.",
    "The collaboration was smooth from discovery to handoff. They documented the important details and gave our team confidence to operate the product after launch.",
    "They balanced speed and quality well. A few details needed iteration, but the team responded quickly and improved the experience before final delivery."
];
const makeEmail = (name, index) => index === 0 ? "demo@reviewrate.com" : `${name.toLowerCase().replace(/[^a-z0-9]+/g, ".").replace(/\.$/, "")}@reviewrate.test`;
const seedDatabase = async () => {
    const passwordHash = await bcryptjs_1.default.hash("Pass1234", 12);
    const users = await Promise.all(userNames.map((name, index) => User_1.User.findOneAndUpdate({ email: makeEmail(name, index) }, { $set: { name, email: makeEmail(name, index), passwordHash } }, { returnDocument: "after", upsert: true })));
    const seededCompanies = await Promise.all(companies.map((company, index) => Company_1.Company.findOneAndUpdate({ name: company.name }, {
        $setOnInsert: {
            ...company,
            foundedOn: new Date(company.foundedOn),
            createdBy: users[index % users.length]._id
        }
    }, { returnDocument: "after", upsert: true })));
    for (const [companyIndex, company] of seededCompanies.entries()) {
        const existingReviewCount = await Review_1.Review.countDocuments({ company: company._id });
        const targetReviewCount = companyIndex % 2 === 0 ? 6 : 5;
        if (existingReviewCount >= targetReviewCount)
            continue;
        const reviewsToCreate = Array.from({ length: targetReviewCount - existingReviewCount }, (_, index) => {
            const reviewIndex = existingReviewCount + index;
            const user = users[(companyIndex * 3 + reviewIndex) % users.length];
            const rating = 3 + ((companyIndex + reviewIndex) % 3);
            return {
                company: company._id,
                user: user._id,
                reviewerName: user.name,
                subject: subjects[(companyIndex + reviewIndex) % subjects.length],
                text: reviewTexts[(companyIndex + reviewIndex) % reviewTexts.length],
                rating,
                likes: (companyIndex * 4 + reviewIndex * 3) % 28,
                createdAt: new Date(Date.UTC(2024, companyIndex % 12, reviewIndex + 1, 9 + reviewIndex, 20)),
                updatedAt: new Date(Date.UTC(2024, companyIndex % 12, reviewIndex + 1, 9 + reviewIndex, 20))
            };
        });
        await Review_1.Review.insertMany(reviewsToCreate);
    }
};
exports.seedDatabase = seedDatabase;
