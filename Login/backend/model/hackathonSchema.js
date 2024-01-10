const mongoose = require("mongoose");

const hackathonSchema = mongoose.Schema({
    teamName: { type: String, },
    teamSize: { type: Number, },

    leaderName: { type: String, },
    leaderPhoneNo: { type: Number, },
    leaderRegNo: { type: Number, },
    leaderBranch: { type: String, },
    leaderLearnerid: { type: String, },

    member1Name: { type: String, },
    member1PhoneNo: { type: Number, },
    member1RegNo: { type: Number, },
    member1Branch: { type: String, },
    member1Learnerid: { type: String, },

    member2Name: { type: String, },
    member2PhoneNo: { type: Number, },
    member2RegNo: { type: Number, },
    member2Branch: { type: String, },
    member2Learnerid: { type: String, },

    member3Name: { type: String, },
    member3PhoneNo: { type: Number, },
    member3RegNo: { type: Number, },
    member3Branch: { type: String, },
    member3Learnerid: { type: String, },

    member4Name: { type: String, },
    member4PhoneNo: { type: Number, },
    member4RegNo: { type: Number, },
    member4Branch: { type: String, },
    member4Learnerid: { type: String, },

    upiID: { type: String, },
    txnID: { type: String, },
    screenshot: { type: String, },
}, { timestamps: true });

const hackathon = mongoose.model("hackathon", hackathonSchema);

module.exports = hackathon; 