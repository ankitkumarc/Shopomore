// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {

    let pincodes = {
        "221002": ["Varanasi", "Uttar Pradesh"],
        "226021": ["Lucknow", "Uttar Pradesh"],
        "560017": ["Banglore", "Karnataka"],
    }

    res.status(200).json(pincodes)
}
