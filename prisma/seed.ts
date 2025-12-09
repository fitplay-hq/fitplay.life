import prisma from "@/lib/prisma";

async function main() {
    const categories = [
        {
            name: "Fitness & Gym Equipment",
            subCategories: [
                "Weights & Adjustable Dumbbells",
                "Yoga & Fitness Mats",
                "Crossfit Gear (Resistance bands, ropes)",
                "Gym Essentials (Shakers, Bag, Wristbands)"
            ]
        },
        {
            name: "Nutrition & Health Foods",
            subCategories: [
                "Protein Powder",
                "Creatine / Preworkout",
                "Daily Vitamins",
                "Protein Bars",
                "Muscle & Performance Supplements",
                "General Health & Digestive Care"
            ]
        },
        {
            name: "Diagnostics & Preventive Health",
            subCategories: [
                "Diagnostics",
                "Monitoring Devices",
                "Fitness Wearables",
                "Pharmacy Vouchers / Discount Coupons"
            ]
        },
        {
            name: "Ergonomic & Workspace Comfort Products",
            subCategories: [
                "Office Chairs",
                "Work Desks",
                "Massage & Recovery Tools",
                "Sleep Essentials",
                "Accessories"
            ]
        },
        {
            name: "Health & Wellness Services",
            subCategories: [
                "Nutrition / Diet Consultation",
                "Mental Health & Emotional Wellness",
                "Yoga, Meditation, Mindfulness",
                "Gym & Fitness Subscriptions",
                "Career & Growth Counselling"
            ]
        }
    ];

    for (const item of categories) {
        await prisma.category.upsert({
            where: { name: item.name },
            update: {},
            create: {
                name: item.name,
                subCategories: {
                    create: item.subCategories.map(sc => ({ name: sc })),
                },
            },
        });
    }
}

main()
    .then(() => console.log("Seeded successfully"))
    .catch(console.error)
    .finally(() => prisma.$disconnect());
