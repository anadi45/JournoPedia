const test = (req,res)=>{
    try {
        res.send("Test");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {test};