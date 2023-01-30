const whiteList = ["http://localhost:3001"]
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1){
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    optionSuccessStatus: 200
}

export default corsOptions