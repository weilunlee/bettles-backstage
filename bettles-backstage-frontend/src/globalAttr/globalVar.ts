const LOCA = window.location
const HOST = "localhost"
const PORT = 5000

const GLOBAL_VAR = {
    BRAND_NAME:"Beetle Br",
    API_HOST:`${LOCA.protocol}//${HOST}:${PORT}`
}

export type productIF = keyof typeof PRODUCT_DIST
export const PRODUCT_DIST = {
    STBDS:{
        typeId:"STBDS",
        name:"強效大兜土",
        catagory:["8L", "4L"]
    },
    STRSD:{
        typeId:"STRSD",
        name:"強效木屑",
        catagory:["8L", "4L"]
    },
    NYNDS:{
        typeId:"NYNDS",
        name:"南洋土",
        catagory:["8L","4L"]
    },
    BSCSD:{
        typeId:"BSCSD",
        name:"基礎木屑",
        catagory:["12L","8L","4L"]
    },
    BCBDS:{
        typeId:"BCBDS",
        name:"基礎兜土",
        catagory:["8L","4L"]
    },
    SPWWD:{
        typeId:"SPWWD",
        name:"產卵木",
        catagory:["15","13","11","9","7","B7"]
    },
}

export const PRODUCT_LIST:string[] = [
    "STBDS_8L",
    "STBDS_4L",
    "STRSD_8L",
    "STRSD_4L",
    "NYNDS_8L",
    "NYNDS_4L",
    "BSCSD_12L",
    "BSCSD_8L",
    "BSCSD_4L",
    "BCBDS_8L",
    "BCBDS_4L",
    "SPWWD_15L",
    "SPWWD_13L",
    "SPWWD_11L",
    "SPWWD_9L",
    "SPWWD_7L",
    "SPWWD_B7L"
]

export default GLOBAL_VAR