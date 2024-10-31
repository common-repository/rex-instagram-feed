
class Rex_Utils {

    processDBData(data) {
        let data = {};
        data.map(doc => {
            data = {
                ...data,
                [doc.id]: {

                }
            };
        });
        return data;
    }
}

export default new Rex_Utils();