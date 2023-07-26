const configurations = {
    site:{
        name:"Netflix",
        domain:"http://localhost:3000",
        paths:{
            profile:"/profile",
            pricing:"/pricing"
        }
    },
    stripe_plans: [
        {
            title: "Basic Plan",
            payment: "$100/month",
            price_id:process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ONE
        },
        {
            title: "Standard",
            payment: "$200/month",
            price_id:process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_TWO

        },
        {
            title: "Premium",
            payment: "$300/month",
            price_id:process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_THREE
        },
    ]
};

export default configurations;