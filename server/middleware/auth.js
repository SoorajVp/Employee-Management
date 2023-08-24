import jwt from 'jsonwebtoken'

const secretKey = process.env.TOKEN_SECRET

const auth = (req, res, next) => {
    try {
        const headerBearer = req.headers.authorization;
        const token = headerBearer.split(' ')[1];

        jwt.verify(token, secretKey, async (err, AuthData) => {
            if (err) {
                res.status(401).json({ sucess: false, message: "Un-Authourized user" })
            } else {
                req.userName = AuthData.name;
                next();
            }
        })

    } catch (error) {
        res.status(401).json({ sucess: false, message: "Un-Authourized user" })
    }
}

export default auth;
